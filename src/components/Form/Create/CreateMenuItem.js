import styles from './CreateMenuItem.module.css';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFormik } from "formik";
import { createMenuItemSchema } from '../../../schemas/index'

const CreateMenuItem = () => {
    useEffect(() => {
        document.title = 'Create Item';
    }, []);

    //const [inputValues, setInputValues] = useState({});
    //const [responeseErrorMsg, setResponseErrorMsg] = useState('');

    const navigate = useNavigate();

    const CreateItemHandler = (values, actions) => {
        console.log(values)
    }

    const { values, errors, touched, isSubmitting ,handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: '',
            imageUrl: '',
            itemType: '',
            portionSize: '',
            description: '',
            price: ''
        },
        validationSchema: createMenuItemSchema,
        onSubmit: CreateItemHandler
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
        <div id={styles['create-item']}>
            <div className={styles['center']}>
                <form className={styles['create-item-form']} onSubmit={handleSubmit} method='POST'>
                    <h1 className={styles['title']}>Create Item</h1>

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
                        <label className={styles['label']}>Item Type</label>
                        <select
                        className={classNameValidator(errors.itemType && touched.itemType, 'select', 'error')}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.itemType}
                            id='itemType'
                        >
                            <option value="" disabled>Select item</option>
                            <option className='option' value="Burger">Burger</option>
                            <option className='option' value="Drink">Drink</option>
                            <option className='option' value="Fries">Fries</option>
                        </select>

                        {(errors.itemType && touched.itemType) && getErrorMessage(errors.itemType)}
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
                            placeholder='Enter description products separated with comma and space: (salt, ketchup, meat)'
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
                        type="submit"
                        disabled={isSubmitting} 
                        className={styles['submit-btn']}>
                    Create</button>
                </form>
            </div>
        </div>
    )
}

export default CreateMenuItem;