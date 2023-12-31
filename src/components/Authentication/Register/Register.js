import styles from './Register.module.css';

import FormInput from '../FormInput/FormInput';

import { useAuthContext } from '../../../contexts/AuthContext'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as authService from '../../../services/authService';

const Register = () => {
    const [inputValues, setInputValues] = useState({
        username: "",
        email: "",
        address: "",
        birthdate: "",
        password: "",
        confirmPassword: ""
    });
    const [responeseErrors, setResponseErrors] = useState([]);

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
            name: 'address',
            type: 'text',
            placeholder: 'Address',
            errorMessage: "Address is required!",
            label: 'Address',
            required: true
        },
        {
            id: 4,
            name: 'birthdate',
            type: 'date',
            placeholder: 'Birthdate',
            errorMessage: "Birthdate is required!",
            label: 'Birthdate',
            required: true
        },
        {
            id: 5,
            name: 'password',
            type: 'password',
            placeholder: 'Password',
            errorMessage: "Password sholud be 6-20 characters and include at least 1 letter 1 number and 1 special character",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$`,
            label: 'Password',
            required: true
        },
        {
            id: 6,
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
                if (res.status === 200) {
                    const { token } = res;
                    //Gettig the information from the decoded jwt
                    const userInfo = authService.getUserInfo(token);
                    
                    login(userInfo);
                    setResponseErrors([]);
                    navigate('/Menu/Burgers');
                } else if (res.status === 409) {
                    //Conflict
                    setResponseErrors(res.errors);
                } else if (res.status === 422) {
                    //UnprocessableEntity
                    setResponseErrors(res.errorMessage)
                }
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

    const errorMessage =
        Array.isArray(responeseErrors)
            ? responeseErrors.map((err) => (
                <p key={err.code} className={styles['err-msg']}>
                    {err.description}
                </p>))
            : (<p className={styles['err-msg']}>
                    {responeseErrors}
                </p>)

    return (
        <div id={styles['register']}>
            <div className={styles['center']}>
                <form className={styles['register-form']} onSubmit={registerSubmitHandler} method='POST'>
                    <h1 className={styles['title']}>Register</h1>

                    {errorMessage}

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