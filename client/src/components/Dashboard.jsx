import { React, useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setID } from '../redux/slices/roomid'
import { SocketContext } from '../context/socket'
import './Dashboard.css'

const Dashboard = () => {

    const id = useSelector((state) => state.roomid);

    const socket = useContext(SocketContext)

    const dispatch = useDispatch();

    const [votables, setVotables] = useState([]);

    const [total, setTotal] = useState(0);

    useEffect(() => {
        socket.on('set_votables', (data) => {
            // console.log(data);
            setVotables(data);
            setTotal(data.reduce((acc, curr) => {
                return acc + curr.votes;
            }, 0))
        })

        socket.on('update_votables', (data) => {
            setVotables(data);
            setTotal(data.reduce((acc, curr) => {
                return acc + curr.votes;
            }, 0))

            // console.log('data from backend emit', data);
        })
    }, [socket]);
    // console.log(votables);

    const updateVote = (index) => {
        socket.emit('update_votes', index)
    }

    const onLeave = () => {
        setVotables([]);

        dispatch(setID(null))
    }

    return (
        <>
            <div className='dashboard-container'>
                <nav className='dashboard-nav'>
                    <div className='title-container'>
                        <h5 className='nav-title'>Vote-in-Meet</h5>
                    </div>
                    <ul>
                        {/* <li>Dashboard</li> */}
                        <li>
                            Room ID : {id}
                        </li>

                        <li>
                            <button onClick={onLeave}>Leave Room</button>

                        </li>
                    </ul>
                </nav>
                <div className='votables-container'>
                    {/* {votables.map((item, index) =>
                    <div key={index}>
                            <p>{item.name} {item.votes} {total}
                                <button onClick={() => updateVote(index)}>Vote</button>
                            </p>
                        </div>
                    )} */}
                    { votables.length!==0 ? (
                    <>
                    <h1>{votables[0].topic}</h1>
                    {votables.map((item, index)=>
                    <div className="vote-chart" key={index}>
                        <div className="bar" style={{ width: `${item.votes*100 / total}%` }}>
                            {item.votes > 0 && <div className="label">{item.votes}</div>}
                            {/* {console.log(total)} */}
                        </div>
                            <span className='item-name'>{item.name}</span>
                            <button onClick={() => updateVote(index)}>Vote</button>
                    </div>
                        )}

                    </>
                        ) : <h3>Loading ... </h3>
                        
                    }

                </div>

            </div>


        </>

    )
}

export default Dashboard