import styles from './Cart.module.css';

import NumericInputControl from '../../components/Details/NumericInputControl/NumericInputControl';

import { Fragment, useEffect } from 'react';

import { Link } from 'react-router-dom';

const Cart = () => {

    useEffect(() => {
        document.title = 'Cart';
    }, []);

    return (
        <div id={styles['cart-wrapper']}>
            <section id={styles['total-table']}>
                <p className={styles['total-title']}>Total</p>
                <p className={styles['total-price']}>56.12 lv.</p>
            </section>
            <section id={styles['cart-container']}>
                <section id={styles['cart-row']}>
                    <p className={styles['cart-column-name']}>Item</p>
                    <p className={styles['cart-column-name']}>Name</p>
                    <p className={styles['cart-column-name']}>Price</p>
                    <p className={styles['cart-column-name']}>Quantity</p>
                    <p className={styles['cart-column-name']}>Sum</p>
                </section>

                <section id={styles['item-info']}>
                    <div className={styles['img-container']}>
                        <img className={styles['item-img']} src='/images/BurgerMenu/American.webp' />
                    </div>


                    <h2 className={styles['item-name']}>American Cheese Burger (350g)</h2>

                    <p className={styles['item-price']}> 14.99 lv.</p>

                    <div className={styles['quantity-container']}>
                        <NumericInputControl quantity={1} />
                    </div>

                    <p className={styles['total']}>24.25 lv</p>

                    <Link className={styles["spinning-x"]}>
                        <i className="fa-regular fa-xmark"></i>
                    </Link>
                </section>

                <section id={styles['item-info']}>
                    <div className={styles['img-container']}>
                        <img className={styles['item-img']} src='/images/BurgerMenu/JuicyLucy.webp' />
                    </div>

                    <h2 className={styles['item-name']}> The Juicy Lucy (400g)</h2>

                    <p className={styles['item-price']}> 14.99 lv.</p>

                    <div className={styles['quantity-container']}>
                        <NumericInputControl quantity={3} />
                    </div>

                    <p className={styles['total']}>24.25 lv</p>

                    <Link className={styles["spinning-x"]}>
                        <i className="fa-regular fa-xmark"></i>
                    </Link>
                </section>

                <section id={styles['item-info']}>
                    <div className={styles['img-container']}>
                        <img className={styles['item-img']} src='/images/BurgerMenu/RustySavage.webp' />
                    </div>


                    <h2 className={styles['item-name']}> Rusty Savage (600g)</h2>

                    <p className={styles['item-price']}>23.12 lv.</p>

                    <div className={styles['quantity-container']}>
                        <NumericInputControl quantity={2} />
                    </div>

                    <p className={styles['total']}>24.25 lv</p>

                    <Link to="#" className={styles["spinning-x"]}>
                        <i className="fa-regular fa-xmark"></i>
                    </Link>
                </section>
            </section>
        </div>
    )
}

export default Cart;