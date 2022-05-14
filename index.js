const express = require('express');
const socketIO = require('socket.io');
const http=require('http')
const app = express();
const port = 3000;
const portSockets = 3010;


let server = http.createServer(app);
let io = socketIO(server);

// make connection with user from server side
io.on('connection', (socket)=>{
    console.log('New user connected');
    //emit message from server to user
    socket.emit('newMessage', "reeeee");

    // listen for message from user
    socket.on('createMessage', (newMessage)=>{
        console.log('newMessage', newMessage);
    });

    // when server disconnects from user
    socket.on('disconnect', ()=>{
        console.log('disconnected from user');
    });
});

server.listen(portSockets);


app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

