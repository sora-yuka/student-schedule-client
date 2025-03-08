import { useState, useEffect } from 'react'

import './Chat.css'


export default function Chat() {
    // const [ socket, setSocket ] = useState(null)
    
    useEffect(() => {
        const token = localStorage.getItem("token")
        const socket = new WebSocket(
            "ws://127.0.0.1:8000/ws/chat/2/",
            [ "Bearer", token ]
        )

        socket.onopen = () => {
            console.log("Socket connected")
        }
    }, [ ])
}