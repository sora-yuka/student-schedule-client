import { Fragment } from 'react'
import Sidebar from '../components/sidebar/Sidebar'

import './HomePage.css'


export default function HomePage() {

    return (
        <div className="main">
            <Sidebar />
            <div className="container">
                Here will be main content
            </div>
        </div>
    )
}