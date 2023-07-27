import styles from './Orders.module.css';

import OrderCard from '../OrderCart/OrderCard';

import * as orderService from '../../../../services/orderService';
import * as globalConstants from '../../../../Constants/globalConstants';

import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Orders = ({ pageType }) => {
    const [orders, setOrders] = useState();

    const { token, user } = useAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        document.title = pageType;

        const isPending = pageType === globalConstants.PENDING_ORDERS_NAME
            ? true
            : false;

        orderService.allOrdersByStatus(token, user.userId, isPending)
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
                    handleOrderByAction={handleOrderByAction}
                    pageType={pageType}
                />
            );
        });
    }

    function handleOrderByAction(orderId, action) {
        const fetchData = async () => {
            try {
                let response;

                if (action === globalConstants.ACCEPT_ACTION_NAME) {
                    response = await orderService.acceptOrder(token, user.userId, orderId);
                } else if (action === globalConstants.UNACCEPT_ACTION_NAME) {
                    response = await orderService.unacceptOrder(token, user.userId, orderId);
                } else if (action === globalConstants.DECLINE_ACTION_NAME) {
                    response = await orderService.declineOrder(token, user.userId, orderId);
                }

                if (response.status === 200) {
                    setOrders(prev =>
                        prev.filter(order => order.orderId !== orderId));
                } else {
                    navigate('/Not-found');
                    return;
                }

            } catch (error) {
                console.log(error.message);
            }
        }

        fetchData();
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