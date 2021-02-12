import React from 'react'
import IEventViews from "./EventViewsInterface"
import NewEvent from "./views/NewEvent"


  
const ViewContainer: React.FC<IEventViews> = ({setWhichTab}) => {
    return (
        <div className="flex w-8/12 border-black">
            <NewEvent setWhichTab={setWhichTab}/>  
        </div>
    )
}

export default ViewContainer
