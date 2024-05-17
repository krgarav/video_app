const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

bodyParser.json()
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});
const emailToSocketIdMap = new Map();
const socketIdToEmail = new Map();
io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("chat message", (msg) => {
        console.log(msg);

    });
    socket.on("room:join", (data) => {
        console.log(data);
        const { emailId, roomId } = data;
        emailToSocketIdMap.set(emailId, socket.id);
        socketIdToEmail.set(socket.id, emailId);

        io.to(socket.id).emit("room:join", data);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});


server.listen(7000, () => {
    console.log("server is running on port 7000")
})