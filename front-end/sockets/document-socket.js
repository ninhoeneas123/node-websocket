
import { onlineUsersCount, createBallonHistoric, createBalloon, notificationOnOut } from '../scripts/document.js'

const socket = io()

function selectChat(chatName, userName) {
    socket.emit("select-chat", { chatName, userName }, (text) => {
        createBallonHistoric(text)
    })
}
function emitEditText(data) {
    socket.emit('create-message-back', data)
}

socket.on('historic-message', (message) => {
    createBallonHistoric(message)

})

socket.on('create-message-front', (data) => {
    createBalloon(data);
});

socket.on('online-users-count', (data) => {
    const { numClients, status, userName } = data
    onlineUsersCount(numClients)
    console.log("user1",userName)
    notificationOnOut(status, userName)
})

export { emitEditText, selectChat } 