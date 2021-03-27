import React from 'react'
import { IEventDetails } from '../../../helpers/eventsInterface'

const MyEventDetails: React.FC<IEventDetails> = ({event}) => {
    return (
        <div className="m-4">
            <h5 className="p-4 text-2xl font-medium leading-tight text-gray-900 title-font sm:text-4xl">{event.title}</h5>
            <p className="text-xs text-gray-600">{event.date}</p>
            <p>{event.description}</p>
            <p>{event.location}</p>
        </div>
    )
}

export default MyEventDetails
