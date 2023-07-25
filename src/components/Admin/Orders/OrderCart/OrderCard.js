import styles from './OrderCard.module.css';

import { Link } from 'react-router-dom';

const OrderCard = ({order}) => {
    return (
        <section className={styles['order-info']}>
            <p className={styles['order-id']}>{order.orderId}</p>
            <p className={styles['order-username']}>{order.username}</p>
            <p className={styles['order-date']}>{order.orderDate}</p>
            <p className={styles['order-address']}>{order.address}</p>
            <p className={styles['order-price']}>{order.totalPrice} lv.</p>
            <button className={styles['order-status']}>Pending..</button>
            <Link to={`/OrderDetails/${order.orderId}`} className={styles['order-details']}>
                Details
            </Link>
        </section>
    )
}

export default OrderCard;