import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../components/nav/Nav'
import Sidebar from '../components/sidebar/Sidebar'

import './HomePage.css'


export default function HomePage() {
    return (
        <div className="main-wrapper">
            <Sidebar />
            <div className="main">
                <Nav />
                <Outlet />
            </div>
        </div>
    )
}