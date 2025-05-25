import { useState, useEffect, useCallback, Fragment } from 'react'
import ScheduleDesktop from './components/Schedule.desktop.jsx'
import ScheduleMobile from './components/Schedule.mobile.jsx'

import './Schedule.css'


export default function Schedule() {
    const today = new Date()
    const dayOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    const [ schedule, setSchedule ] = useState(null)
    const [ day, setDay ] = useState(null)

    const fetchSchedule = useCallback(async () => {
        try {
            const response = await fetch(import.meta.env.VITE_API_ENDPOINT + "schedule/", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("access_token"),
                },
            })

            if (response.status === 200) {
                const data = await response.json()
                setSchedule(data[0])
            }

            if (today.getDay() === 0) {
                setDay(dayOfWeek[0])
            } else {
                setDay(dayOfWeek[today.getDay() - 1])
            }
        } catch (error) {
            console.log(error)
        }
    }, [ ])

    useEffect(() => {
        fetchSchedule()
    }, [ fetchSchedule ])

    return (
        <Fragment>
            { schedule && (
                <Fragment>
                    <ScheduleDesktop
                        schedule={ schedule }
                        day={ day }
                        setDay={ setDay }
                    />
                    <ScheduleMobile
                        schedule={ schedule }
                        day={ day }
                        setDay={ setDay }
                    />
                </Fragment>
            ) }
            { !schedule && (
                <div className="loading">Загрузка расписания...</div>
            ) }
        </Fragment>
    )
}