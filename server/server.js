const express = require('express');
const cors = require('cors');
const { socketConnection } = require('./socketConnection');
const http = require('http')


const app = express();

const server = http.createServer(app)
app.use(cors())
app.use(express.json());

const io = socketConnection(server)

// Array of votable Items
// const items = [{name:'Puneet',votes:9}];
const items = {

};

app.get('/', (req, res) => {
    // res.sendFile(join(__dirname,'index.html'))
    res.send(items)
})

io.on('connection', (socket) => {
    console.log('new user joined')
    var roomID = null;

    socket.on('join_room', (data) => {
        roomID = data.room_id;

        if (!items[roomID]) {
            socket.emit('err_roomid');
            roomID = null;
        } else {
            socket.join(roomID);
            console.log('joined room ', roomID);
            socket.emit('connected', roomID);

            console.log(items);
            socket.emit('set_votables', items[roomID]);
        }
    })




    socket.on('add', (data) => {
        const names = data.items;
        roomID = data.roomid;
        const topic = data.topic;

        items[roomID] = [];

        names.map((name) => {
            items[roomID].push({
                name,
                votes: 0,
                topic
            })
        })

        socket.join(roomID);
        console.log('joined room ', roomID);
        socket.emit('connected', roomID);

        console.log(items);
        socket.emit('set_votables', items[roomID]);

        // io.in(roomID).emit('update_votables', items[roomID]);
    })

    socket.on('update_votes', (index) => {
        items[roomID][index].votes++;

        io.in(roomID).emit('update_votables', items[roomID])
    })
});

server.listen(3000, () => {
    console.log("App listening on 3000")
})