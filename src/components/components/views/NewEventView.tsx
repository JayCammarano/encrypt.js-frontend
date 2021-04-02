import isFuture from 'date-fns/isFuture'
import React, { ChangeEvent, FormEvent, Fragment, MouseEvent, useState } from 'react'
import { toast } from "react-toastify"
import { EventInfo } from '../../../helpers/eventsInterface'
import NewEvent from "../../../helpers/newEvent"
import onSubmit from "../../../helpers/onSubmit"
import IEventViews from "../EventViewsInterface"
import DateInput from './DateInput'

const NewEventView: React.FC<IEventViews> = ({setWhichTab}) => {
    let newEvent: EventInfo = {
        "title": "",
        "description": "",
        "unformatedDate": { year: "2021", month: "00", day: "00", time: "00:00"
        },
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
    const removeInvitee = ( indexToRemove: number ) => {
        // eslint-disable-next-line array-callback-return
        let cleanedArray = inputs.invitees
        cleanedArray.splice(indexToRemove-1, 1)
        setInputs({...inputs, invitees: cleanedArray})
    }
    
    let position: number = -1
    const displayInvitees = inputs.invitees.map((invitee: string) => {
        position = position + 1
        return(
        <div className="flex p-2">
            <p key={position}>{invitee}
                <button className="pl-2 pr-2 ml-4 border-2 border-black rounded" id={position.toString()}  onClick={() => removeInvitee(position)}>
                    Remove
                </button>
            </p>
        </div>)
    })

    const onChangeInvitee = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setInvitee(e.target.value);
    };

    const isDateFutureandValid = () => {
        if(inputs.unformatedDate){
            const fullDate = new Date(parseInt(inputs.unformatedDate.year), parseInt(inputs.unformatedDate.month), parseInt(inputs.unformatedDate.day))
            if(isFuture(fullDate)){
                return true
            } 
        }
        return false
    }
    const isInputNotEmpty = (inputField: string | undefined) => {
        if(inputField !== '' && inputField !== undefined){
            return true
        }
        return false
    }
    const formatAndValidate = () => {
        if(isDateFutureandValid()){
            if(inputs.unformatedDate){
                const validDate = inputs.unformatedDate.year + "-" + inputs.unformatedDate.month + "-" + inputs.unformatedDate.day + " " + inputs.unformatedDate.time
                const validCheck = [inputs.title, inputs.description, inputs.location].map((input: string | undefined)=> {
                    if(isInputNotEmpty(input)){
                        return true
                    }
                    toast.error(`${input} cannot be blank`)
                    return false
                })
                
                if(!validCheck.includes(false)){
                    return {
                        title: inputs.title,
                        description: inputs.description,
                        date: validDate,
                        location: inputs.location,
                        invitees: inputs.invitees
                    }
                }
                return false
            }               
            toast.error("no date")
            return false
        }
        toast.error("Invalid Date. Dates must be in the future and formatted yyyy-mm-dd")
        return false 
    }

    const eventPrep = () => {
        const privateKey = localStorage.getItem("privateKey")
        if(typeof privateKey === 'string'){
            const eventOrFalse = formatAndValidate()
            if(eventOrFalse){
                const event = new NewEvent(eventOrFalse, privateKey)
                return event.newEventPrep()
            }
        }
        return false
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
        <Fragment>
            <div className="w-full p-4 text-center bg-gray-100 border-l-2 border-gray-300">
                <h1 className="p-4 text-3xl font-medium leading-tight text-center text-gray-900 title-font sm:text-4xl">Create New Event</h1>            
                <div className="flex w-full">
                <form className="p-4" onSubmit={onSubmitHandler}>
                    <div>
                        <label htmlFor="Title">
                            <input className="m-3 border-2 border-black rounded" name="title" id="title" required onChange={onChangeInputs} placeholder="Title" value={inputs.title} />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="location">
                            <input className="m-3 border-2 border-black rounded" name="location" id="location" required onChange={onChangeInputs} placeholder="Location" value={inputs.location} />
                        </label>
                    </div>
                    <div>
                    <DateInput date={inputs} setDate={setInputs}/>
                    <label htmlFor="description">
                        <input id="description" required className="m-3 border-2 border-black rounded" name="description" onChange={onChangeInputs} placeholder="description" type="description" value={inputs.description} />
                    </label>
                    </div>
                    <div>
                    <label htmlFor="invitee">
                        <input id="invitee" className="m-3 border-2 border-black rounded" name="invitee" onChange={onChangeInvitee} placeholder="Invite Someone" type="invitee" value={invitee} />
                        <button type="button" className="px-2 py-2 ml-4 text-xs text-white bg-black border-0 rounded focus:outline-black hover:bg-white hover:border-2 hover:border-black hover:text-black hover:outline-back" name="addInvitee" onClick={addInvitees}>Add</button>
                    </label>
                    </div>
                    <button className="px-2 py-2 ml-4 text-xs text-white bg-black border-0 rounded focus:outline-black hover:bg-white hover:border-black hover:border-2 hover:text-black hover:outline-back" type="submit">
                    Submit
                    </button>
                </form>  
                <div className="flex flex-col w-2/3 p-8 overflow-scroll text-center border-2 border-black rounded">
                    <h5>Invited Members:</h5>
                    {displayInvitees}
                </div>
            </div>
        </div>
        </Fragment>
    )
}

export default NewEventView
