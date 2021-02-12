import React from 'react'
import IEventViews from "./EventViewsInterface"

const SideNav: React.FC<IEventViews> = ({setWhichTab}) => {
    const setTab = (tab: string) => {
        setWhichTab(tab)
    }

    return (
        <div className="w-4/12 border-2 border-black ">
            <div className="p-4 border-b-2 border-black" onClick={()=> setTab("myEvents")}>My Events</div>
            <div className="p-4 border-b-2 border-black" onClick={()=> setTab("events")}>Events</div>
            <div className="p-4" onClick={()=> setTab("inbox")}>Inbox</div>
        </div>
    )
}

export default SideNav
