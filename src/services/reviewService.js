import { requester } from "./requester";

const baseUrl = 'https://localhost:7129/api/Review';

export const sentMessage = (token, message) => 
    requester(`${baseUrl}/SentMessage`, 'POST', message, token);

export const getAllMessages = (token) => 
    requester(`${baseUrl}/AllMessages`, 'GET', null, token);

export const getMessageSentDateToString = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const currentDateTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    return currentDateTime;
}