import styles from './Cart.module.css';

import CartItemCard from '../CartItemCard/CartItemCard';

import * as cartService from '../../../services/cartService';
import * as orderService from '../../../services/orderService';

import { useAuthContext } from '../../../contexts/AuthContext';
import { useCartContext } from '../../../contexts/CartContext';


import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [orderTotalPrice, setOrderTotalPrice] = useState('');

    const { token, user } = useAuthContext();
    const { setCartItemsCount } = useCartContext();

    const navigate = useNavigate();
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

    const getOrderPrice = useMemo(() => {
        return cartItems
            .reduce((totalPrice, item) =>
                totalPrice + (item.price * item.quantity), 0)
            .toFixed(2);
    }, [cartItems]);

    useEffect(() => {
        setOrderTotalPrice(getOrderPrice);
    }, [cartItems]);

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
                    navigate('Not-found');
                }
            })
            .catch(error => {
                console.log(error.message);
                navigate('/Not-found');
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
                    navigate('/MyOrders')
                }

                if (cleanUpCartPromise.status === 200) {
                    console.log("All cart items removed");
                    setCartItems([]);
                    setCartItemsCount(0);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    const returnProperBtnClass = () => {
        return cartItems.length === 0
            ? `${styles['cant-order']}`
            : `${styles['order-btn']}`
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

                <button 
                    onClick={handleOrder} 
                    className={returnProperBtnClass()}
                    disabled={cartItems.length === 0}
                >
                    Order
                </button>
            </section>
        </div>
    )
}

export default Cart;