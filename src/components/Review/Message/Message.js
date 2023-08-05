import styles from './Message.module.css';

import * as reviewService from '../../../services/reviewService'; 
import { Link } from 'react-router-dom';

const Message = ({messageInfo, index, isFirstRender, handleRemoveMessage}) => {
    const getClassNameByFirstRender = () => {
        return isFirstRender 
            ? 'message-withAnim'
            : 'message-withoutAnim'
    }

    function onRemove() {
        handleRemoveMessage(messageInfo.id);
    }

    return (
        <div id={styles[getClassNameByFirstRender()]}
            className={styles['common-message']} 
            style={isFirstRender 
                ? { animationDelay: `${index * 0.2}s`}
                : null}
        >
            <div className={styles['msg-container']}>
                <p className={styles['username']}>{messageInfo.username} says:</p>
                <p className={styles['sentDate']}>{reviewService.getBeforeHowMuchTime(messageInfo.sentDate)}</p>
                <p className={styles['message']}>- {messageInfo.message}</p>
            </div>
            
            <Link className={styles["spinning-x"]}>
                <i onClick={onRemove} id={styles['spinning-icon']} className="fa-regular fa-xmark"></i>
            </Link>
        </div>
        
    );
} 

export default Message;