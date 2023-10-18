
import { emitEditText, selectChat } from "../sockets/document-socket.js"



const params = new URLSearchParams(window.location.search)
var userName = params.get('user-name');
var chatName = params.get('chat-name')
const documentNameUppercase = chatName[0].toUpperCase() + chatName.substring(1);
selectChat(chatName)

const documentTitle = document.getElementById("chat-title")

documentTitle.textContent = `Chat ${documentNameUppercase}` || "Unnamed Document"



const userColors = {};
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
    console.log(userColors)
    return userColors[userName];
}

function createBalloon(message) {
    var messagesContainer = document.getElementById('messages');

    var balloonMessage = document.createElement('div');
    balloonMessage.classList.add('balao-mensagem');

    var senderInfo = document.createElement('div');
    senderInfo.classList.add('sender-info');
    senderInfo.textContent = message.userName;
    const userColor = getColorForUser(message.userName);
    senderInfo.style.color = userColor;
    senderInfo.style.fontSize = '16px'; // Aumenta o tamanho da fonte
    senderInfo.style.fontWeight = 'bold'; // Torna o texto em negrito


    var headerDivider = document.createElement('hr'); // Adiciona uma linha horizontal para separar o cabeçalho da mensagem

    var messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = message.messageContent;

    var timestampInfo = document.createElement('div');
    timestampInfo.classList.add('timestamp-info');
    timestampInfo.textContent = new Date().toLocaleTimeString();
    timestampInfo.style.fontSize = '12px'; // Adiciona fonte de 12px
    timestampInfo.style.textAlign = 'right';


    // Define estilos do balão
    balloonMessage.style.width = '80%'; // Define a largura do balão
    balloonMessage.style.display = 'flex';
    balloonMessage.style.flexDirection = 'column';

    if (message.userName === userName) {
        balloonMessage.classList.add('my-message'); // Adiciona uma classe para estilizar a mensagem do próprio usuário
        balloonMessage.style.alignSelf = 'flex-end';
        balloonMessage.style.marginLeft = '70%';
        senderInfo.style.display = 'none'; // Esconde o nome do usuário
        headerDivider.style.display = 'none'; // Esconde a linha de separação
    }

    balloonMessage.appendChild(senderInfo);
    balloonMessage.appendChild(headerDivider);
    balloonMessage.appendChild(messageContent);
    balloonMessage.appendChild(timestampInfo);

    messagesContainer.appendChild(balloonMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendMessage() {
    const messageContent = document.getElementById('message').value;
    const data = { messageContent, userName, chatName };
    emitEditText(data);
    createBalloon(data);

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