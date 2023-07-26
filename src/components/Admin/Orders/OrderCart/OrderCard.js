import styles from './OrderCard.module.css';

import { handleSmoothRedirection } from '../../../../services/navigationServices';

import { Link } from 'react-router-dom';

const OrderCard = ({ order, index }) => {
    return (
        <section
            style={{ animationDelay: `${index * 0.2}s`, backgroundPosition: `50% ${30 + index * 10}%`, }}
            className={styles['order-info']}
        >
            <p className={styles['order-id']}>{order.orderId}</p>
            <p className={styles['order-username']}>{order.username}</p>
            <p className={styles['order-date']}>{order.orderDate}</p>
            <p className={styles['order-address']}>{order.address}</p>
            <p className={styles['order-price']}>{order.totalPrice.toFixed(2)} lv.</p>
            <button className={styles['order-status']}>Pending..</button>
            <Link
                to={`/OrderDetails/${order.orderId}`}
                onClick={handleSmoothRedirection}
                className={styles['order-details']}
            >
                Details
            </Link>
        </section>
    )
}

export default OrderCard;