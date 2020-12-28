import React, { ChangeEvent, FormEvent, Fragment, useState } from 'react'
import {Link} from "react-router-dom"
interface ISignIn {
    setAuth: (boolean: boolean) => void

}
const SignIn: React.FC<ISignIn> = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    }) 
   const onChangeInputs = (e: ChangeEvent<HTMLInputElement>) => {
        setInputs({...inputs, [e.target.name]: e.target.value})
    }

    const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const body = {username: inputs.username, password: inputs.password}
        try {
            const response = await fetch("localhost:1337/auth/signin",{
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
            <h1>Sign In</h1>
            <form onSubmit={onSubmitForm}>
                <input type="text" name="username" placeholder="username" value={inputs.username} onChange={onChangeInputs}/>
                <input type="password" name="password" placeholder="password" value={inputs.password} onChange={onChangeInputs} />
                <button type="submit">Submit</button>
            </form>
            <Link to="/register">Sign Up</Link>
        </Fragment>
    )
}

export default SignIn
