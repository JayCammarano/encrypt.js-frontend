import React, { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Events from "../../helpers/events";
import { IEventDetails } from '../../helpers/eventsInterface';
import SideNav from "../components/SideNav";
import ViewContainer from "../components/ViewContainer";
import IPages, { RawUserInfo } from "./PagesInterface";


const Dashboard: React.FC<IPages> = ({ setAuth }) => {
  const eventDetail: IEventDetails = {event: {title: "string", description: "string", date: "string", location: "string", invitees: [""]}}
  const myEvent: RawUserInfo = {
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

  const [unpackedEvents, setUnpackedEvents] = useState({
    myEvents: [eventDetail],
    invitedEvents: [eventDetail]
});
  const [whichTab, setWhichTab] = useState("myEvents")
  const getUser = async () => {
    try {
      const response = await fetch('http://localhost:1337/dashboard', {
        method: 'GET',
        headers: { token: localStorage.token }
      });
      const parseResponse = await response.json();
      setUser(parseResponse);
      if(await parseResponse.user.secret_key){
        localStorage.setItem('privateKey', parseResponse.user.secret_key);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const eventsToPlainText = async (key: string | null, events: { myEvents: string[]; invitedEvents: string[]; }) => {
    if(typeof key === 'string'){
      // Error: a new Events() is sometimes made with no events in user events (async issue)
      // Should be solved: Error: When events do hit the decoder it says "Base64Coder: incorrect characters for decoding" 
      const eventHandler = new Events(key, events)
      const plainTextEvents = await eventHandler.unpackEvents()
      if(plainTextEvents){
        setUnpackedEvents(plainTextEvents)
      }
    }
    return events
  }

  const logout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('privateKey');
    setAuth(false);
    toast.success("Logout Successful!")
  };

  useEffect(() => {
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() =>{
    if(user.events !== { myEvents: [], invitedEvents:[] }){
      eventsToPlainText(localStorage.getItem("privateKey"), user.events)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
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
        <ViewContainer setWhichTab={setWhichTab} events={unpackedEvents} selectedTab={whichTab} />
      </div>
    </Fragment>
  );
};

export default Dashboard;
