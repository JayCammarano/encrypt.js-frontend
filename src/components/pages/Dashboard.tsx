import React, { Fragment, useState, useEffect } from 'react';
interface IDashboard {
  setAuth: (boolean: boolean) => void;
}
const Dashboard: React.FC<IDashboard> = ({ setAuth }) => {
  const [user, setUser] = useState({ user_name: '' });

  const getName = async () => {
    try {
      const response = await fetch('http://localhost:1337/dashboard', {
        method: 'GET',
        headers: { token: localStorage.token }
      });

      const parseResponse = await response.json();
      debugger;
      setUser(parseResponse);
      localStorage.setItem('secretKey', parseResponse.secretKey);
    } catch (err) {
      console.error(err.message);
    }
  };
  const logout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('secretKey');
    setAuth(false);
  };

  useEffect(() => {
    getName();
  }, []);
  return (
    <Fragment>
      <h1>Hello, {user.user_name}</h1>
      <button onClick={(e) => logout(e)}>Sign Out</button>
    </Fragment>
  );
};

export default Dashboard;
