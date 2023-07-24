import { requester } from "./requester";

const baseUrl = 'https://localhost:7129/api/Order';

export const sentOrder = (token, orderDate, userId, orderDetails, orderPrice ) =>
    requester(`${baseUrl}/SentOrder`, 'POST', { orderDate, userId, orderDetails, orderPrice }, token);



export const getOrderDateToString = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const currentDateTime = `${year}-${month}-${date} ${hours}:${minutes}`;
    return currentDateTime;
}
