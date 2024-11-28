import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [errors, setErrors] = useState(null);

  const { setUser, setToken } = useStateContext();
  const onSubmit = (ev) => {
    ev.preventDefault();

    // // Client-side validation
    // if (!nameRef.current.value || !emailRef.current.value || !passwordRef.current.value || !passwordConfirmationRef.current.value) {
    //   setErrors({ general: "All fields are required." });
    //   return;
    // }

    // if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
    //   setErrors({ general: "Passwords do not match." });
    //   return;
    // }

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    axiosClient.post('/signup', payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch(err => {
        console.log(err);
        const response = err.response;
        if (response) {
          if (response.status === 422) {
            setErrors(response.data.errors);
          } else if (response.status === 401) {
            setErrors({ general: "Unauthorized. Please log in again." });
          } else {
            setErrors({ general: "An unexpected error occurred. Please try again." });
          }
        } else {
          setErrors({ general: "Network error. Please check your connection." });
        }
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Sign up for an account today!</h1>
          {errors && <div className='alert'>
            {errors.general && <p>{errors.general}</p>}
            {Object.keys(errors).map(key => (
              key !== "general" && <p key={key}>{errors[key][0]}</p>
            ))}
          </div>}
          <input ref={nameRef} placeholder="Full Name" />
          <input ref={emailRef} type="email" placeholder="Email Address" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation" />
          <button className="btn btn-block">Sign Up</button>
          <p className="message">
            Already Registered? <Link to={"/login"}>Sign in now!</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
