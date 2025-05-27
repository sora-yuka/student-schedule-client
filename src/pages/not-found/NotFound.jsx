import { Link } from 'react-router-dom'
import Button from '../../components/button/Button'

import './NotFound.css'


export default function NotFound() {
    return (
        <div className="not-found">
            <div className="container">
                <div className="not-found-row">
                    <h2 className="not-found__title"><strong>404</strong></h2>
                    <h3 className="not-found__text"><strong>Страница не найдена</strong></h3>
                    <p className="not-found__additional-text">
                        Мы просим прощения, но страница которую вы ищите не найдена. <br />
                    </p>
                    <Link to="/">
                        <Button className="btn">
                            Назад
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}