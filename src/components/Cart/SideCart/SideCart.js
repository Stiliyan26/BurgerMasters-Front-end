import styles from './SideCart.module.css';

import * as cartService from '../../../services/cartService';
import { getPortionMeasure } from '../../../services/menuItemService';
import { handleSmoothRedirection } from '../../../services/navigationServices';

import { useAuthContext } from '../../../contexts/AuthContext';
import { useCartContext } from '../../../contexts/CartContext';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SideCart = ({ isSideCartOpen, handleShowSideCart }) => {
    const [sideCartItems, setSideCartItems] = useState([]);
    const [isFullHeight, setIsFullHeight] = useState(false);

    const { token, user } = useAuthContext();
    const { cartItemsCount, setCartItemsCount } = useCartContext();

    useEffect(() => {
        cartService.getAllCartItems(token, user.userId)
            .then(res => {
                if (res.status === 200) {
                    console.log("changed");
                    setSideCartItems(res.cartItems);
                }
            })
            .catch(error => {
                console.log(error);
            })

        const handleScroll = () => {
            setIsFullHeight(window.scrollY > 0);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [cartItemsCount])

    const imgSrc = (item) => `/images/${item.itemType}Menu/${item.imageUrl}`;

    const sideCartItemsContent = () => {
        return sideCartItems
            .map(item => (
                <div key={item.id} className={styles['side-cart-item']}>
                    <img className={styles['side-cart-item-img']} src={imgSrc(item)} alt="item" />

                    <div className={styles['column-container']}>
                        <div className={styles['side-cart-item-name']}>
                            {item.name} ({item.portionSize}{getPortionMeasure(item.itemType)})
                        </div>
                        <div className={styles['side-cart-item-quantity']}>x{item.quantity}</div>
                    </div>

                    <Link onClick={(e) => handleRemoveItem(item.id, item.quantity, e)} className={styles["spinning-x"]}>
                        <i id={styles['spinning-icon']} className="fa-regular fa-xmark"></i>
                    </Link>
                </div>
            ));
    }

    const totalPrice = () => {
        const totalPrice = sideCartItems
            .reduce((total, item) => total + (item.price * item.quantity), 0);

        return totalPrice.toFixed(2);
    }

    const handleRemoveItem = (itemIdToDelete, itemQuantity, e) => {
        e.preventDefault();

        cartService.removeCartItem(token, itemIdToDelete, user.userId)
            .then(res => {
                if (res.status === 200) {
                    setSideCartItems(prevCartItems =>
                        prevCartItems.filter(item => item.id !== itemIdToDelete)
                    );

                    setCartItemsCount(prevCount => prevCount - itemQuantity);
                } else if (res.status === 404) {
                    console.log("Item not found");
                }
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    function onClose(e) {
        e.preventDefault();

        handleShowSideCart(false);
    }

    return (
        <div
            className={`${styles['side-cart-container']} ${isFullHeight ? styles['full-height'] : ''} ${isSideCartOpen ? '' : styles['closed']}`}
            style={{ right: isSideCartOpen ? '0' : '-350px' }}
        >
            <Link onClick={onClose} className={styles["closing-side-cart"]}>
                <i id={styles['spinning-icon']} className="fa-regular fa-xmark"></i>
            </Link>

            <div className={styles['side-cart-content']}>
                {sideCartItemsContent()}
            </div>

            <div className={styles['side-cart-total']}>
                <p className={styles['total-price']}>Total: {totalPrice()} lv.</p>

                <Link to="/Cart" onClick={handleSmoothRedirection} className={styles['checkout-btn']}>
                    CHECKOUT
                </Link>
            </div>
        </div>
    );
};

export default SideCart;
