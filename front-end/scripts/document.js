
import { emitEditText, selectChat } from "../sockets/document-socket.js"

const params = new URLSearchParams(window.location.search)
const  userName = params.get('user-name');
const chatName = params.get('chat-name')
const documentNameUppercase = chatName[0].toUpperCase() + chatName.substring(1);
const documentTitle = document.getElementById("chat-title")
const userColors = {};


documentTitle.textContent = `Chat ${documentNameUppercase}` || "Unnamed Document"
selectChat(chatName)

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getColorForUser(userName) {
    if (!userColors[userName]) {
        userColors[userName] = getRandomColor();
    }
    return userColors[userName];
}

function createBalloon(message) {
    const messagesContainer = document.getElementById('messages');

    const balloonMessage = document.createElement('div');
    balloonMessage.classList.add('balao-mensagem');

    const senderInfo = document.createElement('div');
    senderInfo.classList.add('sender-info');
    senderInfo.textContent = message.userName;

    const userColor = getColorForUser(message.userName);
    senderInfo.style.color = userColor;
    senderInfo.style.fontSize = '16px'; 
    senderInfo.style.fontWeight = 'bold'; 

    const headerDivider = document.createElement('hr'); 

    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = message.messageContent;

    const timestampInfo = document.createElement('div');
    timestampInfo.classList.add('timestamp-info');
    timestampInfo.textContent = new Date().toLocaleTimeString();
    timestampInfo.style.fontSize = '12px'; 
    timestampInfo.style.textAlign = 'right';

    balloonMessage.style.width = '80%';
    balloonMessage.style.display = 'flex';
    balloonMessage.style.flexDirection = 'column';

    if (message.userName === userName) {
        balloonMessage.classList.add('my-message'); 
        balloonMessage.style.alignSelf = 'flex-end';
        balloonMessage.style.marginLeft = '70%';
        senderInfo.style.display = 'none'; 
        headerDivider.style.display = 'none'; 
    }

    balloonMessage.appendChild(senderInfo);
    balloonMessage.appendChild(headerDivider);
    balloonMessage.appendChild(messageContent);
    balloonMessage.appendChild(timestampInfo);

    messagesContainer.appendChild(balloonMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendMessage() {
    const messageContent = document.getElementById('message').value.trim()

    if ((event.keyCode === 13 || event.type === "click") && messageContent !== '') {
        event.preventDefault();

        const data = { messageContent, userName, chatName };
        emitEditText(data);
        createBalloon(data);

        document.getElementById('message').value = '';
    }
}

document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message').addEventListener('keydown', sendMessage);

function createBallonHistoric(messages) {
    const sortedMessages = messages.sort((a, b) => a.timestamp - b.timestamp);
    sortedMessages.forEach(createBalloon);
}

function onlineUsersCount(count) {
    document.getElementById('user-count').textContent = count;
}

export { sendMessage, createBallonHistoric, createBalloon, onlineUsersCount }