import { useState, useEffect, useCallback, Fragment } from 'react'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/button/Button'

import './Nav.css'


// eslint-disable-next-line react/prop-types
export default function Nav({ activeContent,  setActiveContent }) {
    const { isAuthenticated, logout } = useAuth()
    const [ profile, setProfile ] = useState(null)
    const [ isOpen, setIsOpen ] = useState(false)
    const [ isBurger, setIsBurger ] = useState(false)

    const fetchUser = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/profile/me/", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("access_token"),
                },
            })

            if (!response.ok) {
                throw new Error("Http error. Status: ", response.status)
            }

            if (response.status === 200) {
                const data = await response.json()
                setProfile(data)
            }
        } catch (error) {
            console.log("Error occured while getting profile.")
        }
    }, [ ])

    useEffect(() => {
        if (isAuthenticated) {
            fetchUser()
        }
    }, [ isAuthenticated, fetchUser ])

    return (
        <nav className="nav">
            <div className="container">
                <div className="off-screen-menu">
                    <ul className={ isBurger ? "off-screen-menu active" : "off-screen-menu" }>
                        <li className="off-screen-menu__item">
                            <Button
                                className={ activeContent === "schedule" ? "btn__nav active" : "btn__nav" }
                                onClick={ () => {
                                    setActiveContent("schedule")
                                    setIsBurger(false)
                                } }
                            >
                                <img
                                    src="./icons/schedule-icon.svg"
                                    alt="schedule icon"
                                />
                                Расписание
                            </Button>
                        </li>
                        <li className="off-screen-menu__item">
                            <Button
                                className={ activeContent === "news" ? "btn__nav active" : "btn__nav" }
                                onClick={ () => {
                                    setActiveContent("news")
                                    setIsBurger(false)
                                } }
                            >
                            <img
                                src="./icons/news.svg"
                                alt="news icon"
                            />
                                Нововсти
                            </Button>
                        </li>
                        <li className="off-screen-menu__item">
                            <Button
                                className={ activeContent === "chat" ? "btn__nav active" : "btn__nav" }
                                onClick={ () => {
                                    setActiveContent("chat")
                                    setIsBurger(false)
                                } }
                            >
                            <img
                                src="./icons/chat-icon.svg"
                                alt="chat icon"
                                // className={ activeContent === "chat" ?  activeButtonIcon : inActiveButtonIcon }
                            />
                                Чат
                            </Button>
                        </li>
                    </ul>
                </div>
                <div className="nav-row">
                    <ul className="nav-list">
                        <span className="site-headline"><strong>Edu.</strong>hub</span>
                        <li className="nav-list__item">
                            <div className={ isBurger ? "btn-burger active" : "btn-burger" }
                                 onClick={ () => setIsBurger(!isBurger) }
                            >
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            { profile && (
                                <Fragment>
                                    <Button 
                                        className="btn-profile" 
                                        onClick={ () => { setIsOpen(!isOpen) } }
                                        >
                                        <img 
                                            src={ profile.pfp } 
                                            alt="profile photo" 
                                            className="profile-photo"
                                        />
                                    </Button>

                                    { isOpen && (
                                        <div className={ isOpen ? "drop-down--active" : "" }>
                                            <div className="drop-down__profile-actions">
                                                <p className="drop-down__hint">Profile setting</p>
                                                <Button className="btn__drop-down">
                                                    View profile
                                                </Button>
                                            </div>
                                            <Button 
                                                className="btn__logout"
                                                onClick={ () => {
                                                    logout()
                                                    setIsOpen(!isOpen)
                                                } }
                                            >
                                                Log out
                                            </Button>
                                        </div>
                                    ) }
                                </Fragment>
                            ) }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}