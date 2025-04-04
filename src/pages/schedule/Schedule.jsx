import { useState, useEffect, useCallback, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

import './Schedule.css'


export default function Schedule() {
    const [ schedule, setSchedule ] = useState(null)
    const [ day, setDay ] = useState("Monday")

    const fetchSchedule = useCallback(async () => {
        try {
            const response = await fetch("http://192.168.31.169:8000/api/v1/schedule/", {
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
                            { schedule[day] !== "No schedule" ? (
                                schedule[day].map((currentSchedule, id) => (
                                    <li className="secondary__list-item" key={ id }>
                                        <div className="time-row">
                                            <div className="list-item__row">
                                                <p className="hint">Начало</p>
                                                <div className="time-value">{ currentSchedule.start_period }</div>
                                            </div>
                                            <div className="list-item__row">
                                                <p className="hint">Конец</p>
                                                <div className="time-value">{ currentSchedule.end_period }</div>
                                            </div>
                                        </div>
                                        <div className="list-item__class">
                                            <p className="hint">Кабинет | Аудитория</p>
                                            <div className="class-value">{ currentSchedule.class_room }</div>
                                        </div>
                                    </li>
                                )
                            )) : (
                                <p>Добби свободен :)</p>
                            ) }
                        </ul>
                    </div>
                    <div className="schedule__primary">
                        <ul className="primary__list">
                            { schedule[day] !== "No schedule" ? (
                                schedule[day].map((currentSchedule, id) => (
                                    <li className="primary__list-item" key={ id }>
                                        <div className="additional-text">
                                            <div className="text__professor">
                                                <p className="hint">Преподаватель</p>
                                                <p className="professor">{ currentSchedule.professor }</p>
                                            </div>
                                            <div className="text__weeks-count">
                                                <p className="hint">Кол-во недели</p>
                                                <div className="weeks-count">{ currentSchedule.number_of_weeks }</div>
                                            </div>
                                            <div className="text__lesson-type">
                                                <p className="hint">Тип предмета</p>
                                                <div className="lesson-type">{ currentSchedule.lesson_type }</div>
                                            </div>
                                            <div className="text__week-variance">
                                                <p className="hint">Тип недели</p>
                                                <div className="wee-variance">
                                                    { currentSchedule.week_variance ? currentSchedule.week_variance : "Doesn't matter" }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="subject">
                                            <p className="subject__name">{ currentSchedule.lesson_name }</p>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p style={{ fontSize: "24px" }}>Ребят, я отменил пары, не благодарите</p>
                            ) }
                        </ul>
                    </div>
                </Fragment>
            ) }
        </div>
    )
}