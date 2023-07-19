import styles from './ItemDetails.module.css';

import NumericInputControl from '../NumericInputControl/NumericInputControl';
import SimilarProducts from '../SimilarProducts/SimilarProducts';

import * as adminService from '../../../services/adminService';
import * as menuService from '../../../services/menuItemService';

import { MENU_PAGE_NAME, MYPOSTS_PAGE_NAME } from '../../../Constants/globalConstants';

import { useAuthContext } from "../../../contexts/AuthContext";

import { Link, useNavigate, useParams, useLocation } from "react-router-dom"
import { Fragment, useEffect, useState } from 'react';

const ItemDetails = () => {
    const [item, setItem] = useState({
        id: '',
        name: '',
        imageUrl: '',
        itemType: '',
        description: '',
        price: 0,
        portionSize: 0,
        creatorId: ''
    });
    const [quantity, setQuantity] = useState(1);

    const { token, user, isAdmin } = useAuthContext();
    const { itemId } = useParams();

    const navigate = useNavigate();
    const location = useLocation();
    let source = new URLSearchParams(location.search).get('source');

    useEffect(() => {
        document.title = 'Details';

        if (source != MYPOSTS_PAGE_NAME && source != MENU_PAGE_NAME) {
            navigate('/Not-found');
            return;
        }

        const fetchData = async () => {
            try {
                let response;

                if (source === MYPOSTS_PAGE_NAME) {
                    response = await adminService.getCreatorItem(token, itemId, user.userId);
                } else if (source === MENU_PAGE_NAME) {
                    response = await menuService.getItemById(token, itemId);
                }

                if (response.status === 200) {
                    setItem(response.item);
                } else if (response.status === 404) {
                    navigate('/Not-found');
                    return;
                }

            } catch (error) {
                console.log(error.message);
            }
        }

        fetchData();
    }, [itemId]);

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

    const userButtons = (
        <div className={styles['order--item']}>
            <NumericInputControl quantity={quantity} setQuantity={setQuantity} />

            <Link to='/' className={styles['item--add-to-cart-btn']}>
                <p className={styles['btn--content']}>Add to cart</p>
                <i className="fa-light fa-cart-shopping fa-fade"></i>
            </Link>
        </div>
    )

    function handlDeleteItem() {
        adminService.deleteMenuItem(token, itemId, user.userId)
            .then(res => {
                if (res.status === 204) {
                    if (item.itemType === 'Sandwich') {
                        return navigate(`/${source}/Sandwiches`);
                    } else if (item.itemType === 'Burger') {
                        navigate(`/${source}/Burgers`);
                    } else if (item.itemType === 'Drink') {
                        navigate(`/${source}/Drinks`);
                    } else if (item.itemType === 'Fries') {
                        navigate(`/${source}/Fries`);
                    } else if (item.itemType === 'Hotdog') {
                        navigate(`/${source}/Hotdogs`);
                    } else if (item.itemType === 'Grill') {
                        navigate(`/${source}/Grills`);
                    } else if (item.itemType === 'Salad') {
                        navigate(`/${source}/Salads`);
                    }
                } else if (res.status === 404) {
                    navigate('/Not-found');
                }
            });
    }

    const adminButtons = (
        <Fragment>
            {source === MENU_PAGE_NAME && userButtons}

            <div className={styles['admin--btns']}>
                <Link to={`/EditItem/${itemId}?source=${source}`} className={styles['edit-btn']}>
                    <p className={styles['btn--content']}>Edit</p>
                    <i className="fa-solid fa-pen-to-square fa-fade"></i>
                </Link>

                <Link onClick={handlDeleteItem} className={styles['delete-btn']}>
                    <p className={styles['btn--content']}>Delete</p>
                    <i className="fa-solid fa-trash fa-beat-fade"></i>
                </Link>
            </div>
        </Fragment>
    )

    const getAdminButtons = () =>
        isAdmin && item.creatorId === user.userId
            ? adminButtons
            : userButtons;

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

                    {getAdminButtons()}
                </section>
            </section>

            {item.itemType &&
                <SimilarProducts
                    token={token}
                    itemType={item.itemType}
                    itemId={itemId}
                    creatorId={user.userId}
                />}
        </div>
    )
}

export default ItemDetails