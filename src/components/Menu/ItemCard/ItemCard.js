import styles from './ItemCard.module.css';

import { MYPOSTS_PAGE_NAME, MENU_PAGE_NAME } from '../../../Constants/globalConstants';

import { Link } from 'react-router-dom';

const ItemCard = ({ item, pageType }) => {
    const imageUrl = `/images/${item.itemType}Menu/${item.imageUrl}`;

    const detailsPageSource = () => {
        switch (pageType) {
            case MENU_PAGE_NAME:
                return `/Details/${item.id}?source=${MENU_PAGE_NAME}`;
            case MYPOSTS_PAGE_NAME:
                return `/Details/${item.id}?source=${MYPOSTS_PAGE_NAME}`;
            default:
                return `/Details/${item.id}?source=${MENU_PAGE_NAME}`;
        }
    }

    const portionMeasure =
        item.itemType === 'Drink'
            ? 'ml'
            : 'g'

    const addToCartBtn = (
        <Link to='/Cart' className={styles['item--add-to-cart-btn']}>
            <p className={styles['btn--content']}>Add to cart</p>
            <i className="fa-light fa-cart-shopping fa-fade"></i>
        </Link>
    );

    const detailsBtn = (
        <Link to={detailsPageSource()} className={styles['details--btn']}>
            <p className={styles['btn--content']}>Details</p>
            <i className="fa-light fa-cart-shopping fa-fade"></i>
        </Link>
    )

    const getButtonByPageType = () =>
        pageType === MYPOSTS_PAGE_NAME
            ? detailsBtn
            : addToCartBtn

    return (
        <section id={styles['card']}>
            <div className={styles['img-container']}>
                <Link to={detailsPageSource()} className={styles['link--img']}>
                    <img src={imageUrl} className={styles['img']} alt="item image" />
                </Link>
            </div>

            <div className={styles['item-info']}>
                <div className={styles['wrap']}>
                    <Link to={detailsPageSource()} className={styles['link--tag']}>
                        <h3 className={styles['item--title']}>{item.name}</h3>
                    </Link>
                    <p className={styles['item--portion-size']}>({item.portionSize}{portionMeasure})</p>
                </div>

                <p className={styles['item--price']}>Price: {item.price.toFixed(2)} leva</p>

                {getButtonByPageType()}
            </div>
        </section>
    )
}

export default ItemCard;