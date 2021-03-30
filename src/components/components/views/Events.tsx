import React from 'react'
import { EventInfo } from '../../../helpers/eventsInterface'
interface IShowEvents {
    allEvents: {myEvents: EventInfo[];
        invitedEvents: EventInfo[];}
    setSelectedEvent: React.Dispatch<React.SetStateAction<[string, number]>>
}

const Events: React.FC<IShowEvents>  = ({allEvents, setSelectedEvent}) => {
    let i = 0
    const onClickSelector = (event: [any, string]) => {
        setSelectedEvent([event[1], event[0].index])
    }

    let allEventsCollection: (string | EventInfo)[][] = []

    allEvents.invitedEvents.forEach((invitedEvent: EventInfo) =>{
        allEventsCollection.push([invitedEvent, "invitedEvents"])
    })
    allEvents.myEvents.forEach((myEvent: EventInfo) =>{
        allEventsCollection.push([myEvent, "myEvent"])
    })
    const eventDisplay = allEventsCollection.map((event: any) => {
        i += 1
        let bg_color = "bg-gray-100";
        if(i % 2 === 0){
            bg_color = "bg-gray-200"
        }
        return(
            <div onClick={() => onClickSelector(event)} className={`p-4 border-black ${bg_color} w-full`} key={i}>
                <p>{event[0].title}</p>
                <p className="text-xs text-gray-700">{event[0].date}</p>
            </div>
        )
    })
    return (
        <div>
            {eventDisplay}
        </div>
    )
}

export default Events
