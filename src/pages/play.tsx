import { FC } from 'react';
import { Quiz } from '../types/api';
import { StandardLayout } from '../layouts';
import { SwrLoader } from '../components';
import { QuizPreview } from '../components/quiz';
import { FadingLoader } from '../components/loaders';

const PlayPage: FC = () => {
  return (
    <StandardLayout>
      <h1 className="mt-4 mb-4">Jouer</h1>

      {/* Liste de tous les quiz disponibles */}
      <SwrLoader<Quiz[], Error> uri="/api/quiz" Loader={FadingLoader}>
        {({ data: quizzes }) => (
          <ul>
            {quizzes?.map(
              quiz => (
                <li key={quiz.id} className="mt-4">
                  <QuizPreview quiz={quiz} />
                </li>
              )
            )}
          </ul>
        )}
      </SwrLoader>

    </StandardLayout>
  );
}

export default PlayPage;
