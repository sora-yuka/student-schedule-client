import Button from '../../../components/button/Button'


export default function CourseDesktop({ courses }) {
    return (
        courses && (
            courses.map((course) => (
                <div className="course__card" key={ course.id }>
                    <p className="course__professor">{ course.professor }</p>
                    <h3 className="course__header">{ course.name }</h3>
                    <div className="course__btn">
                        <Button 
                            className="btn__course"
                            onClick={ () => {  } }
                        >
                            Перейти
                        </Button>
                    </div>
                </div>
            ) )
        )
    )
}