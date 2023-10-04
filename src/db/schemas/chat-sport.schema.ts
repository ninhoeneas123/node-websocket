import mongoose from "mongoose";

const chatSportSchema = new mongoose.Schema({

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

const ChatSportModel = mongoose.model('chat-sport', chatSportSchema);

export default ChatSportModel