import mongoose from "mongoose";

const chatTechSchema = new mongoose.Schema({

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

const ChatTechModel = mongoose.model('chat-tech', chatTechSchema);

export default ChatTechModel