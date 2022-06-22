import {
  Arg,
  Ctx,
  Field,
  FieldResolver, InputType, Int, Mutation, Query, Resolver, Root, UseMiddleware,
} from 'type-graphql';

import { MyContext } from '../types';
import Post from '../entities/Post';
import User from '../entities/User';
import isAuth from '../middleware/isAuth';

@InputType()
class PostInput {
  @Field(() => String)
    title!: string;

  @Field(() => String)
    text!: string;
}

@Resolver(Post)
class PostResolver {
  @FieldResolver(() => String)
  creator(@Root() post: Post) {
    return User.findOne({ where: { id: post.creatorId } });
  }

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return Post.find();
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg('input', () => PostInput) input: PostInput,
    @Ctx() { req }: MyContext,
  ) : Promise<Post> {
    return Post.create({
      ...input,
      creatorId: req ? req.session.userId : 1,
    }).save();
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async updatePost(
    @Arg('input', () => PostInput) input: PostInput,
    @Arg('id', () => Int) id: number,
    @Ctx() { req }: MyContext,
  ): Promise<Post | null> {
    const post = await Post.findOne({ where: { id } });

    if (!post) return null;

    if (req && post.creatorId !== req.session.userId) {
      throw new Error('not authorized');
    }

    await Post.update({ id }, {
      title: input.title,
      text: input.text,
    });

    post.title = input.title;
    post.text = input.text;

    return post;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg('id', () => Int) id: number,
    @Ctx() { req }: MyContext,
  ) : Promise<boolean> {
    const post = await Post.findOne({ where: { id } });
    if (!post) return false;

    if (post.creatorId !== req.session.userId) {
      throw new Error('not authorized');
    }

    await Post.delete({ id });
    return true;
  }
}

export default PostResolver;
