$(document).ready = function () {
    var socket = WebSocket("ws://localhost:3010");
    
    // Connection opened
    socket.addEventListener('open', function (event) {
        socket.send('Socket opened');
    });
    
    // Listen for messages
    socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
    });
    
    fileInput = $("#fileInput");
    sendButton = $("#sendButton");
    sendButton.onclick = function (event) {
        
    }
}

