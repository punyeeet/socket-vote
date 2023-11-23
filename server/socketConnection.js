const {Server} = require('socket.io')


socketConnection = (server)=>{
    const io = new Server(server,{
        cors:{
            origin: "https://voteinmeet.netlify.app"
        }
    })

    return io;
}

module.exports = {socketConnection};