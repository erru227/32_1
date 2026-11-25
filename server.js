const express = require('express');
const http = require('http');
const { WebSocketServer } = require("ws");
const app = express();

const web_files = express.static("public");
app.use(web_files);

const server = http.createServer(app);
const websocket = new WebSocketServer({ server });

websocket.on('connection', (socket) => {
    socket.on('message', (data) => {
        websocket.clients.forEach((client) => {
            if (client !== socket && client.readyState === 1) {
                client.send(data.toString());
            }
        })
    })
});

server.listen(process.env.PORT || 3000, function() {
    console.log("Listening on port 3000...");
});
