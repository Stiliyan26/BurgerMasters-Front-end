import styles from './Cart.module.css';

import CartItemCard from './CartItemCard/CartItemCard';

import * as cartService from '../../services/cartService';
import * as orderService from '../../services/orderService';

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

        cartService.getAllCartItems(token, user.userId)
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
        return cartItems.map((item, index) => {
            return <CartItemCard
                key={item.id}
                item={item}
                index={index}
                handleRemoveItem={handleRemoveItem}
                updateQuantity={handleUpdateQuantity}
            />
        })
    }

    const handleRemoveItem = (itemIdToDelete) => {
        cartService.removeCartItem(token, itemIdToDelete, user.userId)
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

    function handleOrder() {
        const orderDate = orderService.getOrderDateToString();
        const orderPrice = Number(orderTotalPrice);
        const menuItems = cartItems.map(ci => ({ menuItemId: ci.id, quantity: ci.quantity }))

        const sentOrderPromise = orderService.sentOrder(token, orderDate, user.userId, menuItems, orderPrice);
        const cleanUpCartPromise = cartService.cleanUpCart(token, user.userId);

        Promise.all([sentOrderPromise, cleanUpCartPromise])
            .then(([sentOrderRes, cleanUpCartPromise]) => {

                if (sentOrderRes.status === 200) {
                    console.log("Order sent!");
                }
                
                if (cleanUpCartPromise.status === 200) {
                    console.log("All cart items removed");
                    setCartItems([]);
                }
            })
            .catch(error => {
                console.log(error);
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

                <Link onClick={handleOrder} className={styles['order-btn']}>
                    Order
                </Link>
            </section>
        </div>
    )
}

export default Cart;