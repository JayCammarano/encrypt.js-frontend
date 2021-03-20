import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import LandingPage from './components/pages/LandingPage';
import SignIn from "./components/pages/SignIn";
import SignUp from './components/pages/SignUp';
// TO_DO: Login status
const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const setAuth = (boolean: boolean) => {
    setIsAuthenticated(boolean)
  }

  async function isAuthed(){
    console.log("Running Authed Check")
    const token = localStorage.getItem("token")
    if(!token){
      console.log(false)
      return false
    }
    try {
      const response = await fetch("http://localhost:1337/auth/is_verify",{
        method: "GET",
        headers: { token: token } 
      })
      const parseRes = await response.json()
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
      return true
    } catch (error) {
      console.log("false no response")
      return false
    }
  }
  useEffect(()=>{
    isAuthed()
  },[])


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
