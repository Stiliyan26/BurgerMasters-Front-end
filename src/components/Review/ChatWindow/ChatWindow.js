import styles from './ChatWindow.module.css'

import Message from "../Message/Message";

const ChatWindow = ({ chat, isFirstRender, handleRemoveMessage }) => {
    
    const getAllMessages = () => {
        return chat
            .sort((a, b) => new Date(b.sentDate) - new Date(a.sentDate))
            .map((messageInfo, index) => <Message 
                key={Date.now() * Math.random()}
                messageInfo={messageInfo}
                index={index}
                isFirstRender={isFirstRender}
                handleRemoveMessage={handleRemoveMessage}
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