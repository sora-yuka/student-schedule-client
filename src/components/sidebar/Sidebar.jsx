import { useState, useEffect, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import Button from '../button/Button'

import './Sidebar.css'


export default function Sidebar({ activeContent, setActiveContent }) {
    const [ isDarkMode, setDarkMode ] = useState(false)
    const sidebarButton = "btn__sidebar"
    const sidebarButtonActive = "btn__sidebar--active"

    useEffect(() => {
        if (isDarkMode === true) {
            document.body.classList.add('dark-mode')
        } else {
            document.body.classList.remove('dark-mode')
        }
    })

    return (
        <div className="sidebar">
            <div className="sidebar-container">
                <div className="sidebar-row">
                    <img src="./icons/hashnode.svg" alt="" className="sidebar__icon" />
                    <ul className="sidebar__list">
                        <li className="sidebar__list-item">
                            <NavLink
                                to="/"
                                className={ ({isActive}) => (isActive ?  sidebarButtonActive : sidebarButton) }
                            >
                                <img 
                                    src="/icons/schedule-icon.svg"
                                    alt="schedule icon" 
                                    className="btn__sidebar-icon"
                                />
                                Расписание
                            </NavLink>
                        </li>
                        <li className="sidebar__list-item">
                            <NavLink
                                to="/news"
                                className={ ({isActive}) => (isActive ?  sidebarButtonActive : sidebarButton) }
                            >
                                <img 
                                    src="/icons/news.svg"
                                    alt="news icon" 
                                    className="btn__sidebar-icon"
                                />
                                Новости
                            </NavLink>
                        </li>
                    </ul>

                    {/* <ul className="sidebar-list">
                        <li className="sidebar-list__item"> 
                            <Button 
                                className={ activeContent === "schedule" ? activeButton : inActiveButton }
                                onClick={ () => { 
                                    setActiveContent("schedule")
                                    setContentHeadline("Расписание")
                                } }
                            >
                                <img 
                                    src="/icons/schedule-icon.svg"
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
                                } }
                            >
                                <img 
                                    src="/icons/news.svg" 
                                    alt="news icon" 
                                    className={ activeContent === "news" ? activeButtonIcon : inActiveButtonIcon } 
                                />
                                Новости
                            </Button>
                        </li>
                        <li className="sidebar-list__item">
                            <Button
                                className={ activeContent === "course" ? activeButton : inActiveButton }
                                onClick={ () => {
                                    setActiveContent("course")
                                } }
                            >
                                <img 
                                    src="/icons/ebook.png" 
                                    alt="" 
                                    className={ activeContent === "course" ? activeButtonIcon : inActiveButtonIcon }
                                />
                                Курсы
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
                                    src="/icons/chat-icon.svg" 
                                    alt="chat icon" 
                                    className={ activeContent === "chat" ?  activeButtonIcon : inActiveButtonIcon }  
                                /> 
                                Чат
                            </Button>
                        </li>
                    </ul> */}

                </div>
                <div className="sidebar__toggle-theme">
                    <Button
                        className={ !isDarkMode ? "toggle-theme__mode--active" : "toggle-theme__mode" }
                        onClick={ () => { setDarkMode(false) } }
                    >
                        light button
                    </Button>
                    <Button
                        className={ isDarkMode ? "toggle-theme__mode--active" : "toggle-theme__mode" }
                        onClick={ () => { setDarkMode(true) } }
                    >
                        dark button
                    </Button>
                </div>
            </div>
        </div>
    )
}