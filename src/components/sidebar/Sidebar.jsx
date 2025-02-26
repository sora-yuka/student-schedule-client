import { useState } from 'react'
import Button from '../button/Button'

import './Sidebar.css'


export default function Sidebar({ activeContent, setActiveContent, setContentHeadline }) {
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
                                onClick={ () => { 
                                    setActiveContent("schedule")
                                    setContentHeadline("Расписание")
                                } }
                            >
                                <img 
                                    src="./icons/schedule-icon.svg" 
                                    alt="schedule icon" 
                                    className={ activeContent === "schedule" ?  activeButtonIcon : inActiveButtonIcon } 
                                /> 
                                Расписание
                            </Button>
                        </li>
                        <li className="sidebar-list__item">
                        <Button 
                            className={ activeContent === "news" ? activeButton : inActiveButton }
                            onClick={ () => {
                                setActiveContent("news")
                                setContentHeadline("Новости")
                            } }
                        >
                                <img 
                                    src="./icons/news.svg" 
                                    alt="news icon" 
                                    className={ activeContent === "news" ? activeButtonIcon : inActiveButtonIcon } 
                                />
                                Новости
                            </Button>
                        </li>
                        <li className="sidebar-list__item">
                            <Button 
                                className={ activeContent === "chat" ? activeButton : inActiveButton }
                                onClick={ () => {
                                    setActiveContent("chat")
                                    setContentHeadline("Чат")
                                } }
                            >
                                <img 
                                    src="./icons/chat-icon.svg" 
                                    alt="chat icon" 
                                    className={ activeContent === "chat" ?  activeButtonIcon : inActiveButtonIcon }  
                                /> 
                                Чат
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}