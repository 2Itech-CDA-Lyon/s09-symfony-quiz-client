import React, { FC } from 'react';
import { Quiz } from './types/api';
import useSWR from 'swr';
import apiFetcher from './utils/api-fetcher';

const App: FC = () => {
  const { data: quizzes, error } = useSWR<Quiz[], Error>(['GET', '/api/quiz'], apiFetcher);

  if (error) {
    return <div>ERROR: {error.message}</div>
  }

  return (
    <>
      <h2>Jouer</h2>
      <ul>
        {
          quizzes?.map(
            quiz => <li key={quiz.id}>{quiz.title}</li>
          )
        }
      </ul>
    </>
  );
}

export default App;
