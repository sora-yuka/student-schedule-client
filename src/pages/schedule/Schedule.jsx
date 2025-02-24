import { useState, useEffect, useCallback, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

import './Schedule.css'


export default function Schedule() {
    const [ schedule, setSchedule ] = useState(null)
    const [ monday, setMonday ] = useState(null)
    const [ tuesday, setTuesday ] = useState(null)
    const [ wednesday, setWednesday ] = useState(null)
    const [ thursday, setThursday ] = useState(null)
    const [ friday, setFriday ] = useState(null)
    const navigate = useNavigate()

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
                setMonday(data[0]["Monday"])
                setFriday(data[0]["Friday"])
            }
        } catch (error) {
            console.log("An error occured while getting schedule data")
        }
    }, [ ])

    useEffect(() => {
        fetchSchedule()
    }, [ fetchSchedule ])

    return (
        <Fragment>
            <div className="schedule-row">
                { schedule && (
                    <>
                        { Object.entries(schedule).map(([ day, data ]) => {
                            if (data === "No schedule") {
                                <p>No schedule</p>
                            }
                            
                            <div className="day" key={day}>
                                <h3 className="day__headline">{day}</h3>
                                <ul className="secondary__time">
                                    <ul className="time__start">
                                        <li className="hint">Start</li>
                                        <li className="time__value">{data.start_period}</li>
                                    </ul>
                                    <ul className="time__end">
                                        <li className="hint">End</li>
                                        <li className="time__value">{data.end_period}</li>
                                    </ul>
                                </ul>
                                <div className="class-room">
                                    <p className="hint">Class room</p>
                                    <p className="class-room__value">{data.class_room}</p>
                                </div>
                            </div>
                        }) }
                    </>

                    // <div className="schedule__secondary">
                    //     <div className="day">
                    //         <h3 className="day__headline">Monday</h3>
                    //     </div>
                    //     <ul className="secondary__time">
                    //         <ul className="time__start">
                    //             <li className="hint">Start</li>
                    //             <li className="time__value">{ schedule.Monday.start_period }</li>
                    //         </ul>
                    //         <ul className="time__end">
                    //             <li className="hint">End</li>
                    //             <li className="time__value">{ schedule.Monday.end_period }</li>
                    //         </ul>
                    //     </ul>
                    //     <div className="class-room">
                    //         <p className="hint">Class room</p>
                    //         <p className="class-room__value">{ schedule.Monday.class_room }</p>
                    //     </div>
                    // </div>
                ) }
            </div>
        </Fragment>
    )
}