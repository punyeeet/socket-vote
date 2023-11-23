const {Server} = require('socket.io')


socketConnection = (server)=>{
    const io = new Server(server,{
        cors:{
            origin: "http://localhost:5173"
        }
    })

    return io;
}

module.exports = {socketConnection};