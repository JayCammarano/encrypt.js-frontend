import React from 'react'
import { IEventDetails } from '../../../helpers/eventsInterface'

const MyEventDetails: React.FC<IEventDetails> = ({event}) => {
    return (
        <div>
            <p>{event.title} - {event.date}</p>
            <p>{event.description}</p>
            <p>{event.location}</p>
        </div>
    )
}

export default MyEventDetails
