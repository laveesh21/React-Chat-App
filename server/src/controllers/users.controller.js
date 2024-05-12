import User from "../models/user.model.js";

const users = async (req, res)=>{
    try{
        const users = await User.find({_id:{$ne: req.params.id}}).select([
            "fullname", "email", "username", "onlineStatus", "_id"
        ])
        res.json(users)
        // console.log('USERS: ', users)
    }catch(err){
        console.log("SERVER ERROR: Error while getting users:", err)
        res.status(500).json({message: "Internal Server Error", err})
    }
}


export {users}