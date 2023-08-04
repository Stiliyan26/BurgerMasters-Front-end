import styles from './ChatInput.module.css';

import { useState } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';

import * as reviewService from '../../../services/reviewService';

const ChatInput = ({sendMessage}) => {
    const { user } = useAuthContext();

    const [message, setMessage] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        const isUserProvided = user.username && user.username !== '';
        const isMessageProvided = message && message !== '';

        if (isUserProvided && isMessageProvided) {
            const sentDate = reviewService.getMessageSentDateToString();

            sendMessage(user.username, user.userId, message, sentDate);
            setMessage('');
        }
        else {
            alert(`Please enter a message, ${user.username}.`);
        }
    }

    const onMessageUpdate = (e) => {
        setMessage(e.target.value);
    }

    return (
        <form onSubmit={onSubmit} className={styles['chat-inp-form']}>
            <input
                className={styles['chat-inp']}
                type="text"
                id="message"
                name="message"
                value={message}
                placeholder='Share an opinion...'
                onChange={onMessageUpdate} />
            <button className={styles['submit']}>Submit</button>
        </form>
    )
}

export default ChatInput;