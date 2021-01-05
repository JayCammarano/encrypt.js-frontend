import React, { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
interface ISignIn {
  setAuth: (boolean: boolean) => void;
}
const SignIn: React.FC<ISignIn> = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });
  const onChangeInputs = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = { username: inputs.username, password: inputs.password };
    try {
      const response = await fetch('http://localhost:1337/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();
      localStorage.setItem('token', parseResponse.token);
      setAuth(true);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <h1 className="mb-4 text-3xl font-medium leading-tight text-gray-900 title-font sm:text-4xl">Sign In</h1>
      <form onSubmit={onSubmitForm}>
        <div>
          <label htmlFor="Username">
            <input className="m-3 border-2 border-black rounded" name="username" id="username" onChange={onChangeInputs} placeholder="Username" value={inputs.username} />
          </label>
        </div>

        <div>
          <label htmlFor="Password">
            <input id="password" className="m-3 border-2 border-black rounded" name="password" onChange={onChangeInputs} placeholder="Password" type="password" value={inputs.password} />
          </label>
        </div>
        <button className="px-2 py-2 ml-4 text-xs text-white bg-black border-0 rounded focus:outline-black hover:bg-white hover:border-black hover:text-black hover:outline-back" type="submit">
          Submit
        </button>
      </form>
      <Link to="/register">
        <button type="button">Sign Up</button>
      </Link>
    </Fragment>
  );
};

export default SignIn;
