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
                                className={ ({isActive}) => (isActive ? sidebarButtonActive : sidebarButton) }
                            >
                                <img src="/icons/news.svg" alt="news icon" className="btn__sidebar-icon"/>
                                Новости
                            </NavLink>
                        </li>
                        <li className="sidebar__list-item">
                            <NavLink
                                to="/course"
                                className={ ({isActive}) => (isActive ? sidebarButtonActive : sidebarButton) }
                            >
                                <img src="/icons/ebook.png" alt="course icon" className="btn__sidebar-icon"/>
                                Курсы
                            </NavLink>
                        </li>
                        <li className="sidebar__list-item">
                            <NavLink
                                to="/chat"
                                className={ ({isActive}) => isActive ? sidebarButtonActive : sidebarButton }
                            >
                                <img src="/icons/chat-icon.svg" alt="" className="btn__sidebar-icon" />
                                Чат
                            </NavLink>
                        </li>
                    </ul>
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