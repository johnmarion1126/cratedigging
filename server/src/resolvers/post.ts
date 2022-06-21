import {
  Arg,
  Ctx,
  Field,
  FieldResolver, InputType, Int, Mutation, Query, Resolver, Root,
} from 'type-graphql';

import Post from '../entities/Post';
import User from '../entities/User';
import { MyContext } from '../types';

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
  async createPost(
    @Arg('input', () => PostInput) input: PostInput,
    @Ctx() { req }: MyContext,
  ) : Promise<Post> {
    return Post.create({
      ...input,
      creatorId: req.session.userId,
    }).save();
  }

  @Mutation(() => Post)
  async updatePost(
    @Arg('input', () => PostInput) input: PostInput,
    @Arg('id', () => Int) id: number,
    @Ctx() { req }: MyContext,
  ): Promise<Post | null> {
    const post = await Post.findOne({ where: { id } });

    if (!post) return null;

    if (post.creatorId !== req.session.userId) {
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
