import React, { ChangeEvent, FormEvent, Fragment, useState } from 'react'
import {Link} from "react-router-dom"
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
            <div>
            <h1>Sign Up</h1>
            <form onSubmit={onSubmitForm}>
                <input type="text" name="username" placeholder="username" value={inputs.username} onChange={e => onChangeInputs(e)}/>
                <input type="password "name="password" placeholder="password" value={inputs.password} onChange={e => onChangeInputs(e)}/>
                <input type="password "name="password_confirmation" placeholder="password confirmation" value={inputs.password_confirmation} onChange={e => onChangeInputs(e)}/>
                <button type="submit">Submit</button>
            </form></div>
            <div />
            <Link to="/register">Sign In</Link>

        </Fragment>
    )
}

export default SignUp
