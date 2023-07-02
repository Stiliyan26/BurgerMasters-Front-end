import styles from './Login.module.css';
import FormInput from '../FormInput/FormInput';

import { useRef, useState } from 'react';


const Login = () => {
    const [inputValues, setInputValues] = useState({
        email: "",
        password: "",
    });

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

        console.log("data: ");
        console.log(data);

        fetch("https://localhost:7129/api/Account/Login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(resData => resData.json())
            .then(result => {
                console.log("result login");
                console.log(result);
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