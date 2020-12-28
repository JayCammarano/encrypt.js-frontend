import React, { ChangeEvent, Fragment, useState } from 'react'
interface ISignIn {
    setAuth: (boolean: boolean) => void

}
const SignIn: React.FC<ISignIn> = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    }) 
   const onChangeInputs = (e: ChangeEvent<HTMLInputElement>) => {
        setInputs({...inputs, [e.target.name]: e.target.value})
    }


    return (
        <Fragment>
            <h1>Sign In</h1>
            <form>
                <input type="text" name="username" placeholder="username" value={inputs.username} onChange={onChangeInputs}/>
                <input type="password" name="password" placeholder="password" value={inputs.password} onChange={onChangeInputs} />
                <button type="submit">Submit</button>
            </form>
        </Fragment>
    )
}

export default SignIn
