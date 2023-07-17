import { requester } from "./requester";

const baseUrl = 'https://localhost:7129/api/Admin';

export const createMenuItem = (menuItem, token, userId) =>
    requester(`${baseUrl}/CreateMenuItem?userId=${userId}`, 'POST', menuItem, token);

export const getMyPosts = (token, userId) => 
    requester(`${baseUrl}/MyItems?userId=${userId}`, 'GET', null, token);
