import { useState } from 'react';
import styles from './FormInput.module.css'

const FormInput = (props) => {
    const [focused, setFocused] = useState(false);

    const { label, errorMessage, onChange, id, ...inputProps} = props;

    const handleFocus = (e) => {
        setFocused(true);
    }

    return (
        <div className={styles['form-input-container']}>
            <label className={styles['label']}>{label}</label> 
            <input className={styles['input']}
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={() => {
                    inputProps.name === "confirmPassword" && setFocused(true)
                }}
                focused={focused.toString()}
            />
            <span className={styles['span']}>{errorMessage}</span>
        </div>
    )
}

export default FormInput;