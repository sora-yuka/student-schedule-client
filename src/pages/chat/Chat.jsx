import { useState, useEffect, useCallback, Fragment } from 'react'

import './Chat.css'


export default function Chat() {
    const [ chat, setChat ] = useState(null)
    const [ chatPool, setChatPool ] = useState(null)

    const connectWebsocket = useCallback(async () => {
        const token = localStorage.getItem("token")
        const socket = new WebSocket(
            "ws://127.0.0.1:8000/ws/chat/2/",
            [ "Bearer", token ]
        )

        socket.onopen = () => {
            console.log("Socket connected")
        }
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

    useEffect(() => {
        connectWebsocket()
        fetchUser()
    }, [ ])

    return (
        <div className="chat-row">
            { chatPool && (
                <Fragment>
                    <div className="chat-sidepanel">
                        <div className="search-box">
                            <input type="text" placeholder="Поиск" className="search-box__input" />
                        </div>
                        <ul className="chat-pool">
                            { chatPool.map((chat) => (
                                <li className="chat-pool__item" key={ chat.id }>
                                    <img src={ chat.pfp } alt="user photo" className="chat-pool__item-photo" />
                                    <div className="chat-pool__item-info">
                                        <h3 className="chat-pool__item-username">{ chat.owner.username }</h3>
                                        <h3 className="chat-pool__item-group">{ chat.group.group_name }</h3>
                                    </div>
                                </li>
                            )) }
                        </ul>
                    </div>
                    <div className="chat-window">
                        <p>
                            Lorem.
                        </p>
                    </div>
                </Fragment>
            ) }
        </div>
    )
}