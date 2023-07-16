import { requester } from "./requester";

const baseUrl = 'https://localhost:7129/api/Admin';

export const createMenuItem = (menuItem, token) =>
    requester(`${baseUrl}/CreateMenuItem`, 'POST', menuItem, token);
