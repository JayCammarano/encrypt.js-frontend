import React from 'react'
import IEventViews from "./EventViewsInterface"
import DeclineConfirm from './views/DeclineConfirm'
import Events from "./views/Events"
import Invites from "./views/Invites"
import MyEventDetails from './views/MyEventDetails'
import MyEvents from "./views/MyEvents"
import NewEventView from "./views/NewEventView"

const ViewContainer: React.FC<IEventViews> = ({setWhichTab, selectedTab, events, selectedEvent=["", 0], setSelectedEvent}) => {
    let visibleView;
    let eventDetails
    if(selectedTab === "newEvent"){
        visibleView = <NewEventView setSelectedEvent={setSelectedEvent} setWhichTab={setWhichTab}/>  
    }else if(selectedTab === "myEvents"){
        if(typeof events === 'object'){
            visibleView = <MyEvents setSelectedEvent={setSelectedEvent} events={events.myEvents} />  
        }else{
        }
    }else if(selectedTab === "events"){
        if(typeof events === 'object'){
            visibleView = <Events setSelectedEvent={setSelectedEvent} allEvents={events}/>  
        }else{
        }
    }else if(selectedTab === "invites"){
        if(typeof events === 'object'){
        visibleView = <Invites setSelectedEvent={setSelectedEvent} allEvents={events}/>  }
        else {
        }
    }
    
    if(selectedEvent[0] === "myEvent" && events){
        eventDetails = <MyEventDetails event={events.myEvents[selectedEvent[1]]} />
    }else if (selectedEvent[0] === "invitedEvents" && events ){
        eventDetails = <MyEventDetails event={events.invitedEvents[selectedEvent[1]].decryptedEvent} />
    }else if(selectedTab === "decline" && events && selectedEvent[0] === "invites"){
        eventDetails = <DeclineConfirm setWhichTab={setWhichTab} fullEvent={events.invitedEvents[selectedEvent[1]]} />
    }else if (selectedEvent[0] === "invites" && events ){
        eventDetails = <MyEventDetails setWhichTab={setWhichTab}  fullEvent={events.invitedEvents[selectedEvent[1]]} invites={true} />
    }
    return (
        <div className="flex border-black margin-0">
            {visibleView}
            {eventDetails}
        </div>
    )
}

export default ViewContainer
