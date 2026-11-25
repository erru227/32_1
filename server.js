const express = require('express');
const http = require('http');
const { WebSocketServer } = require("ws");
const app = express();

const web_files = express.static("public");
app.use(web_files);

const server = http.createServer(app);
const websocket = new WebSocketServer({ server });

function broadcastStatus() {
    let players = 0;
    websocket.clients.forEach((c) => { if (c.readyState === 1) {players++;} });
    const msg = JSON.stringify({ type: "status", players: players });
    websocket.clients.forEach((c) => {
        if (c.readyState === 1)
            {c.send(msg);}
    });
}

websocket.on('connection', (socket) => {
    broadcastStatus();

    socket.on('message', (data) => {
        websocket.clients.forEach((client) => {
            if (client !== socket && client.readyState === 1) {
                client.send(data.toString());
            }
        })
    })

    socket.on('close', broadcastStatus);
});

server.listen(process.env.PORT || 3000, function() {
    console.log("Listening on port 3000...");
});
