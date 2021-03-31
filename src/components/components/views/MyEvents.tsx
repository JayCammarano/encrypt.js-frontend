import React from 'react'
import { IEvents } from '../../../helpers/eventsInterface'

const MyEvents: React.FC<IEvents>  = ({events, setSelectedEvent}) => {
    let i = 0
    const onClickSelector = (index: number) => {
        setSelectedEvent(["myEvent", index])
    }
    // sort events by date desc
    const eventDisplay = events.map((event: any) => {
        i += 1
        let bg_color = "bg-gray-100";
        if(i % 2 === 0){
            bg_color = "bg-gray-200"
        }
        let truncEventTitle = event.title

        if(event.title.length >= 27){
            truncEventTitle = event.title.substring(0,27) + "..."
        }
        return(
            <div onClick={() => onClickSelector(event.index)} className={`p-4 border-black ${bg_color} w-full `} key={i}>
                <p>{truncEventTitle}</p>
                <p className="text-xs text-gray-700">{event.date}</p>
            </div>
        )
    })
    return (
        <div className="h-screen overflow-scroll bg-gray-200 border-l-2 border-gray-300 ">
            {eventDisplay}
        </div>
    )
}

export default MyEvents
