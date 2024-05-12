/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Users from "./Users";

function Chat() {
  const navigate = useNavigate();
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    async function fetchData() {
      const decodedToken = decodeJWTFromLocalStorage();
      if (!decodedToken) {
        navigate("/login");
      } else {
        setCurrentUser(decodedToken._id);
      }
    }
  
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        const data = await axios.get(`${domain}/users/${currentUser}`);
        console.log(data.data)
        setUsers(data.data)
      }
    }
    fetchData();
  }, [currentUser]);

  function decodeJWTFromLocalStorage() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return null;
      }

      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  }

  return (
    <>
      <div className="main-container">
        <Users users={users} currentUser={currentUser}/>
      </div>
    </>
  );
}



export default Chat;
