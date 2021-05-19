import React, { FC } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PlayPage, SingleQuizPage } from './pages';

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
        <Route>
          This page does not exist.
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
