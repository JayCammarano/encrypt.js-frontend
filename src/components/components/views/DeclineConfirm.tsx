import React from 'react';
import { toast } from 'react-toastify';
import { IEventDetails } from '../../../helpers/eventsInterface';

const DeclineConfirm: React.FC<IEventDetails> = ({fullEvent, setWhichTab}) => {
    const onReject = async (eventID: string) => {
        const body ={
            "invitedEvent": eventID,
            "accepted": false
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/events/respond`, {
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
    if(fullEvent && setWhichTab){
        return (
            <div className="w-full p-4 overflow-scroll text-center bg-gray-100 border-l-2 border-gray-300">
                <p>Declines can not be undone.</p><p> Are you sure you wish to decline {fullEvent.decryptedEvent.title}?</p>
                <button
                    onClick={() => onReject(fullEvent.eventID)}
                    className="flex flex-row float-left px-2 py-2 mt-2 ml-4 text-white bg-black border-2 border-black rounded text-md focus:outline-black hover:bg-white hover:border-black hover:text-black hover:outline-back"
                    type="button"
                >
                    Decline
                </button>
                    <button
                    onClick={() => setWhichTab("invites")}
                    className="flex flex-row float-left px-2 py-2 mt-2 ml-4 bg-white border-2 border-black rounded text-md focus:outline-none hover:bg-gray-300"
                    type="button"
                >
                    Cancel
                </button>
        </div>

            
        )
    }
    return ( <p>Oops, something went wrong.</p>)
}

export default DeclineConfirm
