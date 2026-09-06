import * as yup from "yup";

const namePattern = /^[A-Za-z\s'-]{5,50}$/;
//Create Menu item validation schema
export const createMenuItemSchema = yup.object().shape({
    name: yup.string()
        .min(5, 'Name should be at leaset 5 characters long!')
        .max(50, 'Name should be less than 50 characters long!')
        .matches(namePattern, 'No digits or special characters allowed!')
        .required("Name is required!"),
    imageUrl: yup.string()
        .min(5, 'Image Url should be at leaset 5 characters long!')
        .max(80, 'Image Url should be less than 80 characters long!')
        .required("Image Url is required!"),
    itemType: yup.string()
        .notOneOf(['Select item'], 'Please select an item type!')
        .required("Item type is required!"),
    portionSize: yup.number()
        .min(150, "Portion size should be at least 150 grams/ml!")
        .max(800, "Portion size should be less than 800 grams/ml!")
        .required("Portion size is required!"),
    description: yup.string()
        .min(10, 'Description should be at leaset 10 characters long!')
        .max(300, 'Description should be less than 300 characters long!')
        .required("Description is required!"),
    price: yup.number()
        .min(2, 'Price should be at leaset 2 leva!')
        .max(30, 'Price should be less than 30 leva!')
        .required("Price is required!")
});

export const editMenuItemSchema = yup.object().shape({
    name: yup.string()
        .min(5, 'Name should be at leaset 5 characters long!')
        .max(50, 'Name should be less than 50 characters long!')
        .matches(namePattern, 'No digits or special characters allowed!')
        .required("Name is required!"),
    imageUrl: yup.string()
        .min(5, 'Image Url should be at leaset 5 characters long!')
        .max(80, 'Image Url should be less than 80 characters long!')
        .required("Image Url is required!"),
    portionSize: yup.number()
        .min(150, "Portion size should be at least 150 grams/ml!")
        .max(800, "Portion size should be less than 800 grams/ml!")
        .required("Portion size is required!"),
    description: yup.string()
        .min(10, 'Description should be at leaset 10 characters long!')
        .max(300, 'Description should be less than 300 characters long!')
        .required("Description is required!"),
    price: yup.number()
        .min(2, 'Price should be at leaset 2 leva!')
        .max(30, 'Price should be less than 30 leva!')
        .required("Price is required!")
});

export const reviewMessageItemSchema = yup.object().shape({
    message: yup.string()
        .min(5, 'Review message should be at least 5 characters long!')
        .max(150, 'Review message should be at less than 150 characters long!')
});
