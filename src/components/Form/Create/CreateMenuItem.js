import styles from './CreateMenuItem.module.css';
import FormInput from '../../FormInput/FormInput';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateMenuItem = () => {
    const [inputValues, setInputValues] = useState({
        name: "",
        itemType: "",
        portionSize: "",
        description: "",
        price: ""
    });

    //const [responeseErrorMsg, setResponseErrorMsg] = useState('');

    useEffect(() => {
        document.title = 'Create Item';
    }, []);

    const navigate = useNavigate();

    const inputs = [
        {
            id: 1,
            name: 'name',
            type: 'text',
            placeholder: 'Name',
            errorMessage: "Item name should be between 5 and 30 characters and include only upper and lower case letters!",
            pattern: `^.{5,30}$`,
            label: 'Item name',
            required: true
        },
        {
            id: 2,
            name: 'itemType',
            type: 'select',
            label: 'Item type',
            options: [
                { value: 'Burger', label: 'Burger' },
                { value: 'Drink', label: 'Drink' },
                { value: 'Fries', label: 'Fries' }
            ],
            required: true
        },
        {
            id: 3,
            name: 'portionSize',
            type: 'text',
            placeholder: 'Portion size in grams/ml',
            errorMessage: 'Portion should be between 200 and 1000 grams/ml',
            pattern: `^(?:[1-9][0-9]{2}|1000)$`,
            label: 'Portion size',
            required: true
        },
        {
            id: 4,
            name: 'description',
            type: 'textarea',
            placeholder: 'Separate with comma and space - Salt, Pepper, Tomato',
            errorMessage: 'Description should be between 10 and 100 characters long',
            pattern: `^.{5,30}$`,
            label: 'Description',
            required: true
        },
        {
            id: 5,
            name: 'price',
            type: 'text',
            placeholder: 'Price',
            errorMessage: 'Price must be a positvie number',
            label: 'Price',
            required: true
        },
    ];

    const CreateItemHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        console.log(data);
    }

    const onChange = (e) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div id={styles['create-item']}>
            <div className={styles['center']}>
                <form className={styles['create-item-form']} onSubmit={CreateItemHandler} method='POST'>
                    <h1 className={styles['title']}>Create Item</h1>

                    {inputs.map(input => {
                        return <FormInput
                            key={input.id}
                            {...input}
                            value={inputValues[input.name]}
                            onChange={onChange}
                        />
                    })}

                    <button className={styles['submit-btn']}>Create</button>
                </form>
            </div>
        </div>
    )
}

export default CreateMenuItem;