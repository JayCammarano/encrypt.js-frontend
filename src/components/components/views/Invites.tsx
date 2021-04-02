import React from 'react'
import { EventInfo, IShowEvents } from '../../../helpers/eventsInterface'
import { UnpackedInvitedEvent } from '../../pages/PagesInterface'

const Invites: React.FC<IShowEvents>  = ({allEvents, setSelectedEvent}) => {
    let i = 0
    const onClickSelector = (event: [any, string]) => {
        setSelectedEvent([event[1], event[0].index])
    }
    let invitedEventCollection: (EventInfo | undefined)[]

    let allEventsCollection: (string | EventInfo)[][] = []
    if(allEvents){
        invitedEventCollection = allEvents.invitedEvents.map((event: UnpackedInvitedEvent) =>{ 
            if(!event.accepted){
                return event.decryptedEvent
            }
            return undefined
        })

        // eslint-disable-next-line array-callback-return
        const filteredEvents = invitedEventCollection.filter(function(inEvent){
            if(inEvent !== undefined){
              return inEvent
            }
          })
        filteredEvents.forEach((acceptedEvent: any) =>{
            allEventsCollection.push([acceptedEvent, "invites"])
        })
    }

    const eventsDisplay = allEventsCollection.map((event: any) => {
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
    
    // eslint-disable-next-line array-callback-return

    return (
        <div className="h-screen overflow-scroll bg-gray-200 border-l-2 border-gray-300">
            {eventsDisplay}
        </div>
    )
}

export default Invites
