import React, { FC } from 'react';
import { useRouteMatch } from 'react-router';
import useSWR from 'swr';
import { Quiz } from '../types/api';
import apiFetcher from '../utils/api-fetcher';

const SingleQuizPage: FC = () => {
  const { params } = useRouteMatch<{ id: string }>();

  const { data: quiz, error } = useSWR<Quiz, Error>(['GET', `/api/quiz/${params.id}`], apiFetcher);

  if (error) {
    return <div>ERROR: {error.message}</div>
  }

  if (typeof quiz === 'undefined') {
    return <div>Loading...</div>
  }

  return (
    <div>{quiz.title}</div>
  );
}

export default SingleQuizPage;
