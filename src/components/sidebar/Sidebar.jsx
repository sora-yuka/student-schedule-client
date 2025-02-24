import { useState } from 'react'
import Button from '../button/Button'

import './Sidebar.css'


export default function Sidebar({ activeContent, setActiveContent }) {
    const inActiveButton = "btn__sidebar"
    const activeButton = "btn__sidebar--active"
    const inActiveButtonIcon = "btn__sidebar-icon"
    const activeButtonIcon = "btn__sidebar-icon--active"
    
    return (
        <div className="sidebar">
            <div className="sidebar-container">
                <div className="sidebar-row">
                    <img src="./icons/hashnode.svg" alt="" className="sidebar__icon" />
                    <ul className="sidebar-list">
                        <li className="sidebar-list__item"> 
                            <Button 
                                className={ activeContent === "schedule" ? activeButton : inActiveButton }
                                onClick={ () => setActiveContent("schedule") }
                            >
                                <img 
                                    src="./icons/schedule-icon.svg" 
                                    alt="schedule icon" 
                                    className={ activeContent === "schedule" ?  activeButtonIcon : inActiveButtonIcon } 
                                /> 
                                Schedule
                            </Button>
                        </li>
                        <li className="sidebar-list__item">
                        <Button 
                            className={ activeContent === "news" ? activeButton : inActiveButton }
                            onClick={ () => setActiveContent("news") }
                        >
                                <img 
                                    src="./icons/news.svg" 
                                    alt="news icon" 
                                    className={ activeContent === "news" ? activeButtonIcon : inActiveButtonIcon } 
                                />
                                News
                            </Button>
                        </li>
                        <li className="sidebar-list__item">
                            <Button 
                                className={ activeContent === "chat" ? activeButton : inActiveButton }
                                onClick={ () => setActiveContent("chat") }
                            >
                                <img 
                                    src="./icons/chat-icon.svg" 
                                    alt="chat icon" 
                                    className={ activeContent === "chat" ?  activeButtonIcon : inActiveButtonIcon }  
                                /> 
                                Chat
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}