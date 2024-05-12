/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Users from "./Users";
import Welcome from "./Welcome";
import ChatBox from "./ChatBox";
import './Chat.css'
import {Socket, io}  from 'socket.io-client'

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [currentChat, setCurrentChat] = useState(undefined)

  useEffect(() => {
    async function fetchData() {
      const decodedToken = decodeJWTFromLocalStorage();
      if (!decodedToken) {
        navigate("/login");
      } else {
        setCurrentUser({
          _id : decodedToken._id,
          username: decodedToken.username,
          email: decodedToken.email,
          fullname: decodedToken.fullname
        })
      }
    }
    fetchData();
  }, []);



  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        const data = await axios.get(`${domain}/users/${currentUser._id}`);
        setUsers(data.data)
      }
      if (currentUser){
        socket.current = io(domain)
        Socket.current.emit("add-user", currentUser._id)
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


  const handleChatChange = (chat)=>{
    setCurrentChat(chat)
  }

  return (
    <>
      <div className="main-container">
        <div className="chatList">
        <Users users={users} currentUser={currentUser} changeChat={handleChatChange}/>
        </div>
        <div className="currentChatBox">
        {currentChat === undefined ? (
            <Welcome/>
          ) : (
            <ChatBox currentChat={currentChat} currentUser={currentUser} socket={socket}/>
          )}
          </div>
      </div>
    </>

  );
}



export default Chat;
