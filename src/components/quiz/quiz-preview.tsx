import { FC } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Quiz } from "../../types/api";

interface QuizPreviewProps {
  quiz: Quiz;
}

const QuizPreview: FC<QuizPreviewProps> = ({ quiz }) =>
  <Card>
    <Card.Body>
      <Card.Title>{quiz.title}</Card.Title>
      <Card.Text>{quiz.description}</Card.Text>
      <Link to={`/quiz/${quiz.id}`}>
        <Button variant="primary">En voir plus</Button>
      </Link>
    </Card.Body>
  </Card>
;

export default QuizPreview;
