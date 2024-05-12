import Message from '../models/message.model.js'

const addMessage = async (req, res)=>{
    try{
        console.log("\n ",req.body)
        const{from, to, message} = req.body
        const data = await Message.create({
            message:{text:message},
            users:[from, to],
            sender:from,
        })
        if(data)return res.json({ msg: 'Message added to database'})
            return res.json({msg: 'Failed to add message to database'})
    }catch(err){
        res.send(500).json({error: "INTERNAL SERVER ERROR"})
    }
}
const getMessage = async (req, res)=>{
    try{
        const {from , to} = req.body
        const messages = await Message.find({
            users:{$all:[from,to]}
        }).sort({ updatedAt: 1 });

        const projectedMessages = messages.map((msg) => {
            return {
              fromSelf: msg.sender.toString() === from,
              message: msg.message.text,
            };
          });
          res.json(projectedMessages);
        
    }catch(err){
        res.send(500).json({error: "INTERNAL SERVER ERROR"})
    }
}

export {addMessage, getMessage}