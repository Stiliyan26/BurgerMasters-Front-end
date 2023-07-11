import styles from './Login.module.css';
import FormInput from '../../FormInput/FormInput';

import { useState, useEffect } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import * as authService from '../../../services/authService'

const Login = () => {
    const [inputValues, setInputValues] = useState({
        email: "",
        password: "",
    });

    const [responeseErrorMsg, setResponseErrorMsg] = useState('');

    useEffect(() => {
        document.title = 'Login';
    }, []);

    const { login } = useAuthContext();
    const navigate = useNavigate();

    const inputs = [
        {
            id: 1,
            name: 'email',
            type: 'email',
            placeholder: 'Email',
            errorMessage: "It should be a valid email address!",
            pattern: `^.{4,}@(abv|gmail|outlook|yahoo|hotmail)\.(bg|com|net|org)$`,
            label: 'Email',
            required: true
        },
        {
            id: 2,
            name: 'password',
            type: 'password',
            placeholder: 'Password',
            errorMessage: "Password sholud be 6-20 characters and include at least 1 letter 1 number and 1 special character",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$`,
            label: 'Password',
            required: true
        },
    ];

    const loginSubmitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        authService.login(data)
            .then(res => {
                if (res.status === 200) {
                    const { token } = res;
                    //Gettig the information from the decoded jwt
                    const userInfo = authService.getUserInfo(token);

                    login(userInfo);
                    setResponseErrorMsg('');
                    navigate('/');
                } else if (res.status === 401) {
                    //Unauthorized
                    setResponseErrorMsg(res.errorMessage);
                } else if (res.status === 404) {
                    //NotFound
                    setResponseErrorMsg(res.errorMessage);
                } else if (res.status === 422) {
                    //UnprocessableEntity
                    setResponseErrorMsg(res.errorMessage);
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

    return (
        <div id={styles['login']}>
            <div className={styles['center']}>
                <form className={styles['login-form']} onSubmit={loginSubmitHandler} method='POST'>
                    <h1 className={styles['title']}>Login</h1>

                    {responeseErrorMsg &&
                        <p className={styles['err-msg']}>
                            {responeseErrorMsg}
                        </p>
                    }

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

export default Login;