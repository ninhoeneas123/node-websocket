
import { sendMessage, createBallonHistoric, createBalloon } from '../scripts/document.js'

const socket = io()

function selectChat(name) {
    socket.emit("select-chat", name, (text) => {
        console.log(name)
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
    console.log(data)
    createBalloon(data);
});

export { emitEditText, selectChat } 