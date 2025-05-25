import Schedule from '../../pages/schedule/Schedule'
import News from '../../pages/news/News'
import Course from '../../pages/course/Course'
import Chat from '../../pages/chat/Chat'

import './Content.css'
import {Fragment} from "react";


export default function Content({ activeContent, contentHeadline }) {

    return (
        <Fragment>
            <div className="content-row">
                <div className="content-container">
                    { activeContent === "schedule" && (
                        <Schedule />
                    ) }
                    { activeContent === "news" && (
                        <News />
                    ) }
                    { activeContent === "course" && (
                        <Course />
                    ) }
                    { activeContent === "chat" && (
                        <Chat />
                    ) }
                </div>
            </div>
        </Fragment>
    )
}