import styles from './OrderDetails.module.css';

import OrderDetailsItemCard from '../OrderDetailsItemCard/OrderDetailsItemCard';

import * as orderService from '../../../../services/orderService';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../../../contexts/AuthContext';

const OrderDetails = () => {
    const [order, setOrder] = useState({
        address: '',
        orderDate: '',
        orderId: '',
        totalPrice: 0,
        username: '',
        menuItems: []
    });

    const { token, user } = useAuthContext();

    const { orderId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Order Details';

        orderService.getOrderById(token, user.userId, orderId)
            .then(res => {
                if (res.status === 200) {
                    setOrder(res.orderInfo);
                } else if (res.status === 404) {
                    navigate('/Not-found');
                    return;
                }
            })
            .catch(error => {
                console.log(error.message);
            })
    }, []);

    const getOrderHeaderTitles = () => {
        const orderHeaderInfo = [
            `Sender - ${order.username}`,
            `Order date - ${order.orderDate}`,
            `Total price - ${order.totalPrice} lv.`,
            `Address - ${order.address}`
        ]

        return orderHeaderInfo.map((orderTitle, index) => (
            <h2
                key={index}
                className={`${styles['order--sender']} ${styles['order--common']}`}
                style={{ animationDelay: `${index * 0.2}s`}}
            >
                {orderTitle}
            </h2>
        ));
    }

    const getAllOrderMenuItems = () => {
        return order?.menuItems
            .map((menuItem, index) => (
                <OrderDetailsItemCard 
                    key={index}
                    menuItem={menuItem}
                    index={index}
                />
            ));
    }

    return (
        <div id={styles['order-details-container']}>
            <section className={styles['order-header']}>
                {order && getOrderHeaderTitles()}
            </section>
            
            <h1 className={styles['ordered-items-title']}>Ordered Items</h1>

            <section className={styles['order-menu-items']}>
                {order && getAllOrderMenuItems()}
            </section>
        </div>
    )
}

export default OrderDetails;