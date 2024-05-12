import React, { useState } from 'react'
import styled from "styled-components";


function ChatText({handleSendMsg}) {

    const[msg, setMsg] = useState('')

    const sendChat = (e)=>{
        e.preventDefault()
        if(msg.length>0){
            handleSendMsg(msg)
            // console.log("Fire")
            setMsg("")
    }
}

  return (
    <Container>
    <div>
        <form onSubmit={(e)=>sendChat(e)}>
            <input type="text" placeholder='Text Here' value={msg} onChange={(e)=>setMsg(e.target.value)}/>
            <button className='btn' type='submit'>Send</button>
        </form>
    </div>
    </Container>
  )
}
const Container = styled.div`
    display: flex;
    justify-content: center;
    alighn-items: center;
    input{
        width: 70vw;
        height: 40px;
        border: none;
        border-radius: 50px;
        padding: 15px 35px;
        font-size: 22px;
        color: white;
        background-color: rgb(3, 1, 12);
    }
    button{
        border: none;
        border-radius: 50px;
        background-color: rgb(13, 171, 51);
        color: white;
        font-size: 28px;
        margin-left: 20px;
        padding: 5px 40px;
    }
`

export default ChatText