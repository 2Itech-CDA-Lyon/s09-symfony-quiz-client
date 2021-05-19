import React, { FC } from 'react';
import { Quiz } from '../types/api';
import useSWR from 'swr';
import apiFetcher from '../utils/api-fetcher';
import { Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PlayPage: FC = () => {
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
                    <Link to={`/quiz/${quiz.id}`}>
                      <Button variant="primary">En voir plus</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </li>
          )
        }
      </ul>
    </Container>
  );
}

export default PlayPage;
