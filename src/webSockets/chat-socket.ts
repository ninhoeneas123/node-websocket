import { io } from "../server"
import { SaveMenssage } from "../chat/interfaces/save-message.interface"
import ChatUseCases from "../chat/use-cases/chat-cases"
import User from "../user/user";
import CountClients from '../user/count-users'


io.on('connection', (socket: any) => {

    socket.on('select-chat', async (data: any) => {
        const { chatName, userName } = data
        socket.join(chatName);
        const numClients = CountClients.toAdd(chatName, socket.id)
        User.create(socket.id, userName)
        io.to(chatName).emit('online-users-count', {
            numClients,
            status: "online",
            userName: userName
        })

        const historicChat = await ChatUseCases.findHistory(data.chatName);

        if (historicChat) {
            socket.emit("historic-message", historicChat);
        }
    });

    socket.on('create-message-back', (data: SaveMenssage) => {
        const { chatName } = data

        ChatUseCases.createHistory(chatName, data);

        socket.to(data.chatName).emit('create-message-front', data);
    });

    socket.on("disconnect", (reason: string) => {
        const user = User.filter(socket.id)
        if (user) {
            CountClients.toRemove(user.userName, socket.id)
            User.delete(socket.id)

            console.log(`The socket "${socket.id}" has been disconnected!
            Reason: ${reason}`);
        }
    });
});
