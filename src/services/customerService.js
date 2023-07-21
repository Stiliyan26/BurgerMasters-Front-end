import { requester } from "./requester";

const baseUrl = 'https://localhost:7129/api/Customer';

export const addToCart = (token, itemId, userId, quantity) =>
    requester(`${baseUrl}/AddItemToCart`, 'POST', { itemId, userId, quantity}, token);

export const getAllCartItems = (token, userId) => 
    requester(`${baseUrl}/AllCartItems?userId=${userId}`, 'GET', null, token);
