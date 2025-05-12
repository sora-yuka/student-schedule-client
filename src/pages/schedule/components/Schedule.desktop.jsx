import { Fragment } from 'react'


// eslint-disable-next-line react/prop-types
export default function ScheduleDesktop({ schedule, day, setDay }) {
    return (
        <div className="schedule-row">
            { schedule && (
                <Fragment>
                    <div className="schedule__secondary">
                        <div className="day">
                            <select
                                className="day__headline"
                                onChange={ (event) => { setDay(event.target.value) } }
                                value={ day }
                            >
                                <option value="Monday">Понедельник</option>
                                <option value="Tuesday">Вторник</option>
                                <option value="Wednesday">Среда</option>
                                <option value="Thursday">Четверг</option>
                                <option value="Friday">Пятница</option>
                                <option value="Saturday">Суббота</option>
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
                                            { currentSchedule.week_variance && (
                                                <Fragment>
                                                    <div className="text__week-variance">
                                                        <p className="hint">Тип недели</p>
                                                        <div className="wee-variance">
                                                            { currentSchedule.week_variance ? currentSchedule.week_variance : "" }
                                                        </div>
                                                    </div>
                                                </Fragment>
                                            ) }
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