import { useState, useEffect, useCallback, useRef, Fragment } from 'react'

import './Chat.window.css'


export default function ChatWindow({ socket, chat, receivedMessages, setReceivedMessages }) {
    const chatMessagesRef = useRef(null)

    const sendMessage = useCallback(async message => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(
                { "message": message },
            ))
        } else {
            console.error("Websocket is not opened")
        }
        const response = await fetch(`http://localhost:8000/api/v1/chat/direct/${chat.owner.id}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access_token"),
            },
        })
        const data = await response.json()
        setReceivedMessages(data)
    }, [ socket ])

    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    })

    return (
        <Fragment>
            <div className="chat-window__header">
                <img src={ chat.pfp } alt="user photo" className="chat-window__user-photo" />
                <h4 className="chat-window__username">{ chat.owner.username }</h4>
            </div>

            { <ul className="chat-window__messages" ref={ chatMessagesRef }>
                { receivedMessages
                    .map((receivedMessage) => (
                        <li
                            key={ receivedMessage.id || receivedMessage.time }
                            className={ receivedMessage.sender === receivedMessage.current_user ? "chat-window__own-message" : "chat-window__message" }
                        >
                            <div className="message">
                                <p className="content">{receivedMessage.content}</p>
                                <span className="time">{receivedMessage.time}</span>
                            </div>
                        </li>
                    )) }
            </ul> }

            <input
                type="text"
                placeholder="Сообщение"
                onKeyUp={ event => {
                    if (event.target.value && event.key === "Enter") {
                        sendMessage(event.target.value)
                        event.target.value = ''
                    }
                } }
                className="chat-window__input"
            />
        </Fragment>
    )
}