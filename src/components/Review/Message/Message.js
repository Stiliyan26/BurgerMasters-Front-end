import styles from './Message.module.css';

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
            <p className={styles['username']}><strong>{username}</strong> says:</p>
            <p className={styles['message']}>{message}</p>
            <p className={styles['sentDate']}>{sentDate.substring(0, 16)}</p>
        </div>
    );
} 

export default Message;