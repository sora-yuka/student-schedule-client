import { useState, useEffect, useCallback, Fragment } from 'react'
import ChatWindow from "./Chat.window.jsx";

import './Chat.css'


export default function Chat() {
    const [ socket, setSocket ] = useState(null)
    const [ receivedMessages, setReceivedMessages ] = useState([])
    const [ chatPool, setChatPool ] = useState(null)
    const [ chat, setChat ] = useState(null)

    const connectWebsocket = useCallback(async id => {
        const token = localStorage.getItem("token")
        const socket = new WebSocket(
            `ws://127.0.0.1:8000/ws/chat/${id}/`,
            [ "Bearer", token ]
        )

        socket.onmessage = (e) => {
            try {
                const data = JSON.parse(e.data)
                fetchDirectMessages(chat)
                setReceivedMessages(prevMessages => {
                    const isDuplicate = prevMessages.some(message => message.id === data.id)

                    if (!isDuplicate) {
                        return [...prevMessages, data]
                    }
                    return prevMessages
                })
            }
            catch(e) {
            //
            }
        }

        setSocket(socket)
    }, [ setReceivedMessages, setSocket ])

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
            console.log("Error occurred while getting user pool for chat!")
        }
    }, [ ])

    const fetchDirectMessages = useCallback(async (chat) => {
        const response = await fetch(`http://localhost:8000/api/v1/chat/direct/${chat.owner.id}/`, {
            method: "GET",
            headers: { "Content-type": "application/json" },
            credentials: "include",
        })

        const data = await response.json()
        setReceivedMessages(data)
    }, [ ])

    useEffect(() => {
        fetchUser()
    }, [ ])

    return (
        <div className="chat-row">
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
                                    fetchDirectMessages(chat)
                                    connectWebsocket(chat.owner.id)
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
                    <ChatWindow
                        socket={ socket }
                        chat={ chat }
                        receivedMessages={ receivedMessages }
                        setReceivedMessages={ setReceivedMessages }
                    />
                </div> }
            </Fragment> }
        </div>
    )
}