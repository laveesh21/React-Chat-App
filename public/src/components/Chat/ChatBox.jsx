/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState ,useRef} from 'react'
import './ChatBox.css'
import ChatText from './ChatText'
import axios from 'axios'
import  {v4} from 'uuid'

function ChatBox(props) {

    const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
    const{currentChat, currentUser,  socket} = props
    const[onlineStatus, setOnlineStatus] = useState('')
    const[messages, setMessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();

    useEffect(()=>{
        setOnlineStatus(currentChat.onlineStatus)
    },[currentChat])

    useEffect(()=>{
        async function fetchData(){
        if(currentChat){
            const response = await axios.post(`${domain}/message/getmsg`,{
                from:currentUser._id,
                to:currentChat._id,
            })
            setMessages(response.data)
        }
        }
        fetchData()
    },[currentChat])


    //SOCKET EFFECTS
    useEffect(() => {
        if (socket.current) {
          socket.current.on("msg-recieve", (msg) => {
            setArrivalMessage({ fromSelf: false, message: msg });
          });
        }
      }, []);

      useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage]);
    
      useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);


      // FUNTION SEND MSG HANDLE
    async function handleSendMsg(msg){
        await axios.post(`${domain}/message/addmsg`,{
            from:currentUser._id,
            to:currentChat._id,
            message: msg,
        })

        socket.current.emit("send-msg", {
            from:currentUser._id,
            to:currentChat._id,
            message: msg,
        })

        const msgs = [...messages];
        msgs.push({fromSelf: true, messages:msg})
        setMessages(msgs)

    }

  return (
    <>
    <div className="chatHeader">
        <div className="userName">{currentChat.fullname}</div>
        <div className="onlineStatus">{onlineStatus}</div>
    </div>
    <div className="chatBody">
        {
            messages.map((message)=>{
                return(
                    <>
                    <div ref={scrollRef} key={v4()}>
                     <div className={`message ${message.fromSelf ? "sended":"recieved"}`}>
                     <p>{message.message}</p>
                     </div>
                    </div>
                    </>
                )
            })
        }
    </div>
    <div className="chatTextBox">
        <ChatText handleSendMsg={handleSendMsg}/>
    </div>
    </>
  )
}

export default ChatBox