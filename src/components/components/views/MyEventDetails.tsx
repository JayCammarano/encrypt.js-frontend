import React from 'react';
import { IEventDetails } from '../../../helpers/eventsInterface';

const MyEventDetails: React.FC<IEventDetails> = ({event, invites}) => {
    let buttons;
    if(invites){
        buttons = (
            <button
            className="flex flex-row float-right px-2 py-2 ml-4 text-xs bg-white border-2 border-black rounded text-md focus:outline-none hover:bg-gray-300"
            type="button"
          >
            Sign Up
          </button>
        )
    }
    return (
        <div className="w-full p-4 overflow-scroll bg-gray-100 border-l-2 border-gray-300">
            <h1 className="p-4 text-3xl font-medium leading-tight text-center text-gray-900 title-font sm:text-4xl">{event.title}</h1>
            <p className="pl-4 text-gray-600 text-md">Date: {event.date}</p>
            <p className="pl-4 text-gray-600 text-md">Location: {event.location}</p>
            <p className="p-4 text-lg text-gray-600">{event.description}</p>
            <p className="p-4 text-lg text-gray-600">{buttons}</p>
        </div>
    )
}

export default MyEventDetails
