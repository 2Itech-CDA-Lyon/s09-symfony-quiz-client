import { FC } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { SwrLoader } from '../components';
import { ButtonLoader, SimpleArticle } from '../components/loaders';
import { StandardLayout } from '../layouts';
import { Question, Quiz } from '../types/api';

const SingleQuizPage: FC = () => {
  // Récupère l'ID passé dans l'URL de la page
  const { id } = useParams<{ id: string }>();

  return (
    <StandardLayout>
      <Jumbotron>

        {/* Informations du quiz */}
        <SwrLoader<Quiz, Error> uri={`/api/quiz/${id}`} Loader={SimpleArticle}>
          {({ data: quiz }) => (
            <>
              <h1>{quiz?.title}</h1>
              <div>Difficulté: {quiz?.difficulty}</div>
              <p>{quiz?.description}</p>

              {/* Bouton permettant d'accéder à la première question du quiz */}
              <SwrLoader<Question, Error> uri={`/api/quiz/${id}/first_question`} Loader={ButtonLoader}>
                {({ data: firstQuestion }) => (
                  <Link to={`/question/${firstQuestion?.id}`}>
                    <Button variant="primary">Jouer</Button>
                  </Link>
                )}
              </SwrLoader>

            </>
          )}
        </SwrLoader>

      </Jumbotron>
    </StandardLayout>
  );
}

export default SingleQuizPage;
