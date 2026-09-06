import styles from './ChatInput.module.css';

import { useState } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';

import * as reviewService from '../../../services/reviewService';

import { useFormik } from 'formik';
import { reviewMessageItemSchema } from '../../../schemas/index';

const ChatInput = ({sendMessage}) => {
    const { user } = useAuthContext();

    const [message, setMessage] = useState('');

    const onSubmitReview = () => {
        const isUserProvided = user.username && user.username !== '';
        const isMessageProvided = message && message !== '';

        if (isUserProvided && isMessageProvided) {
            const sentDate = reviewService.getMessageSentDateToString();

            sendMessage(user.username, user.userId, message, sentDate);
            setMessage('');
            values.message = ''
        }
        else {
            alert(`Please enter a message, ${user.username}.`);
        }
    }

    const onMessageUpdate = (e) => {
        setMessage(e.target.value);
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            message: ''
        },
        validationSchema: reviewMessageItemSchema,
        onSubmit: onSubmitReview,
    })
    

    const classNameValidator = (hasError, validClassName, errorClassName) => {
        return hasError
            ? `${styles[validClassName]} ${styles[errorClassName]}`
            : styles[validClassName]
    }

    const getErrorMessage = (errorMessage) => {
        return (<span className={styles['span']}>{errorMessage}</span>)
    }

    return (
        <form onSubmit={handleSubmit} className={styles['chat-inp-form']} method='POST'>
            <div className={styles['chat-inp-container']}>
                <input
                    className={classNameValidator(errors.message && touched.message, 'chat-inp', 'error')}
                    type="text"
                    id="message"
                    name="message"
                    onChange={(e) => {
                        onMessageUpdate(e);
                        handleChange(e);
                    }}
                    onBlur={handleBlur}
                    value={values.message}
                    placeholder='Share an opinion...'
                 />

                {(errors.message && touched.message) && getErrorMessage(errors.message)}
            </div>
            
            <button
             className={styles['submit']}
             type="submit"
            >
                Submit
            </button>
        </form>
    )
}

export default ChatInput;