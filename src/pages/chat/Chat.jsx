import { useState, useEffect, useCallback, Fragment } from 'react'

import './Chat.css'


export default function Chat() {
    const [ socket, setSocket ] = useState(null)
    const [ chat, setChat ] = useState(null)
    const [ chatPool, setChatPool ] = useState(null)
    const [ receivedMessages, setReceivedMessages ] = useState([])

    const connectWebsocket = useCallback(async id => {
        const token = localStorage.getItem("token")
        const socket = new WebSocket(
            `ws://127.0.0.1:8000/ws/chat/${id}/`,
            [ "Bearer", token ]
        )

        socket.onopen = () => {
            console.log("Websocket opened")
        }

        socket.onclose = () => {
            console.error("Chat socket closed unexpectedly")
        }

        socket.onmessage = (e) => {
            const data = JSON.parse(e.data)
            setReceivedMessages(prevMessages => [...prevMessages, data])
        }

        setSocket(socket)
    }, [ ])

    const fetchUser = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/profile/", {
                method: "GET",
                headers: { "Content-type": "application/json" },
                credentials: "include",
            })

            if (!response.ok) {
                throw new Error("Bad request while getting chat pool")
            }

            if (response.status === 200) {
                const data = await response.json()
                setChatPool(data)
            }
        } catch (error) {
            console.log("Error occured while getting user pool for chat!")
        }
    }, [ ])

    const sendMessage = useCallback(message => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(
                { "message": message },
            ))
        } else {
            console.error("Websocket is not opened")
        }
    }, [ socket ]);

    useEffect(() => {
        fetchUser()
    }, [ ])

    return <div className="chat-row">
        { chatPool && <Fragment>
                <div className="chat-sidepanel">
                    <div className="search-box">
                        <input type="text" placeholder="Поиск" className="search-box__input" />
                    </div>
                    <ul className="chat-pool">
                        { chatPool.map(chat => <li
                                key={ chat.id }
                                className="chat-pool__item"
                                onClick={
                                    () => {
                                        setChat(chat)
                                        connectWebsocket(chat.owner.id)
                                        console.log(chat)
                                    }
                                }
                            >
                                <img src={ chat.pfp } alt="user photo" className="chat-pool__item-photo" />
                                <div className="chat-pool__item-info">
                                    <h3 className="chat-pool__item-username">{ chat.owner.username }</h3>
                                    <h3 className="chat-pool__item-group">{ chat.group.group_name }</h3>
                                </div>
                            </li>) }
                    </ul>
                </div>
                { chat && <div className="chat-window">
                        <div className="chat-window__header">
                            <img src={ chat.pfp } alt="user photo" className="chat-window__user-photo" />
                            <h4 className="chat-window__username">{ chat.owner.username }</h4>
                        </div>
                        <ul className="chat-window__messages">
                            { receivedMessages.map((receivedMessage, id) => (
                                <li key={ id }>
                                    { console.log(receivedMessage) }
                                    { receivedMessage.content }
                                </li>
                            )) }
                        </ul>
                        <input
                            type="text"
                            placeholder="Сообщение"
                            onKeyUp={ event => {
                                if (event.key === "Enter") {
                                    sendMessage(event.target.value)
                                    console.log(event.target.value)
                                    event.target.value = ''
                                }
                            } }
                            className="chat-window__input"
                        />
                    </div> }
            </Fragment> }
    </div>
}