import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './pages';
import SigninPage from './pages/signin';
import GlobePage from './pages/globe';
import TicTacToePage from './pages/tictactoe';
import AboutUsPage from './pages/about';
import USAPage from './pages/usa';
import PdfPage from './components/report/report';
import Carousel from './components/carousel/carousel';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signin" component={SigninPage} exact />
        <Route path="/globe" component={GlobePage} exact />
        <Route path="/tictactoe" component={TicTacToePage} exact />
        <Route path="/aboutUs" component={AboutUsPage} exact />
        <Route path="/usa" component={USAPage} exact />
        <Route path="/pdf" component ={PdfPage} exact />
        <Route path="/carousel" component={Carousel} exact/>
      </Switch>
    </Router>
  );
}

export default App;
