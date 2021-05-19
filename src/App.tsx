import React, { FC } from 'react';
import { Quiz } from './types/api';
import useSWR from 'swr';
import apiFetcher from './utils/api-fetcher';
import { Button, Card, Container } from 'react-bootstrap';

const App: FC = () => {
  const { data: quizzes, error } = useSWR<Quiz[], Error>(['GET', '/api/quiz'], apiFetcher);

  if (error) {
    return <div>ERROR: {error.message}</div>
  }

  return (
    <Container>
      <h1>Jouer</h1>
      <ul>
        {
          quizzes?.map(
            quiz =>
              <li key={quiz.id}>
                <Card>
                  <Card.Body>
                    <Card.Title>{quiz.title}</Card.Title>
                    <Card.Text>{quiz.description}</Card.Text>
                    <Button variant="primary">En voir plus</Button>
                  </Card.Body>
                </Card>
              </li>
          )
        }
      </ul>
    </Container>
  );
}

export default App;
