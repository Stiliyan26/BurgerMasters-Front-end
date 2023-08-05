import styles from './Review.module.css';

import ChatWindow from '../ChatWindow/ChatWindow';
import ChatInput from '../ChatInput/ChatInput';

import * as reviewService from '../../../services/reviewService';
import { useAuthContext } from '../../../contexts/AuthContext';

import { useState, useEffect, useRef } from 'react';

import { HubConnectionBuilder } from '@microsoft/signalr';
import { useNavigate } from 'react-router-dom';

const Review = () => {
    const [connection, setConnection] = useState(null);
    const [chat, setChat] = useState([]);
    const [isFirstRender, setIsFirstRender] = useState(true); 
    const latestChat  = useRef(null);

    const { token } = useAuthContext();

    const navigate = useNavigate();

    //latestChat.current = chat;
    
    useEffect(() => {
        document.title = 'Review';

        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7129/hubs/review')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
        setIsFirstRender(false);

        return () => {
            if (newConnection.state !== 'Disconnected') {
                newConnection.stop()
                    .then(() => {
                        console.log('Connection closed successfully.');
                    })
                    .catch((error) => {
                        console.log('Error closing connection: ', error);
                    });
            }
        };
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
    
                    connection.on('ReceiveMessage', newMessage => {
                        // const updatedChat = [...latestChat.current];
                        // updatedChat.push(message);
                        
                        setChat(prevMessages => 
                            [...prevMessages, newMessage]
                        );
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
                    if (res.status === 200) {
                        console.log("message sent!");
                    }
                })
                .catch(error => {
                    console.log(error.message);
                });
        }
        catch(e) {
            console.log('Sending message failed.', e);
        }
    }

    const handleRemoveMessage = (messageId) => {
        reviewService.removeMessage(token, messageId)
            .then(res => {
                if (res.status === 200) {
                    setChat(prevMessages => 
                        prevMessages.filter(m => m.id !== messageId)
                    );
                } else if (res.status === 500) {
                    navigate('/Internal-server-error');
                }
            })
            .catch(error => {
                console.log(error.message);
                navigate('/Internal-server-error');
            });
    }

    return (
        <div id={styles['review']}>
            <ChatInput sendMessage={sendMessage} />
            <hr />
            <ChatWindow 
                chat={chat} 
                isFirstRender={isFirstRender}
                handleRemoveMessage={handleRemoveMessage}
            />
        </div>
    );
}

export default Review;