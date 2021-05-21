import { FC } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { mutate } from "swr";
import { SwrLoader } from "../components";
import { User } from "../types/api";

const { REACT_APP_API_URL } = process.env;

const StandardLayout: FC = ({ children }) => {
  const logout = async () => {
    await fetch(`${REACT_APP_API_URL}/api/logout`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    mutate(['GET', '/api/current-user'], undefined);
  }

  return (
    <>
      <header>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>M2i Quiz</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/"><Nav.Link as="div">Accueil</Nav.Link></Link>
              <SwrLoader<User, Error> uri="/api/current-user">
                {({ data: user }) => (
                  typeof user !== 'undefined' ?
                  <Link to="/create"><Nav.Link as="div">Créer</Nav.Link></Link> :
                  null
                )}
              </SwrLoader>
            </Nav>
          </Navbar.Collapse>

          <SwrLoader<User, Error> uri="/api/current-user">
            {({ data: user }) => (
              typeof user === 'undefined' ?
                <>
                  <Link to="/login">
                    <Button variant="primary">Se connecter</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="info">S'inscrire</Button>
                  </Link>
                </>
              :
                <div>Bonjour {user?.username}! <Button variant="secondary" onClick={() => logout()}>Se déconnecter</Button></div>
            )}
          </SwrLoader>

        </Navbar>
      </header>
      <main>
        <Container>
          {children}
        </Container>
      </main>
    </>
  );
}

export default StandardLayout;
