import React, { Fragment, useState, useEffect } from 'react';
import ViewContainer from "../components/ViewContainer"
import SideNav from "../components/SideNav"
import IPages from "./PagesInterface"


const Dashboard: React.FC<IPages> = ({ setAuth }) => {
  const [user, setUser] = useState({user: {
                                      user_name: "",
                                      secret_key: ""},
                                    events: {
                                        myEvents: [""],
                                        invitedEvents: [""]}
                                  });
  const [whichTab, setWhichTab] = useState("myEvents")
  const getName = async () => {
    try {
      const response = await fetch('http://localhost:1337/dashboard', {
        method: 'GET',
        headers: { token: localStorage.token }
      });

      const parseResponse = await response.json();
      setUser(parseResponse);
      localStorage.setItem('secretKey', parseResponse.secretKey);
    } catch (err) {
      console.error(err.message);
    }
  };
  const logout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('secretKey');
    setAuth(false);
  };

  useEffect(() => {
    getName();
  }, []);
  return (
    <Fragment>
      <h1>Hello, {user.user.user_name}</h1>
      <button className="p-2 border-2 border-black" onClick={(e) => logout(e)}>Sign Out</button>

      <button className="p-3 text-white bg-black rounded button" onClick={() => setWhichTab("newEvent")}>Create an Event</button>
      <div className="flex flex-col">
        <SideNav selectedTab={whichTab} setWhichTab={setWhichTab} />
        <ViewContainer setWhichTab={setWhichTab} events={user.events} selectedTab={whichTab} />
      </div>
    </Fragment>
  );
};

export default Dashboard;
