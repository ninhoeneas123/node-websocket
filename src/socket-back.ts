import { io } from "./server"
import ChatTechModel from './db/schemas/chat-tech.schema'
import { SaveMenssage } from "./interfaces/save-message.interface"

const clientRooms: Record<string, Set<string>> = {};
async function findDocument(chatName: string) {
    const document = await ChatTechModel.find()
    return document
}

async function createMessageTech(data: SaveMenssage) {
    const dataMessage = data
    dataMessage.shippingTime = Date.now()
    await ChatTechModel.create(dataMessage)
}

io.on('connection', (socket: any) => {
    
    socket.on('select-chat', async (chatName: string, returnText: any) => {
        socket.join(chatName)
        const historicChat = await findDocument(chatName)

        if (historicChat) {
            socket.emit("historic-message", historicChat)
        }
    })

    socket.on('create-message-back', async (data: SaveMenssage) => {
        console.log(data)
        createMessageTech(data)
        socket.to(data.chatName).emit('create-message-front', data)
    })

    socket.on("disconnect", (reason: any) => {
        console.log(`The socket "${socket.id}" has been disconnected!
        Reason: ${reason}`);
    });

})

