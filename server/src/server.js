import dotenv from 'dotenv'
dotenv.config()
import connectDB from "./database/database.js";
import app from  "./app.js"


const PORT = process.env.PORT


connectDB()
.then(()=>{
    app.listen( PORT || 8000, ()=>{
        console.log(`Server is listening at PORT:${PORT}`)
    })
})
.catch((err)=>{
    console.log("MongoDB Connection Failed")
})
