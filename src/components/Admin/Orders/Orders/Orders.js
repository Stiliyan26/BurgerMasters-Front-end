import styles from './Orders.module.css';

import OrderCard from '../OrderCart/OrderCard';

import * as orderService from '../../../../services/orderService';
import { PENDING_ORDERS_NAME } from '../../../../Constants/globalConstants';

import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../../contexts/AuthContext';

const Orders = ({ pageType }) => {
    const [orders, setOrders] = useState();

    const { token, user } = useAuthContext();

    useEffect(() => {
        document.title = pageType;

        const isPending = pageType === PENDING_ORDERS_NAME
            ? true
            : false;

        orderService.AllOrdersByStatus(token, user.userId, isPending)
            .then(res => {
                if (res.status === 200) {
                    setOrders(res.orders);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const allOrders = () => {
        return orders.map((order, index) => {
            return (
                <OrderCard
                    key={order.orderId}
                    order={order}
                    index={index}
                    handleAcceptOrder={handleAcceptOrder}
                    pageType={pageType}
                />
            );
        });
    }

    function handleAcceptOrder(orderId) {
        orderService.acceptOrder(token, user.userId, orderId)
            .then(res => {
                if (res.status === 200) {
                    setOrders(prev =>
                        prev.filter(order => order.orderId !== orderId)
                    )
                }
            })
            .catch(error => {
                console.log(error.message);
            });
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

            {orders && allOrders()}
        </div>
    )
}

export default Orders;