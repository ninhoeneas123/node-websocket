import { io } from "../server"
import { SaveMenssage } from "../interfaces/save-message.interface"
import ChatUseCases from "../use-cases/chat-cases"

let roomsData: any = {};

io.on('connection', (socket: any) => {

    function countClients(chatName: string): number {
        if (!roomsData[chatName]) {
            roomsData[chatName] = new Set();
        }
        roomsData[chatName].add(socket.id);

        const roomClients = io.sockets.adapter.rooms.get(chatName);
        const numClients = roomClients ? roomClients.size : 0;
        return numClients
    }

    socket.on('select-chat', async (chatName: string) => {
        socket.join(chatName);
        const numClients = countClients(chatName)

        io.to(chatName).emit('online-users-count', numClients);

        const historicChat = await ChatUseCases.findHistory(chatName);

        if (historicChat) {
            socket.emit("historic-message", historicChat);
        }
    });

    socket.on('create-message-back', async (data: SaveMenssage) => {
        const { chatName } = data

        ChatUseCases.createHistory(chatName, data);

        socket.to(data.chatName).emit('create-message-front', data);
    });

    socket.on("disconnect", (reason: string) => {
        for (const room in roomsData) {

            if (roomsData[room].has(socket.id)) {
                roomsData[room].delete(socket.id);
                const numClients = roomsData[room].size;
                io.to(room).emit('online-users-count', numClients);
            }

        }
        console.log(`The socket "${socket.id}" has been disconnected!
            Reason: ${reason}`);
    });
});
