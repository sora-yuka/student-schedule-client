import { useState } from 'react'
import Nav from '../components/nav/Nav'
import Sidebar from '../components/sidebar/Sidebar'
import Content from '../components/content/Content'

import './HomePage.css'


export default function HomePage() {
    const [ activeContent, setActiveContent ] = useState("schedule")
    const [ contentHeadline, setContentHeadline ] = useState("Расписание")

    return (
        <div className="main-wrapper">
            <Sidebar 
                activeContent={ activeContent } 
                setActiveContent={ setActiveContent }
                setContentHeadline={ setContentHeadline } 
            />
            <div className="main">
                <Nav activeContent={activeContent} setActiveContent={setActiveContent} />
                <div className="container">
                    <Content activeContent={ activeContent } contentHeadline={ contentHeadline } />
                </div>
            </div>
        </div>
    )
}