import { requester } from "./requester";

const baseUrl = `${process.env.REACT_APP_API}/api/Admin`;

export const createMenuItem = (token, menuItem, userId) =>
    requester(`${baseUrl}/CreateMenuItem?userId=${userId}`, 'POST', menuItem, token);

export const getMyPostsByType = (token, creatorId, itemType) =>
    requester(`${baseUrl}/MyItemsByType?creatorId=${creatorId}&itemType=${itemType}`, 'GET', null, token);

export const getSimilarProductsByCreator = (token, itemType, itemId, creatorId) =>
    requester(`${baseUrl}/SimilarProductsByCreator?itemType=${itemType}&itemId=${itemId}&creatorId=${creatorId}`,
        'GET', null, token);

export const getCreatorItem = (token, itemId, creatorId) =>
    requester(`${baseUrl}/CreatorItemById?itemId=${itemId}&creatorId=${creatorId}`, 'GET', null, token);

export const getItemEditInfo = (token, itemId, creatorId) => 
    requester(`${baseUrl}/EditItemInfo?itemId=${itemId}&creatorId=${creatorId}`, 'GET', null, token)
    
export const editMenuItem = (token, editItem, itemId, creatorId) =>
    requester(`${baseUrl}/EditMenuItem?itemId=${itemId}&creatorId=${creatorId}`, 'PUT', editItem, token);

export const deleteMenuItem = (token, itemId, creatorId) =>
    requester(`${baseUrl}/DeleteItem?itemId=${itemId}&creatorId=${creatorId}`, 'PATCH', null, token)

    