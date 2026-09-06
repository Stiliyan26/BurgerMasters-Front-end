import Orders from "../Orders/Orders";

import { PENDING_ORDERS_NAME } from '../../../../Constants/globalConstants';

const PendingOrders = () => {
    return <Orders pageType={PENDING_ORDERS_NAME}/>
}

export default PendingOrders;