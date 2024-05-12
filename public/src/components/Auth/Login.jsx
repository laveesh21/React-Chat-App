// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import "react-toastify/ReactToastify.css"

function LogIn() {
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        const response = await axios.post(`${domain}/auth/login`, {
            username,
            password,
        });

        const token = response.data.token;

        localStorage.setItem('token', token);

        toast.info("Login Successfull", {
            position: "top-right",
            autoClose: 2000,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });

          navigate('/chats')

    } catch (error) {
        toast.error("Login Failed", {
            position: "top-right",
            autoClose: 2000,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          })
      console.error("INTERNAL SERVER ERROR: Error while loging in :\n", error);
    }
  };

  return (
    <>
      <div className="login-body">
        <div className="login-container">
          <h1>Log in</h1>

          <form onSubmit={handleSubmit}>
            <div className="login-form">
              <input
                type="text"
                name="username"
                placeholder="Username"
                id="usernameInput"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <i className="bx bxs-user-circle"></i>
            </div>

            <div className="login-form">
              <input
                type="password"
                name="password"
                placeholder="Password"
                id="userpassInput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className="bx bxs-lock-alt"></i>
            </div>

            <div className="remember-forgot">
              <label htmlFor="rememberMe">
                <input type="checkbox" id="rememberMe" />
                Remember me
              </label>
              <Link to="/forgot_password">Forgot password?</Link>
            </div>

            <button className="btn" type="submit">
              Login
            </button>

            <div className="register-link">
              Don&apost have an account? <Link to="/signup">Register</Link>
            </div>

          </form>

          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default LogIn;
