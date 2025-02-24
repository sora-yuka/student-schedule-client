import { useState } from 'react'
import Button from '../button/Button'

import './Sidebar.css'


export default function Sidebar() {
    const [ section, setSection ] = useState("schedule")

    return (
        <div className="sidebar">
            <div className="container">
                <div className="sidebar-row">
                    <ul className="sidebar-list">
                        <li className="sidebar-list__item"> 
                            <Button className="btn-sidebar--active">
                                <img src="./icons/schedule-icon.svg" alt="icons" className="btn-sidebar__icons--active" /> 
                                Schedule
                            </Button>
                        </li>
                        <li className="sidebar-list__item">
                            <Button className="btn-sidebar">
                                <img src="./icons/chat-icon.svg" alt="icons" className="btn-sidebar__icons" /> 
                                Chat
                            </Button>
                        </li>
                        <li className="sidebar-list__item">
                        <Button className="btn-sidebar">
                                <img src="./icons/chat-icon.svg" alt="" className="btn-sidebar__icons" />
                                placeholder__1
                            </Button>
                        </li>
                        <li className="sidebar-list__item">
                            <Button className="btn-sidebar">
                                <img src="./icons/chat-icon.svg" alt="" className="btn-sidebar__icons" />
                                placeholder__2
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}