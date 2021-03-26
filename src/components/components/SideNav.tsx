import React from 'react'
import IEventViews from "./EventViewsInterface"

const SideNav: React.FC<IEventViews> = ({setWhichTab, setSelectedEvent}) => {
    const setTab = (tab: string) => {
        setSelectedEvent(["", 0])
        setWhichTab(tab)
    }

    return (
        <div className="flex flex-col w-4/12 h-screen text-center bg-gray-200 ">
            <div className="p-4 border-black" onClick={()=> setTab("myEvents")}>My Events</div>
            <div className="p-4 border-black" onClick={()=> setTab("events")}>Events</div>
            <div className="p-4" onClick={()=> setTab("inbox")}>Inbox</div>
        </div>
    )
}

export default SideNav
