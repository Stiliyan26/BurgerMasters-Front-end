import styles from './Login.module.css';
import FormInput from '../FormInput/FormInput';

import { useState, useEffect } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import * as authService from '../../../services/authService'
import jwtDecode from 'jwt-decode';

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
                if (res.status === 200){
                    const { token } = res;
                    const decodedToken = jwtDecode(token);
                    
                    const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
                    const username = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
                    const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
                    const birthday = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/dateofbirth'];
                    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
                    const jwtExpireDate = decodedToken['exp'];

                    const userInfo = { userId, username, email, birthday, role, token, jwtExpireDate };

                    login(userInfo);
                    setResponseErrorMsg('');
                    navigate('/');
                } else if (res.status === 401) {
                    //Unauthorized
                    setResponseErrorMsg(res.errorMessage);
                } else if (res.status === 404) {
                    //NotFound
                    setResponseErrorMsg(res.errorMessage);
                } else if (res.status === 422){
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

                    { responeseErrorMsg && 
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