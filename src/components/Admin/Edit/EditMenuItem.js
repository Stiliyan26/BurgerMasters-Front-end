import styles from './EditMenuItem.module.css';

import { useAuthContext } from '../../../contexts/AuthContext';

import * as adminService from '../../../services/adminService';

import { MYPOSTS_PAGE_NAME, MENU_PAGE_NAME } from '../../../Constants/globalConstants';

import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useFormik } from "formik";
import { editMenuItemSchema } from '../../../schemas/index'

const EditMenuItem = () => {
    const { token, user } = useAuthContext();

    const [responeseErrorMsg, setResponseErrorMsg] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    let source = new URLSearchParams(location.search).get('source');

    const { itemId } = useParams();

    useEffect(() => {
        document.title = 'Edit Item';

        source = new URLSearchParams(location.search).get('source');

        if (source != MYPOSTS_PAGE_NAME && source != MENU_PAGE_NAME) {
            navigate('/Not-found');
            return;
        }

        adminService.getItemEditInfo(token, itemId, user.userId)
            .then(res => {
                if (res.status === 200) {
                    setValues({
                        name: res.item.name,
                        imageUrl: res.item.imageUrl,
                        portionSize: res.item.portionSize,
                        description: res.item.description,
                        price: res.item.price
                    });
                } else if (res.status === 404){
                    navigate('/Not-found')
                    return;
                }
            })
            .catch(error => {
                console.log(error.message);
            });
    }, []);

    const EditItemHandler = (editItem) => {
        adminService.editMenuItem(token, editItem, itemId, user.userId)
            .then(res => {
                if (res.status === 200){
                    navigate(`/Details/${res.itemId}?source=${source}`);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit, setValues } = useFormik({
        initialValues: {
            name: '',
            imageUrl: '',
            portionSize: '',
            description: '',
            price: ''
        },
        validationSchema: editMenuItemSchema,
        onSubmit: EditItemHandler
    })

    //Sets proper class for the input based on existing error
    const classNameValidator = (hasError, validClassName, errorClassName) => {
        return hasError
            ? `${styles[validClassName]} ${styles[errorClassName]}`
            : styles[validClassName]
    }

    //Returns error message
    const getErrorMessage = (errorMessage) => {
        return (<span className={styles['span']}>{errorMessage}</span>)
    }

    return (
        <div id={styles['edit-item']}>
            <div className={styles['center']}>
                <form className={styles['edit-item-form']} onSubmit={handleSubmit} method='POST'>
                    <h1 className={styles['title']}>Edit Item</h1>

                    {responeseErrorMsg &&
                        <p className={styles['err-msg']}>
                            {responeseErrorMsg}
                        </p>
                    }

                    <div className={styles['form-input-container']}>
                        <label className={styles['label']}>Name</label>
                        <input
                            className={classNameValidator(errors.name && touched.name, 'input', 'error')}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            type='text'
                            id="name"
                            placeholder='Enter Item Name'
                        />
                        {(errors.name && touched.name) && getErrorMessage(errors.name)}
                    </div>

                    <div className={styles['form-input-container']}>
                        <label className={styles['label']}>Image Url</label>
                        <input
                            className={classNameValidator(errors.imageUrl && touched.imageUrl, 'input', 'error')}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.imageUrl}
                            type='text'
                            id="imageUrl"
                            placeholder='Enter Image Url'
                        />
                        {(errors.imageUrl && touched.imageUrl) && getErrorMessage(errors.imageUrl)}
                    </div>

                    <div className={styles['form-input-container']}>
                        <label className={styles['label']}>Portion Size</label>
                        <input
                            className={classNameValidator(errors.portionSize && touched.portionSize, 'input', 'error')}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.portionSize}
                            id='portionSize'
                            type='number'
                            placeholder='Enter Portion size'
                        />
                        {(errors.portionSize && touched.portionSize) && getErrorMessage(errors.portionSize)}
                    </div>

                    <div className={styles['form-input-container']}>
                        <label className={styles['label']}>Description</label>
                        <textarea
                            className={classNameValidator(errors.description && touched.description, 'textarea', 'error')}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                            id='description'
                            placeholder='Enter description products separated with comma: Homemade potatoes, Vegetable Oil, Salt'
                        />
                        {(errors.description && touched.description) && getErrorMessage(errors.description)}
                    </div>

                    <div className={styles['form-input-container']}>
                        <label className={styles['label']}>Price</label>
                        <input
                            className={classNameValidator(errors.price && touched.price, 'input', 'error')}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.price}
                            id='price'
                            type='number'
                            placeholder='Enter Price'
                        />
                        {(errors.price && touched.price) && getErrorMessage(errors.price)}
                    </div>

                    <button
                        type="submit" className={styles['submit-btn']}>
                        Edit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditMenuItem;