import { requester } from "./requester";

const baseUrl = 'https://localhost:7129/api/Menu';

//All types of an item
export const getAllItemTypes = () => requester(`${baseUrl}/AllItemTypes`, 'GET');
//All items by type
export const getAllItemsByType = (token, itemType) =>
    requester(`${baseUrl}/AllItemsByType?itemType=${itemType}`, 'GET', null, token);
//Item by id
export const getItemById = (token, itemId) =>
    requester(`${baseUrl}/ItemDetailsById?itemId=${itemId}`, 'GET', null, token);

export const getSimilarProducts = (token, itemType, itemId) => 
    requester(`${baseUrl}/SimilarProducts?itemType=${itemType}&itemId=${itemId}`, 'GET', null, token);



