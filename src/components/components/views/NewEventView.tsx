import React, { ChangeEvent, FormEvent, MouseEvent, useState } from 'react'
import { toast } from "react-toastify"
import { EventInfo } from '../../../helpers/eventsInterface'
import NewEvent from "../../../helpers/newEvent"
import onSubmit from "../../../helpers/onSubmit"
import IEventViews from "../EventViewsInterface"

const NewEventView: React.FC<IEventViews> = ({setWhichTab}) => {
    let newEvent: EventInfo = {
        "title": "",
        "description": "",
        "date": "",
        "location":"",
        "invitees": []
    };
    
    const [inputs, setInputs] = useState(newEvent)
    
    const [invitee, setInvitee] = useState("")
    const onChangeInputs = (e: ChangeEvent<HTMLInputElement>) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
      };

    
    const addInvitees = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        inputs.invitees.push(invitee);
        setInvitee("")
    }
    const removeInvitee = ( position: number) => {
        inputs.invitees.slice(position)
    }
    
    let position: number = -1
    const displayInvitees = inputs.invitees.map((invitee: string) => {
        position = position + 1
        return(
        <p key={position}>{invitee} 
            <button className="pl-2 pr-2 border-2 border-black rounded"  onClick={() => removeInvitee(position)}>
                Remove
            </button>
        </p>)
    })

    const onChangeInvitee = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setInvitee(e.target.value);
    };

    const eventPrep = () => {
        const privateKey = localStorage.getItem("privateKey")
        if(typeof privateKey === 'string'){
            const event = new NewEvent(inputs, privateKey)
            console.log("world")
            return event.newEventPrep()
        }else{
            console.log("hello")
            return false
        }
    }
    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const validEvent = {encryptedEvent: eventPrep()}
            if(validEvent.encryptedEvent){
                const token = localStorage.getItem("token")
                if(typeof token === 'string'){
                    const submit = new onSubmit(validEvent, 'http://localhost:1337/events/new', token)
                    const results = await submit.onSubmit()
                    if(results === true){
                        setWhichTab("myEvents")
                        toast.success("New Event Created!")
                    }
                }
            }
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <div className="flex flex-row w-2/3 text-center">
            <div className="flex text-center border-2 border-black rounded">
                <h5>Invitees</h5>
                {displayInvitees}
            </div>
            <div className="flex">
            <form onSubmit={onSubmitHandler}>
                <div>
                    <label htmlFor="Title">
                        <input className="m-3 border-2 border-black rounded" name="title" id="title" onChange={onChangeInputs} placeholder="Title" value={inputs.title} />
                    </label>
                </div>
                <div>
                    <label htmlFor="location">
                        <input className="m-3 border-2 border-black rounded" name="location" id="location" onChange={onChangeInputs} placeholder="Location" value={inputs.location} />
                    </label>
                </div>
                <div>
                <label htmlFor="date">
                    <input className="m-3 border-2 border-black rounded" name="date" id="date" onChange={onChangeInputs} placeholder="date" value={inputs.date} />
                </label>
                </div>
                <div>
                <label htmlFor="description">
                    <input id="description" className="m-3 border-2 border-black rounded" name="description" onChange={onChangeInputs} placeholder="description" type="description" value={inputs.description} />
                </label>
                </div>
                <div>
                <label htmlFor="invitee">
                    <input id="invitee" className="m-3 border-2 border-black rounded" name="invitee" onChange={onChangeInvitee} placeholder="Invite Someone" type="invitee" value={invitee} />
                    <button type="button" className="px-2 py-2 ml-4 text-xs text-white bg-black border-0 rounded focus:outline-black hover:bg-white hover:border-black hover:text-black hover:outline-back" name="addInvitee" onClick={addInvitees}>Add</button>
                </label>
                </div>
                <button className="px-2 py-2 ml-4 text-xs text-white bg-black border-0 rounded focus:outline-black hover:bg-white hover:border-black hover:text-black hover:outline-back" type="submit">
                Submit
                </button>
            </form>  
            </div>
        </div>
    )
}

export default NewEventView
