import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, Link } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  const handleDemo = (e) => {
    e.preventDefault();
    dispatch(sessionActions.demoUser());

    history.push('/')
  }

  return (
    <div id="log-in-container">
      <form id="login-form" onSubmit={handleSubmit}>
          <div className="login-form-header">
            <h4>Please log in to Lairbnb</h4>
            <h6>By logging in to Lairbnb, you hereby agree to not sue us in the event of paranormal activity.</h6>
          </div>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            autoComplete='off'
            className="login-form-input"
            placeholder='Username or Email'
          />
        </label>
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete='off'
            className="login-form-input"
            placeholder='Password'
          />
        </label>
        <button id="log-in-submit" className="login-form-button" type="submit">Log In</button>
        <div className="login-form-sign-up-container">
              <p className="login-form-sign-up">New to Lairbnb? <Link to="/signup" className="login-form-sign-up-link">Sign up</Link></p>
        </div>
        <button id="demo-link" className="login-form-button" onClick={handleDemo}>Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormPage;
