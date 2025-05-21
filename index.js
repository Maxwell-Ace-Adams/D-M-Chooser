const express = require('express');
const app = express();
const server = require('http').createServer(app);



app.use(express.static(__dirname));

const io = require('socket.io')(server);
io.on('connection', (socket) => {
    console.log('New client connected');
    let userName;
    
socket.on('joined', (who) => {
    userName = who;
    console.log(`${userName} joined`);
    io.emit('message', `System: ${who} joined the chat`);
});

socket.on('message', (msg) => {
    console.log(`Received message from ${userName}: ${msg}`);
    io.emit('message', `${userName}: ${msg}`);
 });
});

// server.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// });

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




// Improvements/Possible Updates,  none of these have to be completed








