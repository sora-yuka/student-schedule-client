import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'


// eslint-disable-next-line react/prop-types
export default function NewsDesktop({ news }) {
    return (
        <Fragment>
            { news && (
                news.map((newsItem) => (
                    <div className="news-card" key={ newsItem.id }>
                        <h3 className="news-card__headline">
                            { newsItem.header }
                        </h3>
                        <p className="news-card__content">
                            { newsItem.content.slice(0, 100) + " ..." }
                        </p>
                        <NavLink
                            to={ "/news/" + newsItem.id }
                            className="btn__read-news"
                        >
                            Читать дальше
                        </NavLink>
                    </div>
                ))
            ) }
        </Fragment>
    )
}