import mongoose from "mongoose";

const chatAutoSchema = new mongoose.Schema({

    id: {
        type: mongoose.Schema.ObjectId,
    },

    userName: {
        type: String,
        required: true
    },

    messageContent: {
        type: String,
        required: true
    },

    shippingTime: {
        type: Date,
        required: true
    }
})

const ChatAutoModel = mongoose.model('chat-auto', chatAutoSchema);

export default ChatAutoModel