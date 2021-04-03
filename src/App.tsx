import { config as dotenv } from "dotenv";
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./components/pages/Dashboard";
import LandingPage from './components/pages/LandingPage';
import SignIn from "./components/pages/SignIn";
import SignUp from './components/pages/SignUp';

dotenv()
toast.configure();

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const setAuth = (boolean: boolean) => {
    setIsAuthenticated(boolean)
  }

  async function isAuthed(){
    const token = localStorage.getItem("token")
    if(!token){
      return false
    }
    try {
      const response = await fetch(process.env.APIURL + "/auth/is_verify",{
        method: "GET",
        headers: { token: token } 
      })
      const parseRes = await response.json()
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
      return true
    } catch (error) {
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
