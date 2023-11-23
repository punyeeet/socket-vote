import { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import './App.css'
import { useSelector,useDispatch } from 'react-redux'
import { setID } from './redux/slices/roomid'
import { SocketContext } from './context/socket'
import Home from './components/Home'


function App() {
  
  // const [item, setItem] = useState('');
  // const [votables, setVotables] = useState([]);
  // const [roomID, setRoomID] = useState(null);
  // const [join, setJoin] = useState(false);
  
  // const id = useSelector((state)=>state.roomid);

  // const dispatch = useDispatch();
  
  // const socket = useContext(SocketContext)

  // useEffect(() => {
  //   socket.on('set_votables', (data) => {
  //     // console.log(data);
  //     setVotables(data)
  //   })

  //   socket.on('update_votables', (data) => {
  //     setVotables(data);
  //     console.log('data from backend emit', data);
  //   })


  // }, [socket])

  // const onInsert = async (e) => {
  //   e.preventDefault()
  //   const ob = {
  //     item
  //   }

  //   socket.emit('add', ob)

  //   console.log('item added is', item);

  //   const name = document.getElementById('itemName')
  //   name.value = ''
  // }

  // const updateVote = (index) => {
  //   socket.emit('update_votes', index)
  // }

  // const onJoin = (e) => {
  //   e.preventDefault()

  //   socket.emit('join_room', {
  //     room_id: roomID
  //   })
  //   setJoin(true);
  //   dispatch(setID(roomID));
    
  // }

  // const onLeave = (e)=>{
  //   setJoin(false)
  //   dispatch(setID(null));
  // }

  return (
    <>
      <Home/>
    </>
  )
}

export default App
