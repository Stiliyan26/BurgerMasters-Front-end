import styles from './OrderCard.module.css';

const OrderCard = ({order}) => {
    return (
        <section className={styles['order-info']}>
            <p className={styles['order-id']}>{order.orderId}</p>
            <p className={styles['order-username']}>{order.username}</p>
            <p className={styles['order-date']}>{order.orderDate}</p>
            <p className={styles['order-address']}>{order.address}</p>
            <p className={styles['order-price']}>{order.totalPrice} lv.</p>
            <button className={styles['order-status']}>Pending..</button>
            <button className={styles['order-status']}>Details</button>
        </section>
    )
}

export default OrderCard;