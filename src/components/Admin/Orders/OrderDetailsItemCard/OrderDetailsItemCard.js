import styles from './OrderDetailsItemCard.module.css';

import { getPortionMeasure } from '../../../../services/menuItemService';

const OrderDetailsItemCard = ({ menuItem, index }) => {
    const getImageSource = () => `/images/${menuItem.itemType}Menu/${menuItem.imageUrl}`;

    return (
        <div style={{ animationDelay: `${index * 0.2}s`}} id={styles['menu-item-container']}>
            <div className={styles['image-container']}>
                <img className={styles['item-image']} src={getImageSource()} alt={menuItem.name} />
            </div>

            <h2 className={styles['item-title']}>
                {menuItem.name} ( {menuItem.portionSize}{getPortionMeasure(menuItem.itemType)} )
            </h2>
            <p className={styles['item-price']}>Price: {menuItem.price} lv.</p>
            <p className={styles['item-quantity']}>Quantity: {menuItem.quantity}</p>
        </div>
    )
}

export default OrderDetailsItemCard;