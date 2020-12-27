import React, { Fragment } from 'react'
interface ISignUp {
    setAuth: (boolean: boolean) => void

}
const SignUp: React.FC<ISignUp> = () => {
    return (
        <Fragment>
            <h1>Sign Up</h1>
        </Fragment>
    )
}

export default SignUp
