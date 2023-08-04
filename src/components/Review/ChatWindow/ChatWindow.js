import styles from './ChatWindow.module.css'

import Message from "../Message/Message";

const ChatWindow = ({ chat, isFirstRender }) => {
    
    const getAllMessages = () => {
        return chat
            .sort((a, b) => new Date(b.sentDate) - new Date(a.sentDate))
            .map((m, index) => <Message 
                key={Date.now() * Math.random()}
                username={m.username}
                message={m.message}
                sentDate={m.sentDate}
                index={index}
                isFirstRender={isFirstRender}
            />
        );
    }
            
    return(
        <div id={styles['chatWindow']}>
            {chat && getAllMessages()}
        </div>
    )
}

export default ChatWindow;