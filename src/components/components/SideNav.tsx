import React from 'react'
import IEventViews from "./EventViewsInterface"

const SideNav: React.FC<IEventViews> = ({setWhichTab, setSelectedEvent}) => {
    const setTab = (tab: string) => {
        setSelectedEvent(["", 0])
        setWhichTab(tab)
    }

    return (
        <div className="flex flex-col w-4/12 h-screen text-center bg-gray-200 ">
            <div className="p-4 border-b-2 border-gray-300" onClick={()=> setTab("myEvents")}>My Events</div>
            <div className="p-4 border-b-2 border-gray-300" onClick={()=> setTab("events")}>Events</div>
            <div className="p-4 border-b-2 border-gray-300" onClick={()=> setTab("invites")}>Invites</div>
        </div>
    )
}

export default SideNav
