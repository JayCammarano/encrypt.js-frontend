import React from 'react'
import { IEventDetails } from '../../../helpers/eventsInterface'

const MyEventDetails: React.FC<IEventDetails> = ({event}) => {
    return (
        <div className="w-full p-4 overflow-scroll bg-gray-100 border-l-2 border-gray-300">
            <h1 className="p-4 text-3xl font-medium leading-tight text-center text-gray-900 title-font sm:text-4xl">{event.title}</h1>
            <p className="pl-4 text-gray-600 text-md">Date: {event.date}</p>
            <p className="pl-4 text-gray-600 text-md">Location: {event.location}</p>
            <p className="p-4 text-lg text-gray-600">{event.description}</p>
        </div>
    )
}

export default MyEventDetails
