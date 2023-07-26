import styles from './CartItemCard.module.css';

import NumericInputControl from '../../Details/NumericInputControl/NumericInputControl';

import * as cartService from '../../../services/cartService';
import { getPortionMeasure } from '../../../services/menuItemService';
import { handleSmoothRedirection } from '../../../services/navigationServices';

import { useAuthContext } from '../../../contexts/AuthContext';

import { Link } from 'react-router-dom';
import { useState } from 'react';

const CartItemCard = ({ item, index, handleRemoveItem, updateQuantity }) => {
    const [quantity, setQuantity] = useState(item.quantity);

    const { token, user } = useAuthContext();

    const getQuantityPrice = () => {
        return (quantity * item.price).toFixed(2);
    }

    function handleAddQuantity(quantityToAddOrRemove) {
        cartService.addToCart(token, item.id, user.userId, quantityToAddOrRemove)
            .then(res => {
                if (res.status === 200) {
                    updateQuantity(item.id, quantity + quantityToAddOrRemove)
                } else if (res.status === 404) {
                    console.log("Item not found");
                }
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    function onRemove() {
        handleRemoveItem(item.id);
    }

    return (
        <section style={{ animationDelay: `${index * 0.2}s` }} id={styles['item-info']}>
            <div className={styles['img-container']}>
                <Link to={`/Details/${item.id}?source=Menu`} onClick={handleSmoothRedirection}>
                    <img className={styles['item-img']}
                        src={`/images/${item.itemType}Menu/${item.imageUrl}`}
                    />
                </Link>
            </div>

            <h2 className={styles['item-name']}>
                {item.name} ({item.portionSize} {getPortionMeasure(item.itemType)})
            </h2>

            <p className={styles['item-price']}>{item.price.toFixed(2)} lv.</p>

            <div className={styles['quantity-container']}>
                <NumericInputControl
                    quantity={quantity}
                    setQuantity={setQuantity}
                    handleAddToCart={handleAddQuantity}
                    page={'Cart'}
                />
            </div>

            <p className={styles['total']}>{getQuantityPrice()} lv.</p>

            <Link className={styles["spinning-x"]}>
                <i onClick={onRemove} id={styles['spinning-icon']} className="fa-regular fa-xmark"></i>
            </Link>
        </section>
    )
}

export default CartItemCard;