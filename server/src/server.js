import dotenv from 'dotenv'
import connectDB from "./config/database.js";
import app from  "./app.js"

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

