import { useState, Fragment } from 'react'
import Nav from '../components/nav/Nav'
import Sidebar from '../components/sidebar/Sidebar'
import Content from '../components/content/Content'

import './HomePage.css'


export default function HomePage() {
    const [ activeContent, setActiveContent ] = useState("schedule")

    return (
        <div className="main-wrapper">
            <Sidebar activeContent={ activeContent } setActiveContent={ setActiveContent } />
            <div className="main">
                <Nav />
                <div className="container">
                    <Content activeContent={ activeContent } />
                </div>
            </div>
        </div>
    )
}