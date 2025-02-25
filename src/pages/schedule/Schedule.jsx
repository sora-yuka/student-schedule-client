import { useState, useEffect, useCallback, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

import './Schedule.css'


export default function Schedule() {
    const [ schedule, setSchedule ] = useState(null)
    const [ day, setDay ] = useState("Monday")

    const fetchSchedule = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/schedule/", {
                method: "GET",
                headers: { "Content-type": "application/json" },
                credentials: "include",
            })

            if (response.status === 200) {
                const data = await response.json()
                setSchedule(data[0])
            }
        } catch (error) {
            console.log("An error occured while getting schedule data")
        }
    }, [ ])

    useEffect(() => {
        fetchSchedule()
    }, [ fetchSchedule ])



    return (
        <div className="schedule-row">
            { schedule && (
                <Fragment>
                    <div className="schedule__secondary">
                        <div className="day">
                            <select className="day__headline" onChange={ (event) => { setDay(event.target.value) } }>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                            </select>
                        </div>  
                        <ul className="secondary__list">
                            { schedule[day].map((currentSchedule, id) => (
                                <li className="secondary__list-item" key={ id }>
                                    <div className="list-item__row">
                                        <p className="hint">Start</p>
                                        <p className="hint">End</p>
                                    </div>
                                    <div className="list-item__row">
                                        <div className="time-value">{ currentSchedule.start_period }</div>
                                        <div className="time-value">{ currentSchedule.end_period }</div>
                                    </div>
                                    <div className="list-item__class">
                                        <p className="hint">Class room</p>
                                        <div className="class-value">{ currentSchedule.class_room }</div>
                                    </div>
                                </li>
                            )) }
                        </ul>
                    </div>
                    <div className="schedule__primary">
                        { schedule[day].map((currentSchedule, id) => (
                            <p>
                                { currentSchedule.lesson_name }
                            </p>
                        )) }
                    </div>
                </Fragment>
            ) }
        </div>
    )
}