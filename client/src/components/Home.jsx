import React, { useState, useContext, useEffect } from 'react'
import Popup from './Popup'
import Dashboard from './Dashboard'
import { useSelector, useDispatch } from 'react-redux'
import { setID } from '../redux/slices/roomid'
import { SocketContext } from '../context/socket'
import './Home.css'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Home = () => {

    const [enterRoom, setEnterRoom] = useState(false);

    const [createRoom, setCreateRoom] = useState(false);

    const [roomID, setRoomID] = useState('');

    const [votables, setVotables] = useState([]);

    const [item, setItem] = useState('');

    const [topic, setTopic] = useState('');

    const socket = useContext(SocketContext)

    const id = useSelector((state) => state.roomid);

    const dispatch = useDispatch();

    const [toastID, setToastID] = useState()

    const onJoin = (e) => {
        e.preventDefault()


        socket.emit('join_room', {
            room_id: roomID
        })

        setRoomID('');
        setEnterRoom(false);
    }

    const onInsert = (e) => {
        e.preventDefault();
        const name = document.getElementById('itemName')
        if (name.value === '') {
            return;
        }

        setVotables((prev) => [...prev, item]);

        name.value = ''
        // console.log(votables);
    }

    // Remove an item(votables) from the list
    // const removeItem =(index)=>{


    //     setVotables((prev)=>{
    //         [...prev].splice(index,1);

    //         return prev;
    //     });
    // }

    const roomCreation = (e) => {
        e.preventDefault()
        // generate a random 4-digit number
        // join socket room 
        // send the votables to backend
        if (votables.length === 0) {
            alert("Please insert atleast one Votable Option !")
            return;
        }

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        function generateString(length) {
            let result = '';
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }

            return result;
        }

        const random = generateString(4);

        socket.emit('add', {
            items: votables,
            roomid: random,
            topic
        })

        setVotables([]);
        setTopic('');
        setCreateRoom(false);

    }

    useEffect(() => {

        socket.on('connection_true', () => {
            toast("Connected to Backend")
        })

        socket.on('err_roomid', () => {
            alert('Invalid Room ID');
            setRoomID('');
        })

        socket.on('connected', (data) => {
            dispatch(setID(data));
        })

    }, [socket])

    return (
        <>
            {
                !id ?
                    (<div className='home-container'>
                        <div className='home-title'>
                            <h1>Vote-in-Meet</h1>
                            <div className='home-info'>
                                <p>
                                    Create your own private rooms and share the room code with your peers. Vote on any topic in Real-time and see the live results.
                                </p>
                                <p>
                                    The website uses Socket connection to enable fast and real-time update on the created poll.
                                </p>
                            </div>
                        </div>
                        <div className='home-btns'>
                            <button onClick={() => setCreateRoom(true)}>Create Room</button>

                            <button onClick={() => setEnterRoom(true)}>Join Room</button>
                        </div>

                        <Popup trigger={enterRoom} setTrigger={setEnterRoom} closeHandler={() => setRoomID('')}>
                            <form>
                                <input type='text' placeholder='RoomID' id='roomid' value={roomID} onChange={(e) => setRoomID(e.target.value)}></input>

                                <button onClick={onJoin} type='submit' className='join-btn'>JOIN</button>
                            </form>
                        </Popup>

                        <Popup trigger={createRoom} setTrigger={setCreateRoom} closeHandler={() => { setVotables([]); setTopic('') }} >
                            <form>
                                <input type='text' placeholder='Topic' id='topicName' onChange={(e) => setTopic(e.target.value)}></input>

                                <input type='text' placeholder='Item' id='itemName' onChange={(e) => setItem(e.target.value)}></input>

                                <button onClick={onInsert} >Insert</button>

                                {
                                    votables.map((el, index) => {
                                        return (

                                            <div className='items-holder' key={index}>
                                                {/* {console.log(index)} */}
                                                <p>
                                                    {el}
                                                    {/* <button onClick={(e)=>{e.preventDefault;removeItem(index)}}>
                                            del
                                            </button> */}
                                                </p>
                                            </div>

                                        )
                                    })
                                }

                                <button onClick={roomCreation} type='submit' className='join-btn'>JOIN</button>


                            </form>
                        </Popup>

                    </div>) : (
                        <Dashboard />
                    )
            }

        </>
    )
}

export default Home