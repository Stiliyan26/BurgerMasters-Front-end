import { Link } from 'react-router-dom';
import styles from './ItemCard.module.css';

const ItemCard = ({item}) => {
    const imageUrl = `/images/${item.itemType}Menu/${item.imageUrl}`;
    const portionMeasure = 
        item.itemType === 'Drink'
            ? 'ml'
            : 'g'

    return (
        <section id={styles['card']}>
            <div className={styles['img-container']}>
                <Link to='/' className={styles['link--img']}>
                    <img src={imageUrl} className={styles['img']} alt="item image" />
                </Link>    
            </div>

            <div className={styles['item-info']}>
                <div className={styles['wrap']}>
                    <Link to='/' className={styles['link--tag']}>
                        <h3 className={styles['item--title']}>{item.name}</h3>
                    </Link>
                    <p className={styles['item--portion-size']}>({item.portionSize}{portionMeasure})</p>
                </div>
                
                <p className={styles['item--price']}>Price: {item.price.toFixed(2)} leva</p>

                <Link to='/' className={styles['item--add-to-cart-btn']}>
                    <p className={styles['btn--content']}>Add to cart</p>
                    <i className="fa-light fa-cart-shopping fa-fade"></i>
                </Link>
            </div>
        </section>
        
    )
}

export default ItemCard;