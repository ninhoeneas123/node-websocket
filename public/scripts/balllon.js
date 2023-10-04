function createBalloon(message) {
    var messagesContainer = document.getElementById('messages');

    var balloonMessage = document.createElement('div');
    balloonMessage.classList.add('balao-mensagem');

    var senderInfo = document.createElement('div');
    senderInfo.classList.add('sender-info');
    senderInfo.textContent = message.userName;
    senderInfo.style.fontSize = '12px'; // Adiciona fonte de 12px

    var messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = message.messageContent;

    var timestampInfo = document.createElement('div');
    timestampInfo.classList.add('timestamp-info');
    timestampInfo.textContent = new Date().toLocaleTimeString();
    timestampInfo.style.fontSize = '12px'; // Adiciona fonte de 12px

    balloonMessage.style.width
    balloonMessage.style.display = 'flex';
    balloonMessage.style.flexDirection = 'column'; // Alterado para coluna (column)

    senderInfo.style.textAlign = 'left'; // Alinha à esquerda
    messageContent.style.textAlign = 'left'; // Alinha à esquerda
    timestampInfo.style.textAlign = 'right'; // Alinha à direita

    if (message.userName === userName) {
        balloonMessage.classList.add('my-message'); // Adiciona uma classe para estilizar a mensagem do próprio usuário
        balloonMessage.style.alignSelf = 'flex-end'; // Alinha à direita
        balloonMessage.style.marginLeft = '70%'; // Adiciona um espaço à esquerda para separar da margem
    }

    balloonMessage.appendChild(senderInfo);
    balloonMessage.appendChild(messageContent);
    balloonMessage.appendChild(timestampInfo);

    messagesContainer.appendChild(balloonMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

}
export {createBalloon}