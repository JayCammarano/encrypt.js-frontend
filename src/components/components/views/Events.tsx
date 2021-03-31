import React from 'react'
import { EventInfo } from '../../../helpers/eventsInterface'
import { UnpackedEventInfo, UnpackedInvitedEvent } from '../../pages/PagesInterface'
interface IShowEvents {
    allEvents: UnpackedEventInfo
    setSelectedEvent: React.Dispatch<React.SetStateAction<[string, number]>>
}

const Events: React.FC<IShowEvents>  = ({allEvents, setSelectedEvent}) => {
    let i = 0
    const onClickSelector = (event: [any, string]) => {
        setSelectedEvent([event[1], event[0].index])
    }
    let invitedEventCollection: EventInfo[]

    let allEventsCollection: (string | EventInfo)[][] = []
    if(allEvents){
        invitedEventCollection = allEvents.invitedEvents.map((event: UnpackedInvitedEvent) =>{ 
            return event.decryptedEvent
        })
        invitedEventCollection.forEach((acceptedEvent: EventInfo) =>{
            allEventsCollection.push([acceptedEvent, "invitedEvents"])
        })
    }
    
    if(allEvents.myEvents){
        allEvents.myEvents.forEach((myEvent: EventInfo) =>{
            allEventsCollection.push([myEvent, "myEvent"])
        })
    }

    const eventDisplay = allEventsCollection.map((event: any) => {
        i += 1
        let bg_color = "bg-gray-100";
        if(i % 2 === 0){
            bg_color = "bg-gray-200"
        }
        let truncEventTitle = event[0].title

        if(event[0].title.length >= 27){
            truncEventTitle = event[0].title.substring(0,27) + "..."
        }
        return(
            <div onClick={() => onClickSelector(event)} className={`p-4 border-black ${bg_color} w-full`} key={i}>
                <p>{truncEventTitle}</p>
                <p className="text-xs text-gray-700">{event[0].date}</p>
            </div>
        )
    })
    return (
        <div className="h-screen overflow-scroll bg-gray-200 border-l-2 border-gray-300">
            {eventDisplay}
        </div>
    )
}

export default Events
