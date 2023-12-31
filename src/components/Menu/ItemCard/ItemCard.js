import styles from './ItemCard.module.css';

import * as cartService from '../../../services/cartService';
import { getPortionMeasure } from '../../../services/menuItemService';

import { handleSmoothRedirection } from '../../../services/navigationServices';

import { MYPOSTS_PAGE_NAME, MENU_PAGE_NAME } from '../../../Constants/globalConstants';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useCartContext } from '../../../contexts/CartContext';


import { Link } from 'react-router-dom';

const ItemCard = ({ item, pageType, handleShowSideCart }) => {
    const { token, user } = useAuthContext();
    const { setCartItemsCount } = useCartContext();

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

    const addToCartBtn = (
        <Link to='#' onClick={handleAddToCart} className={styles['item--add-to-cart-btn']}>
            <p className={styles['btn--content']}>Add to cart</p>
            <i className="fa-light fa-cart-shopping fa-fade"></i>
        </Link>
    );

    const detailsBtn = (
        <Link to={detailsPageSource()}
            onClick={handleSmoothRedirection}
            className={styles['details--btn']}
        >
            <p className={styles['btn--content']}>Details</p>
            <i className="fa-light fa-cart-shopping fa-fade"></i>
        </Link>
    )

    const getButtonByPageType = () =>
        pageType === MYPOSTS_PAGE_NAME
            ? detailsBtn
            : addToCartBtn;

    function handleAddToCart(e) {
        e.preventDefault();

        cartService.addToCart(token, item.id, user.userId, 1)
            .then(res => {
                if (res.status === 200) {
                    console.log("Item added to cart");
                    handleShowSideCart(true);
                    setCartItemsCount(prev => prev + 1);
                } else if (res.status === 404) {
                    console.log("Item not found");
                }
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    return (
        <section id={styles['card']}>
            <div className={styles['img-container']}>
                <Link to={detailsPageSource()} onClick={handleSmoothRedirection} className={styles['link--img']}>
                    <img src={imageUrl} className={styles['img']} alt="item image" />
                </Link>
            </div>

            <div className={styles['item-info']}>
                <div className={styles['wrap']}>
                    <Link to={detailsPageSource()} onClick={handleSmoothRedirection} className={styles['link--tag']}>
                        <h3 className={styles['item--title']}>{item.name}</h3>
                    </Link>
                    <p className={styles['item--portion-size']}>
                        ({item.portionSize}{getPortionMeasure(item.itemType)})
                    </p>
                </div>

                <p className={styles['item--price']}>Price: {item.price.toFixed(2)} lv.</p>

                {getButtonByPageType()}
            </div>
        </section>
    )
}

export default ItemCard;