import styles from './OrderDetails.module.css';

import * as orderService from '../../../../services/orderService';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../../../contexts/AuthContext';

const OrderDetails = () => {
    const [order, setOrder] = useState();

    const { token, user } = useAuthContext();
    const { orderId } = useParams();
    
    useEffect(() => {
        document.title = 'Order Details';

        orderService.getOrderById(token, user.userId, orderId)
            .then(res => {
                if (res.status === 200){
                    console.log(res.orderInfo);
                    setOrder(res.orderInfo);
                }
            })
            .catch(error => {
                console.log(error.message);
            })
    }, []);

    return (
        <div>
            Order details!
        </div>
    )
}

export default OrderDetails;