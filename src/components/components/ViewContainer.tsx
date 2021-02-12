import React from 'react'
import IEventViews from "./EventViewsInterface"
import NewEvent from "./views/NewEvent"

const ViewContainer: React.FC<IEventViews> = ({setWhichTab}) => {
    return (
        <div className="flex flex-row border-black">
            <NewEvent setWhichTab={setWhichTab}/>  
        </div>
    )
}

export default ViewContainer
