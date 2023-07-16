import styles from './ItemDetails.module.css';

import * as menuService from '../../../services/menuItemService';

import { useNavigate, useParams } from "react-router-dom"
import { useAuthContext } from "../../../contexts/AuthContext";
import { useEffect, useState } from 'react';

const ItemDetails = () => {
    const [item, setItem] = useState();

    const { token } = useAuthContext();
    const { itemId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Details';

        menuService.getItemById(token, itemId)
            .then(res => {
                console.log(res);
                setItem(res);
            })
            .catch(err => {
                console.log(err.message);
            });
    }, [itemId]);

    const getImg = () =>
        item && item.itemType
            ? <img src={`/images/${item.itemType}Menu/${item.imageUrl}`} className={styles['img']}></img>
            : null;

    return (
        <div id={styles['details-container']}>
            <div className={styles['img--container']}>
                {getImg()}
            </div>
        </div>
    )
}

export default ItemDetails