import styles from './Cart.module.css';

import CartItemCard from './CartItemCard/CartItemCard';

import * as customerService from '../../services/customerService';
import { useAuthContext } from '../../contexts/AuthContext';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [orderTotalPrice, setOrderTotalPrice] = useState('');

    const { token, user } = useAuthContext();
    //Load data
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
    
    useEffect(() => {
        getOrderPrice();
    }, [cartItems]);

    const getOrderPrice = () => {
        const totalOrderPrice = cartItems.reduce(
            (totalPrice, item) => totalPrice + (item.price * item.quantity), 0);

        setOrderTotalPrice(totalOrderPrice.toFixed(2));
    }

    const handleUpdateQuantity = (itemId, newQuantity) => {
        const updatedCartItems = cartItems
            .map((item) =>
                item.id === itemId 
                ? { ...item, quantity: newQuantity } 
                : item
        );
    
        setCartItems(updatedCartItems);
      };

    const getAllCartItems = () => {
        return cartItems.map(item => {
            return <CartItemCard
                key={item.id}
                item={item}
                handleRemoveItem={handleRemoveItem}
                updateQuantity={handleUpdateQuantity}
            />
        })
    }

    const handleRemoveItem = (itemIdToDelete) => {
        customerService.removeCartItem(token, itemIdToDelete, user.userId)
            .then(res => {
                if (res.status === 200) {
                    setCartItems(prevCartItems =>
                        prevCartItems.filter(item => item.id !== itemIdToDelete));
                } else if (res.status === 404) {
                    console.log("Item not found");
                }
            })
            .catch(error => {
                console.log(error.message);
            });
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
                    <p className={styles['total-price']}>{orderTotalPrice} lv.</p>
                </div>

                <Link className={styles['order-btn']}>
                    Order
                </Link>
            </section>
        </div>
    )
}

export default Cart;