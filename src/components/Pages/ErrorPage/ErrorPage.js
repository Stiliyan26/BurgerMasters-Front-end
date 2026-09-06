import styles from './ErrorPage.module.css';

import { useNavigate, useLocation } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    const location = useLocation();

    const handleGoBack = () => {
        if (location.pathname === '/Not-found'){
            navigate(-3);
        } else {
            navigate(-1);
        }
    };

    return (
        <div id={styles['error-container']}>
            <h2 className={styles['sub-title']}>Oops! Page not found!</h2>
            <h1 className={styles['title']}>
                <span>4</span>
                <i id={styles['icon-question']} className="far fa-question-circle fa-spin"></i>
                <span>4</span>
            </h1>
            <p className={styles['msg']}>We can't find the page you're looking for.</p>
            <button onClick={handleGoBack} className={styles['go-back']}>
                Go back <i id={styles['icon-backward']} className="fa-solid fa-backward"></i>
            </button>
        </div>
    )
}

export default ErrorPage;