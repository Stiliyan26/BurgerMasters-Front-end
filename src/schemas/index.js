import * as yup from "yup";

const namePattern = /^[A-Z][a-z]{2,}(?: [A-Za-z][a-z]{2,})*$/;
//Create Menu item validation schema
export const createMenuItemSchema = yup.object().shape({
    name: yup.string()
        .min(5, 'Name should be at leaset 5 characters long!')
        .max(50, 'Name should be less than 50 characters long!')
        .matches(namePattern, 'Name must start with an uppercase letter followed by lower case letters and optionaly space')
        .required("Name is required!"),
    imageUrl: yup.string()
        .min(5, 'Image Url should be at leaset 5 characters long!')
        .max(50, 'Image Url should be less than 80 characters long!')
        .required("Image Url is required!"),
    itemType: yup.string()
        .notOneOf(['Select item'], 'Please select an item type!')
        .required("Item type is required!"),
    portionSize: yup.number()
        .min(200, "Portion size should be at least 200 grams/ml!")
        .max(800, "Portion size should be less than 800 grams/ml!")
        .required("Portion size is required!"),
    description: yup.string()
        .min(10, 'Description should be at leaset 10 characters long!')
        .max(100, 'Description should be less than 100 characters long!')
        .required("Description is required!"),
    price: yup.number()
        .min(2, 'Price should be at leaset 2 leva!')
        .max(30, 'Price should be less than 30 leva!')
        .required("Price is required!")
});