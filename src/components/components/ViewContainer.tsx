import React from 'react'
import IEventViews from "./EventViewsInterface"
import Events from "./views/Events"
import Inbox from "./views/Inbox"
import MyEvents from "./views/MyEvents"
import NewEventView from "./views/NewEventView"

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
        <div className="flex m-4 border-black ">
            {visibleView}
        </div>
    )
}

export default ViewContainer
