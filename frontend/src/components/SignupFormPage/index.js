import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, Link } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const handleDemo = (e) => {
    e.preventDefault();
    dispatch(sessionActions.demoUser());

    history.push('/spots')
  }

  return (
    <div id="sign-up-container">
      <form id="signup-form" onSubmit={handleSubmit}>
          <div className="login-form-header">
            <h4>Please sign up for Lairbnb</h4>
            <h6>By signing up to Lairbnb, you hereby agree not to use our lairs for villain-like activities.</h6>
          </div>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signup-form-input"
            autoComplete="off"
            placeholder="Email"
          />
        </label>
        <label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="signup-form-input"
            autoComplete="off"
            placeholder="Username"
          />
        </label>
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signup-form-input"
            autoComplete="off"
            placeholder="Password"
          />
        </label>
        <label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="signup-form-input"
            autoComplete="off"
            placeholder="Confirm Password"
          />
        </label>
        <button type="submit" id="signup-submit" className="signup-form-button">Sign Up</button>
        <div className="login-form-sign-up-container">
              <p className="login-form-sign-up">Already have an account? <Link to="/login" className="login-form-sign-up-link">Log in</Link></p>
        </div>
        <button id="demo-link" className="signup-form-button" onClick={handleDemo}>Demo User</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
