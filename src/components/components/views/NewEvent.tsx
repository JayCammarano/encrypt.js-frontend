import React, { ChangeEvent, useState } from 'react'
const NewEvent: React.FC = () => {
    const [inputs, setInputs] = useState({
        "title": "",
        "description": "",
        "date": "",
        "location":"",
        "invitees": ""
    })
    const onChangeInputs = (e: ChangeEvent<HTMLInputElement>) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
      };
    
    return (
        <div>
        <form>
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
            <button className="px-2 py-2 ml-4 text-xs text-white bg-black border-0 rounded focus:outline-black hover:bg-white hover:border-black hover:text-black hover:outline-back" type="submit">
            Submit
            </button>
        </form>

        </div>
    )
}

export default NewEvent
