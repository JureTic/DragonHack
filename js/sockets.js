
var socket = new WebSocket("ws://localhost:3010");

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Socket opened');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});

var fileInput = $("#fileInput");
var sendButton = $("#sendButton");
sendButton.click(function (event) {
    console.log("Send button clicked");
    var fr = new FileReader();
    var file = fileInput.prop('files')[0];
    fr.readAsDataURL(file);
    fr.onload = function () {
        var data = fr.result;
        console.log("Sending file through socket");
        socket.send(data);
    } 
})


