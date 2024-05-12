// eslint-disable-next-line no-unused-vars
import  React, { useState } from 'react';
import axios from 'axios'; // Import axios for making API requests
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css"

function SignUp() {
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullname || !username || !email || !password || !confirmPassword) {
      toast.error("Fill all detials", {
        position: "top-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      })
      return;
    }

    if(password!=confirmPassword){
        toast.error("Password doesn't match", {
            position: "top-right",
            autoClose: 2000,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          })
    }
    try {
      const response = await axios.post(`${domain}/auth/signup`, {
        fullname,
        username,
        email,
        password,
      });

      console.log('Signup successful:', response.data.toke);
      navigate('/login');

    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="signup-body">
      <div className="signup-container">
        <h1>Sign Up</h1>

        <form onSubmit={handleSubmit}>

         <div className="signup-form">
            <label htmlFor="fullname">Full Name:</label>
            <input
              type="text"
              className="signup-input"
              name="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>

          <div className="signup-form">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              className="signup-input"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="signup-form">
            <label htmlFor="email">Email ID:</label>
            <input
              type="email"
              className="signup-input"
              id="emailInput"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="signup-form">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="signup-input"
              id="passwordInput"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="signup-form">
          <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              className="signup-input"
              id="confirmPasswordInput"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn" type="submit">
            Sign Up
          </button>
        </form>
        <ToastContainer/>
      </div>
    </div>
  );
}

export default SignUp;
