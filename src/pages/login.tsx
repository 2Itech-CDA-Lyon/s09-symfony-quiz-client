import { FC, FormEvent, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Redirect } from "react-router";
import { mutate } from "swr";
import { SwrLoader } from "../components";
import { StandardLayout } from "../layouts";
import { User } from "../types/api";
import HttpMethod from "../types/http-method";

const { REACT_APP_API_URL } = process.env;

const LoginPage: FC = () => {
  const [isLogging, setIsLogging] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValid = email !== '' && password !== '';

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setIsLogging(true);
    const response = await fetch(`${REACT_APP_API_URL}/api/login`, {
      method: HttpMethod.Post,
      body: JSON.stringify({ email, password }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Authentication failed.');
    }

    const user: User = await response.json();
    setIsLogging(false);

    mutate(['GET', '/api/current-user'], user);
  }

  return (
    <StandardLayout>
      <SwrLoader<User, Error> uri="/api/current-user">
        {({ data: user }) => typeof user !== 'undefined' ? <Redirect to="/" /> : null}
      </SwrLoader>

      <h1 className="mb-4 mt-4">Se connecter</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Adresse e-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Entrez votre adresse e-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={!isValid || isLogging}>
          Valider {isLogging && <Spinner animation="grow" variant="light" size="sm" />}
        </Button>
      </Form>
    </StandardLayout>
  );
}

export default LoginPage;
