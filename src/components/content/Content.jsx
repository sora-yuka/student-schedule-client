import Schedule from '../../pages/schedule/Schedule'
import News from '../../pages/news/News'

import './Content.css'


export default function Content({ activeContent, contentHeadline }) {

    return (
        <div className="content-row">
            {/* <h2 className="content-headline">{ contentHeadline }</h2> */}
            <div className="content-container">
                { activeContent === "schedule" && (
                    <Schedule />
                ) }
                { activeContent === "news" && (
                    <News />
                ) }
            </div>
        </div>
    )
}