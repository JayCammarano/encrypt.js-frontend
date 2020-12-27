import React, {useState} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom"
import LandingPage from './components/pages/LandingPage';
import Dashboard from "./components/pages/Dashboard"
import SignIn from "./components/pages/SignIn"
import SignUp from './components/pages/SignUp';
// TO_DO: Login status
const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const setAuth = (boolean: boolean) => {
    setIsAuthenticated(boolean)
  }
  return (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={() => (<LandingPage />)}/>
      <Route path="/signin" exact render={() => !isAuthenticated ? <SignIn setAuth={setAuth} /> : <Redirect to="/dashboard" />}/>
      <Route path="/signup" exact render={() => !isAuthenticated ? <SignUp setAuth={setAuth} /> : <Redirect to="/dashboard" />}/>
      <Route path="/dashboard" exact render={() => isAuthenticated ? <Dashboard  setAuth={setAuth} /> : <Redirect to="/signin" />}/>
    </Switch>
  </BrowserRouter>
  )
};

export default App;
