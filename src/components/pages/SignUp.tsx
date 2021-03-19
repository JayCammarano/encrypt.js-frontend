import React, { ChangeEvent, FormEvent, Fragment, useState } from 'react'
import { Link } from "react-router-dom"
import IPages from './PagesInterface'


const SignUp: React.FC<IPages> = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        password_confirmation: ""
    })
    const onChangeInputs = (e: ChangeEvent<HTMLInputElement>) => {
        setInputs({...inputs, [e.target.name]: e.target.value})
    }
    const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const body = {username: inputs.username, password: inputs.password}
        try {
            const response = await fetch("http://localhost:1337/auth/register",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            const parseResponse =  await response.json()
            localStorage.setItem("token", parseResponse.token)
            setAuth(true)
        } catch (err) {
            console.error(err.message)
        }
    }
    
    return (
        <Fragment>
            <div className="w-1/5 h-screen bg-gray-300 ">
            <h1 className="p-4 text-3xl font-medium leading-tight text-gray-900 title-font sm:text-4xl">Sign Up</h1>
            <form onSubmit={onSubmitForm}>
            <div>
                <label htmlFor="Username">
                    <input className="m-3 border-2 border-black rounded" type="text" name="username" placeholder="username" value={inputs.username} onChange={e => onChangeInputs(e)}/>
            </label>
            </div>
            <div>
                <label htmlFor="Username">
                    <input className="m-3 border-2 border-black rounded" type="password "name="password" placeholder="password" value={inputs.password} onChange={e => onChangeInputs(e)}/>
                </label>
            </div>
            <div>
                <label htmlFor="Username">
                    <input className="m-3 border-2 border-black rounded" type="password "name="password_confirmation" placeholder="password confirmation" value={inputs.password_confirmation} onChange={e => onChangeInputs(e)}/>
                </label>
            </div>
            <button className="px-2 py-2 ml-4 text-xs text-white bg-black border-0 rounded focus:outline-black hover:bg-white hover:border-black hover:text-black hover:outline-back" type="submit">Submit</button>
            <Link to="/signin">
                <button className="px-2 py-2 m-4 text-xs text-black bg-white border-0 rounded focus:outline-white hover:bg-black hover:border-white hover:text-white hover:outline-back" type="button">Sign In</button>
            </Link> 
            </form>
            </div>

        </Fragment>
    )
}

export default SignUp
