import styles from './Message.module.css';

import * as reviewService from '../../../services/reviewService'; 
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';

const Message = ({messageInfo, index, isFirstRender, handleRemoveMessage}) => {
    const { isAdmin, user } = useAuthContext();

    const getClassNameByFirstRender = () => {
        return isFirstRender 
            ? 'message-withAnim'
            : 'message-withoutAnim'
    }

    function onRemove() {
        handleRemoveMessage(messageInfo.id, isAdmin, user.userId);
    }

    const removeBtn = () => (
        <Link className={styles["spinning-x"]}>
            <i onClick={onRemove} id={styles['spinning-icon']} className="fa-regular fa-xmark"></i>
        </Link>
    );

    const isCreatorOfMessage = user.userId === messageInfo.userId
        ? true
        : false

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
            
            { (isAdmin || isCreatorOfMessage) && removeBtn() }
        </div>
    );
} 

export default Message;