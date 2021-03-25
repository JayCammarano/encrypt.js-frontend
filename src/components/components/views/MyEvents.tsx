import React from 'react'
import { IEvents } from '../../../helpers/eventsInterface'

const MyEvents: React.FC<IEvents>  = ({events, setSelectedEvent}) => {
    let i = 0
    const onClickSelector = (index: number) => {
        setSelectedEvent(["myEvent", index])
    }
    const eventDisplay = events.map((event: any) => {
        i += 1
        let bg_color = "bg-gray-100";
        if(i % 2 === 0){
            bg_color = "bg-gray-200"
        }
        return(
            <div onClick={() => onClickSelector(event.index)} className={`p-4 border-black ${bg_color} w-full`} key={i}>
                <p>{event.title}</p>
                <p className="text-xs text-gray-700">{event.date}</p>
            </div>
        )
    })
    return (
        <div>
            {eventDisplay}
        </div>
    )
}

export default MyEvents
