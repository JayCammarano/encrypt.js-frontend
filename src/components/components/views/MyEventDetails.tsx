import React from 'react'
import { IEventDetails } from '../../../helpers/eventsInterface'

const MyEventDetails: React.FC<IEventDetails> = ({event}) => {
    return (
        <div className="w-full p-4 bg-gray-100">
            <h1 className="p-4 text-3xl font-medium leading-tight text-center text-gray-900 title-font sm:text-4xl">{event.title}</h1>
            <p className="pl-4 text-gray-600 text-md">{event.date}</p>
            <p className="pl-4 text-gray-600 text-md">{event.location}</p>
            <p className="p-4 text-lg text-gray-600">{event.description}</p>
        </div>
    )
}

export default MyEventDetails
