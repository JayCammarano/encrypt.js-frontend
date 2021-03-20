import React, { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Events from "../../helpers/events";
import SideNav from "../components/SideNav";
import ViewContainer from "../components/ViewContainer";
import IPages, { MyEvents } from "./PagesInterface";


const Dashboard: React.FC<IPages> = ({ setAuth }) => {
  const myEvent: MyEvents = {
                              user: {
                                user_name: "",
                                secret_key: ""
                              },
                              events: {
                                  myEvents: [],
                                  invitedEvents: []
                              }
                            }
  const [user, setUser] = useState(myEvent);
  const [whichTab, setWhichTab] = useState("myEvents")
  const getName = async () => {
    try {
      const response = await fetch('http://localhost:1337/dashboard', {
        method: 'GET',
        headers: { token: localStorage.token }
      });
      const parseResponse = await response.json();
      setUser(parseResponse);
      if(await parseResponse.user.secret_key){
        localStorage.setItem('privateKey', parseResponse.user.secret_key);
        eventsToPlainText(localStorage.getItem("privateKey"))
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const eventsToPlainText = (key: string | null) => {
    if(typeof key === 'string'){
      const eventHandler = new Events(key, user.events)
      const plainTextEvents = eventHandler.unpackEvents()
      console.log(plainTextEvents)
      // if(plainTextEvents){
      //   setUser({...user, events: plainTextEvents})
      // }
    }
  }

  const logout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('privateKey');
    setAuth(false);
    toast.success("Logout Successful!")
  };

  useEffect(() => {
    getName();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fragment>
      <div className="w-full h-2/5">
        <div className="text-right">
          <button className="px-2 py-2 m-4 text-xs text-black bg-white border-2 rounded focus:outline-white hover:bg-black hover:border-white hover:text-white hover:outline-back" onClick={(e) => logout(e)}>Sign Out</button>
        </div>
        <h1 className="p-4 text-3xl font-medium leading-tight text-center text-gray-900 title-font sm:text-4xl">Hello, {user.user.user_name}</h1>
        
        <div className="text-right">
        <button className="p-3 m-4 text-right text-white bg-black rounded button" onClick={() => setWhichTab("newEvent")}>Create an Event</button>
        </div>
      </div>
      <div className="flex flex-row">
        <SideNav selectedTab={whichTab} setWhichTab={setWhichTab} />
        <ViewContainer setWhichTab={setWhichTab} events={user.events} selectedTab={whichTab} />
      </div>
    </Fragment>
  );
};

export default Dashboard;
