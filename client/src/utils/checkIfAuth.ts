import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useQuery } from '@apollo/client';
import GET_USER_BY_QID from '../graphql/queries/getUserByQid';

const checkIfAuth = () => {
  const { data, loading } = useQuery(GET_USER_BY_QID);
  const router = useRouter();
  useEffect(() => {
    if (!loading && !data?.getUserByQid) {
      router.replace(`/login?next=${router.pathname}`);
    }
  }, [loading, data, router]);
};

export default checkIfAuth;
