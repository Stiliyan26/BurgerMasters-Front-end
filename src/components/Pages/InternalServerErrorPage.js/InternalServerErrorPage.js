import styles from './InternalServerErrorPage.module.css';

import { useNavigate, useLocation } from 'react-router-dom';

const InternalServerError = () => {
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
        <div id={styles['server-error-container']}>
            <h2 className={styles['sub-title']}>Oops! Internal server error!</h2>
            <h1 className={styles['title']}>
                <span className={styles['five']}>5</span>
                <i id={styles['icon-question']} className="fa-light fa-circle-exclamation fa-spin"></i>
                <i id={styles['icon-question']} className="fa-light fa-circle-exclamation fa-spin"></i>
            </h1>
            <p className={styles['msg']}>There was an internal server error.</p>
            <button onClick={handleGoBack} className={styles['go-back']}>
                Go back <i id={styles['icon-backward']} className="fa-solid fa-backward"></i>
            </button>
        </div>
    )
}

export default InternalServerError;