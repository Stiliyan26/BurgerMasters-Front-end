import { requester } from "./requester";

const baseUrl = `${process.env.REACT_APP_API}/api/Menu`;
export const getAllItemTypes = () => 
    requester(`${baseUrl}/AllItemTypes`, 'GET');

export const getAllItemsByType = (token, itemType) =>
    requester(`${baseUrl}/AllItemsByType?itemType=${itemType}`, 'GET', null, token);

export const getItemById = (token, itemId) =>
    requester(`${baseUrl}/ItemDetailsById?itemId=${itemId}`, 'GET', null, token);

export const getSimilarProducts = (token, itemType, itemId) => 
    requester(`${baseUrl}/SimilarProducts?itemType=${itemType}&itemId=${itemId}`, 'GET', null, token);

export const getFilteredAndSortedItems = (token, queryModel) => 
    requester(`${baseUrl}/AllMenuItems?queryModelString=${JSON.stringify(queryModel)}`, 'GET', null, token);

export const getPortionMeasure = (itemType) => {
    return itemType === 'Drink'
            ? 'ml'
            : 'g'
}



