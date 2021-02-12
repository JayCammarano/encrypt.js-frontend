import React, { Fragment, MouseEvent, ChangeEvent, useState, FormEvent } from 'react'
import IEventViews from "../EventViewsInterface"
import Event from "../../../helpers/event"
import onSubmit from "../../../helpers/onSubmit"

const NewEvent: React.FC<IEventViews> = ({setWhichTab}) => {
    const [inputs, setInputs] = useState({
        "title": "",
        "description": "",
        "date": "",
        "location":"",
        "invitees": [""]
    })
    
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
        <p key={position}>{invitee} <button className="pl-2 pr-2 border-2 border-black rounded"  onClick={() => removeInvitee(position)}>Remove</button></p>
        )
    })

    const onChangeInvitee = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setInvitee(e.target.value);
    };

    const eventPrep = () => {
        const privateKey = localStorage.getItem("secret_key")
        if(typeof privateKey === 'string'){
        const event = new Event(inputs, privateKey)
        return event.newEventPrep()
        }else{
        return false
        }
    }
    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const validEvent = {encryptedEvent: eventPrep()}
            if(typeof validEvent.encryptedEvent === 'string'){
                const token = localStorage.getItem("token")
                if(typeof token === 'string'){
                    const submit = new onSubmit(validEvent, 'http://localhost:1337/events/new', token)
                    const results = await submit.onSubmit()
                    if(results === true){
                        setWhichTab("myEvents")
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Fragment>
            <div className="border-2 border-black">
                <h5>Invited Users:</h5>
                {displayInvitees}
            </div>
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
        </Fragment>
    )
}

export default NewEvent
