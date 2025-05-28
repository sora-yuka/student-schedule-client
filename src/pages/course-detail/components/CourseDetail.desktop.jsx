import { useState, Fragment } from 'react'
import NoContent from '../../../components/no-content/NoContent'


export default function CourseDetailDesktop({ courseItems }) {
    const [openAccordion, setOpenAccordion] = useState({})

    const handleAccordion = (id) => {
        setOpenAccordion(prevState => ({
            ...prevState, [id]: !prevState[id]
        }))
    }

    return (
        <div className="course-detail__row">
            { courseItems.length !== 0 ? (
                courseItems.map((courseItem) => (
                <Fragment>
                    <div className="course-detail__tabs" key={ courseItem.id }>
                        <div className="tabs__block" onClick={ () => handleAccordion(courseItem.id) }>
                            <h3 className="tabs__header">{ courseItem.name }</h3>
                            <span className="tabs__show-icon">{ openAccordion[courseItem.id] ? "-" : "+" }</span>
                        </div>
                        <div className={ openAccordion[courseItem.id] ? "course-detail__accordion--active" : "course-detail__accordion" }>
                            { courseItem.content_file.map((contentFile) => (
                                <a href={ contentFile.content } target="_blank" className="panel" key={ contentFile.id }>
                                    <span className="panel__document"><img src="/icons/news.svg" alt="" /></span>
                                    { contentFile.file_name }
                                </a>
                            )) }
                        </div>
                    </div>
                </Fragment>
                ))
            ) : (
                <NoContent />
            ) }
        </div>
    )
}