import styles from './Cart.module.css';

import CartItemCard from './CartItemCard/CartItemCard';

import * as customerService from '../../services/customerService';
import { useAuthContext } from '../../contexts/AuthContext';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const { token, user } = useAuthContext();

    useEffect(() => {
        document.title = 'Cart';

        customerService.getAllCartItems(token, user.userId)
            .then(res => {
                if (res.status === 200) {
                    setCartItems(res.cartItems);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }, []);


    const getAllCartItems = () => {
        return cartItems.map(item => {
            return <CartItemCard key={item.id} item={item}/>
        })
    }

    const getOrderPrice = () => {
        return cartItems.reduce((totalPrice, item) => totalPrice + item.price, 0);
    }

    return (
        <div id={styles['cart-wrapper']}>
            <section id={styles['cart-container']}>
                <section id={styles['cart-row']}>
                    <p className={styles['cart-column-name']}>Item</p>
                    <p className={styles['cart-column-name']}>Name</p>
                    <p className={styles['cart-column-name']}>Price</p>
                    <p className={styles['cart-column-name']}>Quantity</p>
                    <p className={styles['cart-column-name']}>Sum</p>
                </section>

                {cartItems && getAllCartItems()}
            </section>

            <section id={styles['total-table']}>
                <p className={styles['total-title']}>Total payment</p>

                <div className={styles['total-row']}>
                    <p className={styles['total-price--title']}>Total:</p>
                    <p className={styles['total-price']}>{getOrderPrice()} lv.</p>
                </div>

                <Link className={styles['order-btn']}>
                    Order
                </Link>
            </section>
        </div>
    )
}

export default Cart;