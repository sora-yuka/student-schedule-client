import {Fragment, useCallback, useEffect, useState} from 'react'
import Button from '../../../components/button/Button'


// eslint-disable-next-line react/prop-types
export default function NewsDesktop({ news }) {
    return (
        <Fragment>
            { news && (
                news.map((singleNews) => (
                    <div className="news-card" key={ singleNews.id }>
                        <h3 className="news-card__headline">
                            { singleNews.header }
                        </h3>
                        <p className="news-card__content">
                            { singleNews.content.slice(0, 100) + " ..." }
                        </p>
                        <Button
                            className="btn__read-news"
                            // onClick={ () => {
                            //     setIsNewsOpened(true)
                            //     setNewsId(singleNews.id)
                            // } }
                        >
                            Читать дальше
                        </Button>
                    </div>
                ))
            ) }
        </Fragment>
    )
}