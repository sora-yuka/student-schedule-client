import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'


// eslint-disable-next-line react/prop-types
export default function NewsMobile({ news }) {

    return (
        <Fragment>
            { news && (
                news.map((newsItem) => (
                    <NavLink to={ "/news/" + newsItem.id }>
                        <div
                            className="news-card__mobile"
                            key={ newsItem.id }
                        >
                            <div className="news-card__preview">
                                <img src={ newsItem.preview } alt="card preview"/>
                            </div>
                            <div className="news-card__header">
                                <h3 className="header">{ newsItem.header }</h3>
                            </div>
                        </div>
                    </NavLink>
                ))
            ) }
        </Fragment>
    )
}