import React from 'react'
import IEventViews from "./EventViewsInterface"
import NewEventView from "./views/NewEventView"
import MyEvents from "./views/MyEvents"
import Events from "./views/Events"
import Inbox from "./views/Inbox"

const ViewContainer: React.FC<IEventViews> = ({setWhichTab, selectedTab, events}) => {
    let visibleView;
    if(selectedTab === "newEvent"){
        visibleView = <NewEventView setWhichTab={setWhichTab}/>  
    }else if(selectedTab === "myEvents"){
        if(typeof events === 'object'){
            visibleView = <MyEvents events={events.myEvents} />  
        }else{
        }
    }else if(selectedTab === "events"){
        visibleView = <Events/>  
    }else if(selectedTab === "inbox"){
        visibleView = <Inbox/>  
    }
    
    return (
        <div className="flex flex-row border-black">
            {visibleView}
        </div>
    )
}

export default ViewContainer
