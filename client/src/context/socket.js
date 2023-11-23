import io from 'socket.io-client'
import React from 'react';


export const socket = io("https://vote-app-backend.onrender.com")


export const SocketContext = React.createContext();