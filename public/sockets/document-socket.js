
import { onlineUsersCount, createBallonHistoric, createBalloon } from '../scripts/document.js'

const socket = io()

function selectChat(name) {
    socket.emit("select-chat", name, (text) => {
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
    onlineUsersCount(data)
})

export { emitEditText, selectChat } 