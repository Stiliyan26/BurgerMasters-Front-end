import styles from './OrderCard.module.css';

import * as globalConstants from '../../../../Constants/globalConstants';
import { handleSmoothRedirection } from '../../../../services/navigationServices';

import { Link } from 'react-router-dom';

const OrderCard = (
    { order, index, handleOrderByAction, pageType }) => {

    function handleStatus(action) {
        handleOrderByAction(order.orderId, action);
    }

    const statusButton = () =>
        pageType === globalConstants.PENDING_ORDERS_NAME
            ? (
                <div className={styles['order-btns']}>
                    <button 
                        onClick={() => handleStatus(globalConstants.ACCEPT_ACTION_NAME)} 
                        className={styles['accept']}>
                        Accept
                    </button>

                    <button 
                        onClick={() => handleStatus(globalConstants.DECLINE_ACTION_NAME)} 
                        className={styles['decline']}>
                        Decline
                    </button>
                </div>
            )
            : <button 
                onClick={() => handleStatus(globalConstants.UNACCEPT_ACTION_NAME)} 
                className={styles['unaccept']}>
                Unaccepted
            </button>

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

            {pageType && statusButton()}

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