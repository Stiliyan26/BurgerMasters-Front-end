import styles from './ItemDetails.module.css';

import NumericInputControl from '../NumericInputControl/NumericInputControl';
import SimilarProducts from '../SimilarProducts/SimilarProducts';

import * as adminService from '../../../services/adminService';
import * as menuService from '../../../services/menuItemService';

import { useAuthContext } from "../../../contexts/AuthContext";

import { Link, useNavigate, useParams, useLocation } from "react-router-dom"
import { useEffect, useState } from 'react';

const ItemDetails = () => {
    const [item, setItem] = useState({
        name: '',
        itemType: '',
        description: '',
        portionSize: 0,
    });
    const [quantity, setQuantity] = useState(1);

    const { token, user } = useAuthContext();
    const { itemId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Details';

        menuService.getItemById(token, itemId)
            .then(res => {  
                setItem(res);
            })
            .catch(err => {
                console.log(err.message);
                navigate('/Not-found');
            });
    }, [itemId]);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const source = queryParams.get('source');

    if (source != 'MyPosts' && source != 'Menu') {
        navigate('/Not-found');
    }

    const getDescription = () => {
        return item.description
            .split(',')
            .map((i, index) => {
                return (
                    <li
                        key={index}
                        className={styles['description-item']}
                        style={{ animationDelay: `${index * 0.2}s` }}
                    >
                        {i.trim()}
                    </li>
                )
            });
    }

    const portionMeasure = () => {
        return item.itemType === 'Drink'
            ? 'ml'
            : 'g';
    }

    return (
        <div id={styles['details-wrapper']}>
            <section id={styles['details-container']}>
                <section className={styles['img--container']}>
                    <img src={`/images/${item.itemType}Menu/${item.imageUrl}`} className={styles['img']}></img>
                </section>

                <section className={styles['item--info']}>
                    <h2 className={styles['item--title']}>{item.name} ({item.portionSize} {portionMeasure()})</h2>

                    <ul className={styles['item--description']}>
                        {getDescription()}
                    </ul>

                    <div className={styles['order--item']}>
                        <NumericInputControl quantity={quantity} setQuantity={setQuantity} />

                        <Link to='/' className={styles['item--add-to-cart-btn']}>
                            <p className={styles['btn--content']}>Add to cart</p>
                            <i className="fa-light fa-cart-shopping fa-fade"></i>
                        </Link>
                    </div>
                </section>
            </section>

            {item.itemType &&
                <SimilarProducts
                    token={token}
                    itemType={item.itemType}
                    itemId={itemId}
                    source={source}
                    creatorId={user.userId}
                />}
        </div>
    )
}

export default ItemDetails