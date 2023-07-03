import styles from './Register.module.css';

import FormInput from '../FormInput/FormInput';

import { useAuthContext } from '../../../contexts/AuthContext'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as authService from '../../../services/authService'

const Register = () => {
    const [inputValues, setInputValues] = useState({
        username: "",
        email: "",
        birthday: "",
        password: "",
        confirmPassword: ""
    });

    useEffect(() => {
        document.title = 'Register';
    }, []);

    const { login } = useAuthContext();
    const navigate = useNavigate();

    const inputs = [
        {
            id: 1,
            name: 'username',
            type: 'text',
            placeholder: 'Username',
            errorMessage: "Username should be 5-16 characters and shouldn't include any special character!",
            pattern: `^[A-Za-z0-9]{5,16}$`,
            label: 'Username',
            required: true
        },
        {
            id: 2,
            name: 'email',
            type: 'email',
            placeholder: 'Email',
            errorMessage: "It should be a valid email address!",
            pattern: `^.{4,}@(abv|gmail|outlook|yahoo|hotmail)\.(bg|com|net|org)$`,
            label: 'Email',
            required: true
        },
        {
            id: 3,
            name: 'birthday',
            type: 'date',
            placeholder: 'Birthday',
            label: 'Birthday',
        },
        {
            id: 4,
            name: 'password',
            type: 'password',
            placeholder: 'Password',
            errorMessage: "Password sholud be 6-20 characters and include at least 1 letter 1 number and 1 special character",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$`,
            label: 'Password',
            required: true
        },
        {
            id: 5,
            name: 'confirmPassword',
            type: 'password',
            placeholder: 'Confirm Password',
            errorMessage: "Passwords don't match!",
            pattern: inputValues.password,
            label: 'Confirm Password',
            required: true
        }
    ];

    const registerSubmitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        authService.register(data)
            .then(res => {
                console.log(res);
                login(res);
                navigate('/');
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    const onChange = (e) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div id={styles['register']}>
            <div className={styles['center']}> 
                <form className={styles['register-form']} onSubmit={registerSubmitHandler} method='POST'>
                    <h1 className={styles['title']}>Register</h1>
                    {inputs.map(input => {
                        return <FormInput 
                            key={input.id}
                            {...input}
                            value={inputValues[input.name]}
                            onChange={onChange}
                        /> 
                    })}
                    
                    <button className={styles['submit-btn']}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Register;