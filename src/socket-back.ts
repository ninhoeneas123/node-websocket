import { io } from "./server"
import ChatTechModel from './db/schemas/chat-tech.schema'
import ChatSportModel from './db/schemas/chat-sport.schema'
import ChatAutoModel from './db/schemas/chat-auto.schema'
import { SaveMenssage } from "./interfaces/save-message.interface"



async function findDocument(chatName: string) {

    let historicData
    switch (chatName) {
        case "tech":
            historicData = await ChatTechModel.find()
            break;
        case "sport":
            historicData = await ChatSportModel.find()
            break;
        case "autos":
            historicData = await ChatAutoModel.find()
            break;
    }
    return historicData
}

async function createMessageTech(chatName: string, data: SaveMenssage) {
    const dataMessage = data
    dataMessage.shippingTime = Date.now()

    switch (chatName) {
        case "tech":
            await ChatTechModel.create(dataMessage)
            break;
        case "sport":
            await ChatSportModel.create(dataMessage)
            break;
        case "autos":
            await ChatAutoModel.create(dataMessage)
            break;
    }
}
let usersCount = 0;
io.on('connection', (socket: any) => {

    usersCount++
    io.emit('online-users-count', usersCount);


    socket.on('select-chat', async (chatName: string, returnText: any) => {
        socket.join(chatName);
        const historicChat = await findDocument(chatName);
        if (historicChat) {
            socket.emit("historic-message", historicChat);
        }
    });

    socket.on('create-message-back', async (data: SaveMenssage) => {
        const { chatName } = data
        createMessageTech(chatName, data);
        socket.to(data.chatName).emit('create-message-front', data);
    });

    socket.on("disconnect", (reason: any) => {
        usersCount--
        io.emit('online-users-count', usersCount); // Emitindo para todos os sockets
        console.log(`The socket "${socket.id}" has been disconnected!
        Reason: ${reason}`);
    });
});
