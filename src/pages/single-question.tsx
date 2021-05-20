import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Alert, Button, Form, ListGroup, Spinner } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import { mutate } from 'swr';
import { SwrLoader } from '../components';
import { BulletList } from '../components/loaders';
import UpworkJobLoader from '../components/loaders/upwork-job-loader';
import { StandardLayout } from '../layouts';
import { Answer, Question } from '../types/api';

interface FlashMessage {
  type: string;
  text: string;
}

const SingleQuestionPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [sendingAnswer, setSendingAnswer] = useState(false);
  const [currentAnswerId, setCurrentAnswerId] = useState<number>();
  const [message, setMessage] = useState<FlashMessage>();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSendingAnswer(true);
    const response = await fetch(`http://localhost:8000/api/question/${id}/answer`, { method: 'POST' });
    const data: { rightAnswer: Answer, nextQuestion: Question } = await response.json();
    const { rightAnswer, nextQuestion } = data;
    setSendingAnswer(false);
    setMessage({
      type: rightAnswer.id === currentAnswerId ? 'success' : 'danger',
      text: rightAnswer.id === currentAnswerId ?
        'Bravo, c\'était la bonne réponse!' :
        `Hé non! La bonne réponse était: ${rightAnswer.text}…`,
    });
    if (nextQuestion) {
      mutate(`/api/question/${nextQuestion.id}`, nextQuestion);
      history.push(`/question/${nextQuestion.id}`);
    } else {
      history.push('/');
    }
  }

  return (
    <StandardLayout>
      {typeof message !== 'undefined' &&
        <Alert variant={message.type} onClose={() => setMessage(undefined)} dismissible>
          {message.text}
        </Alert>
      }

      <SwrLoader<Question, Error> uri={`/api/question/${id}`} Loader={UpworkJobLoader}>
        {({ data: question }) => (
          <>
            <h1 className="mt-4 mb-4">Question n°{question?.order}</h1>
            <p>{question?.text}</p>
          </>
        )}
      </SwrLoader>

      <SwrLoader<Answer[], Error> uri={`/api/question/${id}/answers`} Loader={BulletList}>
        {({ data: answers }) => (
          <Form onSubmit={handleSubmit}>
            <ListGroup as="ul" className="mb-4">
              {answers?.map(
                answer =>
                  <ListGroup.Item
                    key={answer.id}
                    as="li"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setCurrentAnswerId(Number(event.target.value))}
                  >
                    <Form.Check
                      type="radio"
                      name="answer"
                      label={answer.text}
                      value={answer.id}
                    />
                  </ListGroup.Item>
              )}
            </ListGroup>
            <Button 
              type="submit" 
              variant="primary"
              disabled={sendingAnswer}
            >
              Valider {sendingAnswer && <Spinner animation="grow" variant="light" size="sm" />}
            </Button>
          </Form>
        )}
      </SwrLoader>

    </StandardLayout>
  );
}

export default SingleQuestionPage;
