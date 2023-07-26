import styles from './OrderDetailsItemCard.module.css';

import { getPortionMeasure } from '../../../../services/menuItemService';

const OrderDetailsItemCard = ({ menuItem }) => {
    const getImageSource = () => `/images/${menuItem.itemType}Menu/${menuItem.imageUrl}`;

    return (
        <div id={styles['menu-item-container']}>
            <img className={styles['item-image']} src={getImageSource()} alt={menuItem.name} />

            <h1>{menuItem.name}</h1>
            <h1>{menuItem.portionSize}{getPortionMeasure(menuItem.itemType)}</h1>
            <h1>{menuItem.price} lv.</h1>
            <h1>{menuItem.quantity}</h1>
        </div>
    )
}

export default OrderDetailsItemCard;