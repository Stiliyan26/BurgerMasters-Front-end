import styles from './Orders.module.css';

const Orders = () => {
    return (
        <div id={styles['orders-container']}>
            <section className={styles['order-info-row']}>
                <p className={styles['order-column-name']}>Order Id</p>
                <p className={styles['order-column-name']}>Username</p>
                <p className={styles['order-column-name']}>Order date</p>
                <p className={styles['order-column-name']}>Total price</p>
                <p className={styles['order-column-name']}>Status</p>
            </section>

            <section className={styles['order-info']}>
                <p className={styles['order-id']}>4bb33b23-4f4e-4833-a073-48707e63825c</p>
                <p className={styles['order-username']}>Stiliyan26</p>
                <p className={styles['order-date']}>December 15, 2023, at 4:10:45 PM</p>
                <p className={styles['order-price']}>122.12 lv.</p>
                <button className={styles['order-status']}>Pending...</button>
                <button className={styles['order-status']}>Details</button>
            </section>

            <section className={styles['order-info']}>
                <p className={styles['order-id']}>ebf7701b-e24f-4897-877d-aa09e2ccc2fd</p>
                <p className={styles['order-username']}>Pepsi13</p>
                <p className={styles['order-date']}>January 15, 2023, at 3:30:45 PM</p>
                <p className={styles['order-price']}>132.42 lv.</p>
                <button className={styles['order-status']}>Pending..</button>
                <button className={styles['order-status']}>Details</button>
            </section>
        </div>
    )
}

export default Orders;