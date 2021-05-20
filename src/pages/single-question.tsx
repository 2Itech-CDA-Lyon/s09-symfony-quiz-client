import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Alert, Button, Form, ListGroup, Spinner } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import { mutate } from 'swr';
import { SwrLoader } from '../components';
import { BulletList } from '../components/loaders';
import UpworkJobLoader from '../components/loaders/upwork-job-loader';
import { StandardLayout } from '../layouts';
import { Answer, Question } from '../types/api';
import HttpMethod from '../types/http-method';

interface FlashMessage {
  type: string;
  text: string;
}

const SingleQuestionPage: FC = () => {
  // Récupère l'ID passé dans l'URL de la page
  const { id } = useParams<{ id: string }>();
  // Récupère l'objet permettant de manipuler l'URL de la page
  const history = useHistory();

  // État permettant de savoir si la requête envoyant la réponse donnée par l'utilisateur est en cours
  const [sendingAnswer, setSendingAnswer] = useState(false);
  // État permettant de retenir l'ID de la réponse choisie par l'utilisateur
  const [currentAnswerId, setCurrentAnswerId] = useState<number>();
  // État permettant de retenir le message permettant d'afficher la réussite à la question précédente
  const [message, setMessage] = useState<FlashMessage>();

  // Action déclenchée lorsque le formulaire est envoyé
  const handleSubmit = async (event: FormEvent) => {
    // Empêche le rechargement de la page
    event.preventDefault();
    // Indique que la requête est en cours
    setSendingAnswer(true);
    // Envoie la requête permettant de vérifier si la réponse donnée par l'utilisateur est correcte
    const response = await fetch(`http://localhost:8000/api/question/${id}/answer`, { method: HttpMethod.Post });
    const data: { rightAnswer: Answer, nextQuestion: Question } = await response.json();
    const { rightAnswer, nextQuestion } = data;
    // Indique que la requête est terminée
    setSendingAnswer(false);
    // Construit le message indiquant la réussite ou l'échec de la réponse choisie
    setMessage({
      type: rightAnswer.id === currentAnswerId ? 'success' : 'danger',
      text: rightAnswer.id === currentAnswerId ?
        'Bravo, c\'était la bonne réponse!' :
        `Hé non! La bonne réponse était: ${rightAnswer.text}…`,
    });
    // S'il existe une question suivant celle à laquelle l'utilisateur vient de répondre
    if (nextQuestion) {
      // Passe la question suivante à SWR
      mutate(`/api/question/${nextQuestion.id}`, nextQuestion);
      // Navigue vers la page correspondant à la question suivante
      history.push(`/question/${nextQuestion.id}`);
    } else {
      // Navigue vers la page d'accueil
      history.push('/');
    }
  }

  return (
    <StandardLayout>

      {/* Alerte indiquant la réussite à la question précédente */}
      {typeof message !== 'undefined' &&
        <Alert variant={message.type} onClose={() => setMessage(undefined)} dismissible>
          {message.text}
        </Alert>
      }

      {/* Affiche les détails de la question */}
      <SwrLoader<Question, Error> uri={`/api/question/${id}`} Loader={UpworkJobLoader}>
        {({ data: question }) => (
          <>
            <h1 className="mt-4 mb-4">Question n°{question?.order}</h1>
            <p>{question?.text}</p>
          </>
        )}
      </SwrLoader>

      {/* Affiche le formulaire contenant la liste des réponses à la question */}
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
