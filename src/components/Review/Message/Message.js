import styles from './Message.module.css';

import * as reviewService from '../../../services/reviewService'; 

const Message = ({username, message, sentDate, index, isFirstRender}) => {
    const getClassNameByFirstRender = () => {
        return isFirstRender 
            ? 'message-withAnim'
            : 'message-withoutAnim'
    }

    return (
        <div 
            id={styles[getClassNameByFirstRender()]} 
            style={isFirstRender 
                    ? { animationDelay: `${index * 0.2}s`}
                    : null}
        >
            <p className={styles['username']}>{username} says:</p>
            <p className={styles['sentDate']}>{reviewService.getBeforeHowMuchTime(sentDate)}</p>
            <p className={styles['message']}>- {message}</p>
        </div>
    );
} 

export default Message;