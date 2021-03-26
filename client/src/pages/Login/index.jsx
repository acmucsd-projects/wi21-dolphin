import './style.css';
import React, { useState } from 'react';
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
import API from '../../API';
import { setUserSession } from '../../utils/Common';

function Login(props) {
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let history = useHistory();
 
  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    API.signIn(username.value, password.value)
    .then((response) => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      history.push('/home');
    })
    .catch((err) => {
      setLoading(false);
      if (err.response.status === 401 || err.response.status === 400) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    })
    /*if (username.value === "" || password.value === "") {
      alert("Username and password sections cannot be blank");
    }
    else {
      alert("Username: " + username.value + " Password: " + password.value);
      // check if username password pair is in the database
      history.push('/home');
    }*/
  }
 
  return (
    <div className="login-component">
      <div className="login-component2">
        <h1 className="login">Login</h1>
        <div>
          <p className="username">Username</p>
          <input type="text" {...username} autoComplete="new-password" />
        </div>
        <div>
          <p className="password">Password</p>
          <input type="password" {...password} autoComplete="new-password" />
        </div>
        {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
        <input className="login-button" type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} />
        <div>
        <p className="signin">Don't have an account? Sign in <Link to="/signin">here</Link></p>
        </div>
      </div>
    </div>
  );
}
 
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;
