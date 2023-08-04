import styles from './Review.module.css';

import ChatWindow from '../ChatWindow/ChatWindow';
import ChatInput from '../ChatInput/ChatInput';

import * as reviewService from '../../../services/reviewService';
import { useAuthContext } from '../../../contexts/AuthContext';

import { useState, useEffect, useRef } from 'react';

import { HubConnectionBuilder } from '@microsoft/signalr';

const Review = () => {
    const [connection, setConnection] = useState(null);
    const [chat, setChat] = useState([]);
    const [isFirstRender, setIsFirstRender] = useState(true); 
    const latestChat  = useRef(null);

    const { token } = useAuthContext();

    latestChat.current = chat;

    useEffect(() => {
        document.title = 'Review';

        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7129/hubs/review')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        reviewService.getAllMessages(token)
            .then(res => {
                if (res.status === 200){
                    setChat(res.messages);
                }
            })
            .catch(error => {
                console.log(error.message);
            })

        if (connection) {
            connection.start()
                .then(() => {
                    console.log('Connected!');
    
                    connection.on('ReceiveMessage', message => {
                        const updatedChat = [...latestChat.current];
                        updatedChat.push(message);
                    
                        setChat(updatedChat);
                        setIsFirstRender(false);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const sendMessage = async (username, userId, message, sentDate) => {
        const chatMessage = {
            userId,
            username,
            message,
            sentDate
        };

        try {
            reviewService.sentMessage(token, chatMessage)
                .then(res => {
                    console.log(res);
                })
                .catch(error => {
                    console.log(error.message);
                });
        }
        catch(e) {
            console.log('Sending message failed.', e);
        }
    }


    return (
        <div id={styles['review']}>
            <ChatInput sendMessage={sendMessage} />
            <hr />
            <ChatWindow chat={chat} isFirstRender={isFirstRender}/>
        </div>
    );
}

export default Review;