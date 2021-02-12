import React from 'react'
import IEventViews from "./EventViewsInterface"
import NewEvent from "./views/NewEvent"
import MyEvents from "./views/MyEvents"
import Events from "./views/Events"
import Inbox from "./views/Inbox"

const ViewContainer: React.FC<IEventViews> = ({setWhichTab, selectedTab}) => {
    let visibleView;
    if(selectedTab === "newEvent"){
        visibleView = <NewEvent setWhichTab={setWhichTab}/>  
    }else if(selectedTab === "myEvents"){
        visibleView = <MyEvents/>  
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
