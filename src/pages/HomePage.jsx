import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../components/nav/Nav'
import Sidebar from '../components/sidebar/Sidebar'

import './HomePage.css'


export default function HomePage() {
    const [ activeContent, setActiveContent ] = useState("schedule")

    return (
        <div className="main-wrapper">
            <Sidebar 
                activeContent={ activeContent } 
                setActiveContent={ setActiveContent }
            />
            <div className="main">
                <Nav activeContent={activeContent} setActiveContent={setActiveContent} />
                <Outlet />
            </div>
        </div>
    )
}