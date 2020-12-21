import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import LandingPage from './pages/LandingPage';

// TO_DO: Login status
const App: React.FC = () => {
  return <BrowserRouter><Switch><Route path="/" exact render={() => (<LandingPage loginStatus="NOT_LOGGED_IN"/>)}/></Switch></BrowserRouter>
};

export default App;
