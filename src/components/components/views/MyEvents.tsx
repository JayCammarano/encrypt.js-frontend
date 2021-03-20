import React from 'react'
interface IMyEvents {
    events: string[]
}
const MyEvents: React.FC<IMyEvents>  = ({events}) => {
    let i = 0
    const eventDisplay = events.map((event: string) => {
        i += 1
        let bg_color = "bg-gray-100";
        if(i % 2 === 0){
            bg_color = "bg-gray-200"
        }
        return(
            <div className={`p-4 border-black ${bg_color}`} key={i}>{event}</div>
        )
    })

    return (
        <div>
            {eventDisplay}
        </div>
    )
}

export default MyEvents
