import { useState, Fragment } from 'react'
import Schedule from '../../pages/schedule/Schedule'

import './Content.css'


export default function Content({ activeContent }) {

    return (
        <div className="content-row">
            <h2 className="content-headline">{ activeContent }</h2>
            <div className="content-container">
                { activeContent === "schedule" && (
                    <Schedule />
                ) }
            </div>
        </div>
    )
}