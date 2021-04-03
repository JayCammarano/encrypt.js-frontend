import React, { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import IPages from "./PagesInterface";

const SignIn: React.FC<IPages> = ({ setAuth }) => {
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
      const response = await fetch(process.env.APIURL + '/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();
      if(parseResponse.token){
        
        localStorage.setItem('token', parseResponse.token);
        setAuth(true);
        toast.success("Logged in successfully!")
      }else{
        toast.error(parseResponse)
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  
  return (
    <Fragment>
      <div className="w-1/3 h-screen bg-gray-300 ">  
        <div className="text-center">
          <h1 className="p-4 text-3xl font-medium leading-tight text-gray-900 title-font sm:text-4xl">Sign In</h1>
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
          <Link to="/signup">
            <button className="px-2 py-2 m-4 text-xs text-black bg-white border-0 rounded focus:outline-white hover:bg-black hover:border-white hover:text-white hover:outline-back" type="button">Sign Up</button>
          </Link> 
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default SignIn;
