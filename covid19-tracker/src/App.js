import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './pages';
import SigninPage from './pages/signin';
import GlobePage from './pages/globe';
import TicTacToePage from './pages/tictactoe';
import AboutUsPage from './pages/about';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signin" component={SigninPage} exact />
        <Route path="/globe" component={GlobePage} exact />
        <Route path="/tictactoe" component={TicTacToePage} exact />
        <Route path="/aboutUs" component={AboutUsPage} exact />
      </Switch>
    </Router>
  );
}

export default App;
