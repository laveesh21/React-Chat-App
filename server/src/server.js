import dotenv from 'dotenv'
import connectDB from "./config/database.js";
import app from  "./app.js"
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors'
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin: "http://localhost:3000",
        credential: true,
    },
});

dotenv.config()


const PORT = process.env.PORT
connectDB()
.then(()=>{
    app.listen( PORT || 3000, ()=>{
        console.log(`Server is listening at PORT:${PORT}`)
    })
})
.catch((err)=>{
    console.log("MongoDB Connection Failed")
})


global.onlineUsers = new Map()

io.on("connection", (socket) => {

  console.log("\n\nSOCKET FIRE UP\n\n")

    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });