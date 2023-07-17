import styles from './NumericInputControl.module.css';

import { useState } from 'react';

const NumericInputControl = ({ quantity, setQuantity }) => {

    function handleQuantityDecrement(e) {
        if (quantity > 1) {
            setQuantity(prev => {
                return prev - 1;
            });
        }
    }

    function handleQuantityIncrement(e) {
        if (quantity < 15) {
            setQuantity(prev => {
                return prev + 1;
            })
        }
    }

    return (
        <div id={styles['item--quantity']}>
            <button id={styles['decrement']} onClick={handleQuantityDecrement}> - </button>

            <input
                type="number"
                value={quantity}
                className={styles['inp--quantity']}
                readOnly
                min="1"
                max="15"    
            />

            <button id={styles['increment']} onClick={handleQuantityIncrement}> + </button>
        </div>
    )
}

export default NumericInputControl;