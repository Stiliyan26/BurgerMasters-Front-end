import Orders from "../Orders/Orders";

import { ORDER_HISTORY_NAME } from '../../../../Constants/globalConstants';

const OrderHistory = () => {
    return <Orders pageType={ORDER_HISTORY_NAME}/>
}

export default OrderHistory;