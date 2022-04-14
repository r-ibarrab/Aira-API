const morgan = require("morgan");
const path = require("path");
const socketIO = require('socket.io');
const http = require('http')

const express = require("express");
const app = express();

let server = http.createServer(app)
let io = socketIO(server)

// Middlewares
app.use(morgan("dev"))
app.use(express.json());
app.use('/statics', express.static(path.join(__dirname, 'statics')))


// Routes
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"statics/index.html"))
});


io.on('connection', function(socket) {
    console.log('A user connected');

    function sendInfo(message){
        socket.broadcast.emit("order_taken",message);
        console.log("Emitiendo mensaje");
    }
 
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });

    socket.on("order",(message)=>{
        console.log(message);
        sendInfo(message);
    })


 });






// Routes


server.listen(3000,()=>{
    console.log("all good");
});
