import styles from './CartItemCard.module.css';

import NumericInputControl from '../../Details/NumericInputControl/NumericInputControl';

import { Link } from 'react-router-dom';

const CartItemCard = ({item}) => {

    const portionMeasure = () => {
        return item.itemType === 'Drink'
            ? 'ml'
            : 'g';
    }

    const getQuantityPrice = () => {
        return item.quantity * item.price;
    }
    
    return (
        <section id={styles['item-info']}>
            <div className={styles['img-container']}>
                <img className={styles['item-img']}
                    src={`/images/${item.itemType}Menu/${item.imageUrl}`}
                />
            </div>


            <h2 className={styles['item-name']}>
                {item.name} ({item.portionSize} {portionMeasure()})
            </h2>

            <p className={styles['item-price']}>{item.price}</p>

            <div className={styles['quantity-container']}>
                <NumericInputControl quantity={item.quantity} />
            </div>

            <p className={styles['total']}>{getQuantityPrice()} lv.</p>

            <Link className={styles["spinning-x"]}>
                <i className="fa-regular fa-xmark"></i>
            </Link>
        </section>
    )
}

export default CartItemCard;