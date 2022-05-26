const morgan = require("morgan");
const path = require("path");
const socketIO = require('socket.io');
const http = require('http')
require("dotenv/config")

const express = require("express");
const app = express();

let server = http.createServer(app)
let io = socketIO(server)

// Middlewares
app.use(morgan("dev"))
app.use(express.json());



io.on('connection', function(socket) {
    console.log('A user connected');

    function sendInfo(message){
        socket.broadcast.emit("order_taken",message);
        console.log("Mensaje emitido");
    }
 
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });

    socket.on("plantData",(message)=>{
        console.log(message);
        sendInfo(message);
    })


 });






// Routes


server.listen(process.env.PORT,()=>{
    console.log("all good");
});
