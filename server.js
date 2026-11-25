/*const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function connection(ws) {
//    console.log("Client connected");

    ws.on("message", function incoming(message) {
//        console.log("Received: %s", message);
        ws.send(message.toString());
    });

    ws.on("close", function () {
//        console.log("Client disconnected");
    });
});


/*
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    if (req.url === '/data.json') {
        res.end(fs.readFileSync('data.json'));
    } 
    
    else if (req.url === '/style.css') {
        res.setHeader('Content-Type', 'text/css');
        res.end(fs.readFileSync('style.css'));
    } else if (req.url === '/script.js') {
        res.end(fs.readFileSync('script.js'));
    } else {
        res.end(fs.readFileSync('index.html'));
    }
}).listen(process.env.PORT || 3000);
*/



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