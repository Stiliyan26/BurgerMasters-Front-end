import styles from './SimilarProducts.module.css';

import ItemCard from '../../Menu/ItemCard/ItemCard';

import * as menuItemService from '../../../services/menuItemService'

import { useEffect, useState } from 'react';

const SimilarProducts = ({ token, itemType, itemId }) => {
    const [similarProducts, setSimilarProducts] = useState([]);

    useEffect(() => {
        menuItemService.getSimilarProducts(token, itemType, itemId)
            .then(res => {
                setSimilarProducts(res);
            })
            .catch(err => {
                console.log(err);
            })
    }, [itemId]);

    const getSimilarProducts = () => similarProducts
        .map(item => (
            <ItemCard
                key={item.id}
                item={item}
                className={styles['similar-item']}
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