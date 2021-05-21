import { FC } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LoginPage, PlayPage, RegistrationPage, SingleQuestionPage, SingleQuizPage } from './pages';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <PlayPage />
        </Route>
        <Route exact path="/quiz/:id(\d+)">
          <SingleQuizPage />
        </Route>
        <Route exact path="/question/:id(\d+)">
          <SingleQuestionPage />
        </Route>
        <Route exact path="/register">
          <RegistrationPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route>
          This page does not exist.
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
