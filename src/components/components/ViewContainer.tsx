import React, { useState } from 'react'
import IEventViews from "./EventViewsInterface"
import Events from "./views/Events"
import Inbox from "./views/Inbox"
import MyEvents from "./views/MyEvents"
import NewEventView from "./views/NewEventView"

const ViewContainer: React.FC<IEventViews> = ({setWhichTab, selectedTab, events}) => {
    const initEvent: [string, number] = ["", 0]
    const [selectedEvent, setSelectedEvent] = useState(initEvent)
    let visibleView;
    if(selectedTab === "newEvent"){
        visibleView = <NewEventView setWhichTab={setWhichTab}/>  
    }else if(selectedTab === "myEvents"){
        if(typeof events === 'object'){
            visibleView = <MyEvents setSelectedEvent={setSelectedEvent} events={events.myEvents} />  
        }else{
        }
    }else if(selectedTab === "events"){
        visibleView = <Events/>  
    }else if(selectedTab === "inbox"){
        visibleView = <Inbox/>  
    }
    let eventDetail;
    if(selectedEvent[0] === "myEvent" && events){
        console.log(events.myEvents[selectedEvent[1]])
        // eventDetail  = <MyEventDetails event={events.myEvents[selectedEvent[1]]} />
    }
    return (
        <div className="flex border-black ">
            {visibleView}
            {eventDetail}
        </div>
    )
}

export default ViewContainer
