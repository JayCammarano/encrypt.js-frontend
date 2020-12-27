import React, { Fragment } from 'react'
interface ISignIn {
    setAuth: (boolean: boolean) => void

}
const SignIn: React.FC<ISignIn> = () => {
    return (
        <Fragment>
            <h1>Sign In</h1>
        </Fragment>
    )
}

export default SignIn
