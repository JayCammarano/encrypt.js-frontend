import React from 'react'

interface ISideNav {
    selectedTab: string,
    setWhichTab: React.Dispatch<React.SetStateAction<string>>
  }
const SideNav: React.FC<ISideNav> = ({setWhichTab}) => {
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
