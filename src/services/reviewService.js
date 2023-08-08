import { requester } from "./requester";

const baseUrl = 'https://localhost:7129/api/Review';

export const sentMessage = (token, message) => 
    requester(`${baseUrl}/SentMessage`, 'POST', message, token);

export const getAllMessages = (token) => 
    requester(`${baseUrl}/AllMessages`, 'GET', null, token);

export const removeMessage = (token, messageId, isAdmin, userId) => 
    requester(`${baseUrl}/RemoveMessage?isAdmin=${isAdmin}&userId=${userId}`, 'PATCH', messageId, token);

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

export const getBeforeHowMuchTime = (date) => { 
    const givenDateString = date;
    const givenDate = new Date(givenDateString);
    const currentDate = new Date();
    
    // Calculate the time difference in milliseconds
    const timeDifference = currentDate.getTime() - givenDate.getTime();
    
    // Calculate the time difference in years, months, days, hours, and minutes
    const yearsDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
    const monthsDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const daysDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    
    let formattedTimeDifference = '';
    
    if (yearsDifference > 0) {
        formattedTimeDifference = `before ${yearsDifference} ${yearsDifference === 1 ? 'year' : 'years'}`;
    } else if (monthsDifference > 0) {
        formattedTimeDifference = `before ${monthsDifference} ${monthsDifference === 1 ? 'month' : 'months'}`;
    } else if (daysDifference > 0) {
        formattedTimeDifference = `before ${daysDifference} ${daysDifference === 1 ? 'day' : 'days'}`;
    } else if (hoursDifference > 0) {
        formattedTimeDifference = `before ${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'}`;
    } else if (minutesDifference > 0) {
        formattedTimeDifference = `before ${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'}`;
    } else {
        formattedTimeDifference = 'just now';
    }

    return formattedTimeDifference;
}