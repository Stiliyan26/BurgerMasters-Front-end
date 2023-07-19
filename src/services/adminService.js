import { requester } from "./requester";

const baseUrl = 'https://localhost:7129/api/Admin';

export const createMenuItem = (menuItem, token, userId) =>
    requester(`${baseUrl}/CreateMenuItem?userId=${userId}`, 'POST', menuItem, token);

export const getMyPostsByType = (token, userId, itemType) =>
    requester(`${baseUrl}/MyItemsByType?userId=${userId}&itemType=${itemType}`, 'GET', null, token);

export const getSimilarProductsByCreator = (token, itemType, itemId, creatorId) =>
    requester(`${baseUrl}/SimilarProductsByCreator?itemType=${itemType}&itemId=${itemId}&creatorId=${creatorId}`,
        'GET', null, token);

export const getCreatorItem = (token, itemId, creatorId) =>
    requester(`${baseUrl}/CreatorItemById?itemId=${itemId}&creatorId=${creatorId}`, 'GET', null, token);

export const getItemEditInfo = (token, itemId, creatorId) => 
    requester(`${baseUrl}/EditItemInfo?itemId=${itemId}&creatorId=${creatorId}`, 'GET', null, token)
    //Change
export const editMenuItem = (token, editItem, itemId, creatorId) =>
    requester(`${baseUrl}/EditMenuItem?itemId=${itemId}&creatorId=${creatorId}`, 'PUT', editItem, token);

    