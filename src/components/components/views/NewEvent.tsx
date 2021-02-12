import React, { KeyboardEvent, ChangeEvent, useState } from 'react'
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

    const onChangeInvitee = (e: ChangeEvent<HTMLInputElement>) => {
        setInvitee(e.target.value);
      };
      
    const addInvitees = (e: KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        if(e.key === "enter"){
            inputs.invitees.push(invitee);
        }
    }
    const eventPrep = () => {
        const privateKey = localStorage.getItem("secret_key")
        if(typeof privateKey === 'string'){
        const event = new Event(inputs, privateKey)
        return event.newEventPrep()
        }else{
        return false
        }
    }
    const onSubmitHandler = async () => {
        try {
            const validEvent = {encrypted_event: eventPrep()}
            if(typeof validEvent === 'object'){
                const submit = new onSubmit(validEvent, 'localhost:1337/auth/signin')
                const results = await submit.onSubmit()
                if(results === true){
                    setWhichTab("myEvents")
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
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
                    <input id="invitee" className="m-3 border-2 border-black rounded" name="invitee" onChange={onChangeInvitee} onKeyPress={addInvitees} placeholder="invitee" type="invitee" value={invitee} />
                </label>
                </div>
                <button className="px-2 py-2 ml-4 text-xs text-white bg-black border-0 rounded focus:outline-black hover:bg-white hover:border-black hover:text-black hover:outline-back" type="submit">
                Submit
                </button>
            </form>
        </div>
    )
}

export default NewEvent
