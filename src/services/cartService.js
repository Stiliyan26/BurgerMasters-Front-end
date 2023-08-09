import { requester } from "./requester";

const baseUrl = 'https://localhost:7129/api/Cart';

export const addToCart = (token, itemId, userId, quantity) =>
    requester(`${baseUrl}/AddItemToCart`, 'POST', { itemId, userId, quantity}, token);

export const getAllCartItems = (token, userId) => 
    requester(`${baseUrl}/AllCartItems?userId=${userId}`, 'GET', null, token);

export const removeCartItem = (token, itemId, userId) => 
    requester(`${baseUrl}/RemoveCartItem?itemId=${itemId}&userId=${userId}`, 'DELETE', null, token);

export const cleanUpCart = (token, userId) => 
    requester(`${baseUrl}/CleanUpCart?userId=${userId}`, 'DELETE', null, token);

export const cartItemCount = (token, userId) => 
    requester(`${baseUrl}/CartItemsCount?userId=${userId}`, 'GET', null, token);

