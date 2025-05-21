import {Fragment, useCallback, useEffect, useState} from 'react'


// eslint-disable-next-line react/prop-types
export default function NewsMobile({ news, setIsNewsOpened, setNewsId }) {
    return (
        <Fragment>
            { news && (
                news.map((singleNews) => (
                    <div
                        className="news-card__mobile"
                        key={ singleNews.id }
                        onClick={() => {
                            setIsNewsOpened(true)
                            setNewsId(singleNews.id)
                        }}
                    >
                        <div className="news-card__preview">
                            <img src={ singleNews.preview } alt="card preview"/>
                        </div>
                        <div className="news-card__header">
                            <h3 className="header">{ singleNews.header }</h3>
                        </div>
                    </div>
                ))
            ) }
        </Fragment>
    )
}