import { useState, useEffect, useCallback, useRef, Fragment } from 'react'

import './Chat.window.css'


export default function ChatWindow({ socket, chat, receivedMessages}) {
    const chatMessagesRef = useRef(null)

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

            {/*<ul className="chat-window__messages" ref={ chatMessagesRef }>*/}
            {/*    { receivedMessages.map((message, id) => (*/}
            {/*        <li key={ id }> { message } </li>*/}
            {/*    )) }*/}
            {/*</ul>*/}

            {/*<ul className="chat-window__messages" ref={ chatMessagesRef }>*/}
            {/*    { receivedMessages.map((receivedMessage, id) => {*/}
            {/*        receivedMessage.receiver == chat.owner.email && (*/}
            {/*            <li*/}
            {/*                key={ id }*/}
            {/*                className={*/}
            {/*                    chat.owner.email == receivedMessage.sender ? "chat-window__message" : "chat-window__own-message"*/}
            {/*                }*/}
            {/*            >*/}
            {/*                <div className="message">*/}
            {/*                    <p className="content">{ receivedMessage.content }</p>*/}
            {/*                    <span className="time">{ receivedMessage.time }</span>*/}
            {/*                    { console.log(receivedMessage) }*/}
            {/*                </div>*/}
            {/*            </li>*/}
            {/*        )*/}
            {/*    } }*/}
            {/*</ul>*/}

            {/*<ul className="chat-window__messages" ref={chatMessagesRef}>*/}
            {/*    {receivedMessages*/}
            {/*        .filter((receivedMessage) => receivedMessage.receiver === chat.owner.email)*/}
            {/*        .map((receivedMessage) => (*/}
            {/*            <li*/}
            {/*                key={ receivedMessage.id || receivedMessage.time }*/}
            {/*                className={*/}
            {/*                    chat.owner.email === receivedMessage.sender*/}
            {/*                        ? "chat-window__message"*/}
            {/*                        : "chat-window__own-message"*/}
            {/*                }*/}
            {/*            >*/}
            {/*                <div className="message">*/}
            {/*                    <p className="content">{receivedMessage.content}</p>*/}
            {/*                    <span className="time">{receivedMessage.time}</span>*/}
            {/*                </div>*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*</ul>*/}

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