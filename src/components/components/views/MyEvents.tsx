import React from 'react'
interface IMyEvents {
    events: string[]
}
const MyEvents: React.FC<IMyEvents>  = ({events}) => {
    const eventDisplay = events.map((event: string) => {
        return(
            <div className="p-4 border-black">{event}</div>
        )
    })

    return (
        <div>
            hello, my events
            {eventDisplay}
        </div>
    )
}

export default MyEvents
