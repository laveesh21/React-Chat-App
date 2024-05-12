import mongoose, {Schema, trusted} from 'mongoose'

const messageSchema = new Schema({
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    message: {
      text:{
        type: String,
        required: true,
      }
    },
    users:{
      type: Array
    },

  }, {timestamps: true});
  
  const Message = mongoose.model('Message', messageSchema);

  export default Message