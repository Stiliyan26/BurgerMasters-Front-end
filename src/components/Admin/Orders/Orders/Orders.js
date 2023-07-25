import styles from './Orders.module.css';

import OrderCard from '../OrderCart/OrderCard';

import * as orderService from '../../../../services/orderService';

import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../../contexts/AuthContext';

const Orders = () => {
    const [pendingOrders, setPendingOrders] = useState(); 

    const { token, user } = useAuthContext();

    useEffect(() => {
        orderService.getAllPendingOrders(token, user.userId)
            .then(res => {
                if (res.status === 200){
                    setPendingOrders(res.orders);
                }
            })
            .catch(error => {
                console.log(error.message);
            })
    }, []);

    const allOrders = () => {
        return pendingOrders.map(order => {
            return <OrderCard key={order.orderId} order={order}/>
        })
    }

    return (
        <div id={styles['orders-container']}>
            <section className={styles['order-info-row']}>
                <p className={styles['order-column-name']}>Order Id</p>
                <p className={styles['order-column-name']}>Username</p>
                <p className={styles['order-column-name']}>Order date</p>
                <p className={styles['order-column-name']}>Address</p>
                <p className={styles['order-column-name']}>Total price</p>
                <p className={styles['order-column-name']}>Status</p>
            </section>
            
            {pendingOrders && allOrders()}
        </div>
    )
}

export default Orders;