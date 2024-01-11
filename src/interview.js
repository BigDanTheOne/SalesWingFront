document.addEventListener('DOMContentLoaded', (event) => {
    var socket = io();

    socket.on('new_message', function (data) {
        var windowId = data.window;
        var message = data.text;
        var chatWindow = document.getElementById(windowId);
        chatWindow.innerHTML += `<div class="chat-message">${message}</div>`; // Обертываем каждое сообщение в div с классом chat-message
    });

});
