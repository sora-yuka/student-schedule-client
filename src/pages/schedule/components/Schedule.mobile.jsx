import { Fragment } from 'react'


export default function ScheduleMobile({ schedule, day, setDay }) {
    return (
        <div className="schedule-row__mobile">
            <div className="schedule-row__day-block">
                <ul className="day-block__list">
                    <li 
                        className = { day === "Monday" ? "day-block__item active" : "day-block__item" }
                        onClick={ () => { setDay("Monday") } }
                    >
                        Пн
                    </li>
                    <li 
                        className = { day === "Tuesday" ? "day-block__item active" : "day-block__item" }
                        onClick={ () => { setDay("Tuesday") } }
                    >
                        Вт
                    </li>
                    <li 
                        className = { day === "Wednesday" ? "day-block__item active" : "day-block__item" }
                        onClick={ () => { setDay("Wednesday") } }
                    >
                        Ср
                    </li>
                    <li
                        className = { day === "Thursday" ? "day-block__item active" : "day-block__item" }
                        onClick={ () => { setDay("Thursday") } }
                    >
                        Чт
                    </li>
                    <li 
                        className = { day === "Friday" ? "day-block__item active" : "day-block__item" }
                        onClick={ () => { setDay("Friday") } }
                    >
                        Пт
                    </li>
                    <li 
                        className = { day === "Sunday" ? "day-block__item active" : "day-block__item" }
                        onClick={ () => { setDay("Sunday") } }
                    >
                        Сб
                    </li>
                </ul>
            </div>
            <div className="schedule-row__schedule-block">
                <ul className="schedule-block__list">
                    { schedule[day] !== "No schedule" ? (
                        schedule[day].map((currentSchedule, id) => (
                            <li className="schedule-block__item" key={ id }>
                                <div className="schedule-block__time-place">
                                    <div className="time-place__time">
                                        <p className="time__start-period">{ currentSchedule.start_period }</p> 
                                        <span>-</span> 
                                        <p className="time__end-period">{ currentSchedule.end_period }</p>
                                    </div>
                                    <span className="time-place__filler">|</span>
                                    <div className="time-place__place">
                                        <p className="place__class">{ currentSchedule.class_room }</p>
                                    </div>
                                    <span className="time-place__filler">|</span>
                                    <div className="time-place__week-count">
                                        <p className="week-count__value">{ currentSchedule.number_of_weeks }</p>
                                    </div>
                                    { currentSchedule.week_variance && (
                                        <Fragment>
                                            <span className="time-place__filler">|</span>
                                            <div className="time-place__week-type">
                                                <p className="week-type__value">{ currentSchedule.week_variance }</p>
                                            </div>
                                        </Fragment>
                                    ) }
                                </div>
                                <div className="subject-block">
                                    <div className="subject-block__title">
                                        { currentSchedule.lesson_name }
                                    </div>
                                    <div className="subject-additional">
                                        <div className="subject-block__subject-type">
                                            <p className="subject-type__value">{ currentSchedule.lesson_type }</p>
                                        </div>
                                        <div className="subject-block__professor">
                                            <p className="professor__value">{ currentSchedule.professor }</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ) )
                    ) : (
                        <p>Добби свободен :)</p>
                    ) }
                </ul>
            </div>
        </div>
    )
}