import React from 'react'
import NewEvent from "./views/NewEvent"

interface IViewContainer {
    selectedTab: string,
  }
  
const ViewContainer: React.FC<IViewContainer> = () => {
    return (
        <div className="flex w-8/12 border-black">
            <NewEvent />  
        </div>
    )
}

export default ViewContainer
