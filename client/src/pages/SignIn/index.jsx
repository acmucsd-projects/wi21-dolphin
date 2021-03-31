import React, { useState } from 'react';
import './style.css';
import { useHistory } from "react-router-dom";
import API from "../../API";

function SignIn() {
  const username = useFormInput('');
  const password1 = useFormInput('');
  const password2 = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let history = useHistory();
 
  // handle button click of login form
  const handleLogin = () => {
    if (username.value === "" || password1.value === "" || password2.value === "") {
      alert("Username and password sections cannot be blank");
    }
    else if (password1.value !== password2.value) {
      alert("Passwords do not match");
    }
    else {
      alert("Username: " + username.value + " Password: " + password1.value);
      // add username and password pair to the database

      API.postUser(username.value, password1.value)
      .then((response) => {
        response.send("Success!");
      })
      .catch((error) => {
        console.log("Something wrong happened");
      });

      history.push('/login');
    }
  }
 
  return (
    <div className="signin-component">
      <div className="signin-component2">
        <h1 className="signin">Create an account</h1>
        <div>
          <p className="username">Username</p>
          <input type="text" {...username} autoComplete="new-password" />
        </div>
        <div>
          <p className="password">Password</p>
          <input type="password" {...password1} />
        </div>
        <div>
          <p className="password">Re-enter password</p>
          <input type="password" {...password2} />
        </div>
        {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
        <input className="signin-button" type="button" value={loading ? 'Loading...' : 'Sign In'} onClick={handleLogin} disabled={loading} />
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

export default SignIn