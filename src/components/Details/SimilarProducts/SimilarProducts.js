import styles from './SimilarProducts.module.css';

import ItemCard from '../../Menu/ItemCard/ItemCard';

import * as menuItemService from '../../../services/menuItemService';
import * as adminService from '../../../services/adminService';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SimilarProducts = ({ token, itemType, itemId, source, creatorId }) => {
    const [similarProducts, setSimilarProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;

                if (source === 'MyPosts') {
                    response = await adminService.getSimilarProductsByCreator(token, itemType, itemId, creatorId);
                } else if (source == 'Menu') {
                    response = await menuItemService.getSimilarProducts(token, itemType, itemId);
                } else {
                    navigate('/Not-found');
                }

                setSimilarProducts(response);
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