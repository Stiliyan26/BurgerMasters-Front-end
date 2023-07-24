import styles from './SimilarProducts.module.css';

import ItemCard from '../../Menu/ItemCard/ItemCard';

import * as menuItemService from '../../../services/menuItemService';
import * as adminService from '../../../services/adminService';

import { MENU_PAGE_NAME, MYPOSTS_PAGE_NAME } from '../../../Constants/globalConstants';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SimilarProducts = ({ token, itemType, itemId, creatorId, handleShowSideCart, setSideCartItemsCount }) => {
    const [similarProducts, setSimilarProducts] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    const source = new URLSearchParams(location.search).get('source');

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;

                if (source === MYPOSTS_PAGE_NAME) {
                    response = await adminService.getSimilarProductsByCreator(token, itemType, itemId, creatorId);
                } else if (source == MENU_PAGE_NAME) {
                    response = await menuItemService.getSimilarProducts(token, itemType, itemId);
                } else {
                    return;
                }

                if (response.status === 200) {
                    setSimilarProducts(response.items);
                } else if (response.status === 404) {
                    navigate('/Not-found');
                } else if (response.status === 409) {
                    console.log(response.errorMessage);
                }

            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [itemId, source]);

    const getSimilarProducts = () => similarProducts
        .map(item => (
            <ItemCard
                key={item.id}
                className={styles['similar-item']}
                item={item}
                pageType={source}
                handleShowSideCart={handleShowSideCart}
                setSideCartItemsCount={setSideCartItemsCount}
            />
        ));

    return (
        <section id={styles['similar-products']}>
            <h2 className={styles['title']}>Similar products</h2>

            <div className={styles['grid--container']}>
                {similarProducts && getSimilarProducts()}
            </div>

        </section>
    )
}

export default SimilarProducts;