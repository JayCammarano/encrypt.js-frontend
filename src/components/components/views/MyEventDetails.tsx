import React, { Fragment } from 'react';
import { toast } from 'react-toastify';
import { IEventDetails } from '../../../helpers/eventsInterface';

const MyEventDetails: React.FC<IEventDetails> = ({fullEvent, event, invites}) => {
    let buttons;

    const onAccept = async (eventID: string) => {
        const body ={
            "invitedEvent": eventID,
            "accepted": true
        }
        const response = await fetch('http://localhost:1337/events/respond', {
            method: 'PATCH',
            headers: { token: localStorage.token,
                    'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });
        const parseResponse = await response.json();
        if(parseResponse === "Invite Accepted"){
          toast.success("Invite Accepted")
        }
    }
    
    const onReject = async (eventID: string) => {
        const body ={
            "invitedEvent": eventID,
            "accepted": false
        }
        const response = await fetch('http://localhost:1337/events/respond', {
            method: 'DELETE',
            headers: { token: localStorage.token,
                    'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });
        const parseResponse = await response.json();
        if(parseResponse === "Invite Deleted"){
          toast.success("Invite Declined")
        }
    }

    
    let eventDisplay;
    if(event){
        eventDisplay = (<Fragment>
            <h1 className="p-4 text-3xl font-medium leading-tight text-center text-gray-900 title-font sm:text-4xl">{event.title}</h1>
            <p className="pl-4 text-gray-600 text-md">Date: {event.date}</p>
            <p className="pl-4 text-gray-600 text-md">Location: {event.location}</p>
            <p className="p-4 text-lg text-gray-600">{event.description}</p>
        </Fragment>)
    }else if(fullEvent){
        if(invites){
            buttons = (
                <Fragment>
                    <button
                        onClick={() => onAccept(fullEvent.eventID)}
                        className="flex flex-row float-left px-2 py-2 ml-4 text-white bg-black border-2 border-black rounded text-md focus:outline-black hover:bg-white hover:border-black hover:text-black hover:outline-back"
                        type="button"
                    >
                        Accept
                    </button>
                    <button
                        onClick={() => onReject(fullEvent.eventID)}
                        className="flex flex-row float-left px-2 py-2 ml-4 bg-white border-2 border-black rounded text-md focus:outline-none hover:bg-gray-300"
                        type="button"
                    >
                        Decline
                    </button>
                </Fragment>
            )
        }
        
        eventDisplay = (<Fragment>
            <h1 className="p-4 text-3xl font-medium leading-tight text-center text-gray-900 title-font sm:text-4xl">{fullEvent.decryptedEvent.title}</h1>
            <p className="pl-4 text-gray-600 text-md">Date: {fullEvent.decryptedEvent.date}</p>
            <p className="pl-4 text-gray-600 text-md">Location: {fullEvent.decryptedEvent.location}</p>
            <p className="p-4 text-lg text-gray-600">{fullEvent.decryptedEvent.description}</p>
            <p className="p-4 text-lg text-gray-600">{buttons}</p>
        </Fragment>)
    }
    return (
        <div className="w-full p-4 overflow-scroll bg-gray-100 border-l-2 border-gray-300">
            {eventDisplay}
        </div>
    )
}

export default MyEventDetails
