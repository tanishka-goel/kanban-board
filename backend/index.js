import express from 'express';
import {Server} from "socket.io"
import { createServer } from 'node:http';


const app = express();
const server = createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
})

io.on('connection',(socket)=>{
    console.log("User Connected with ID : ", socket.id);

    socket.on('sendMessage',(message)=>{
        io.emit('receiveMessage',message)
    })

    socket.on('disconnect',()=>{
        io.emit("User disconnected", socket.id)
    })
})

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});