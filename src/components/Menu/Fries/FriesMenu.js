import styles from './FriesMenu.module.css';

import ItemCard from '../ItemCard/ItemCard';
import Sidebar from '../Sidebar/Sidebar';

import { useAuthContext } from '../../../contexts/AuthContext';
import * as menuItemService from '../../../services/menuItemService';

import { Fragment, useEffect, useState } from 'react';

const FriesMenu = () => {
    const [friesCollection, setFriesCollection] = useState([]);
    const { token } = useAuthContext();
    const itemType = 'Fries';

    useEffect(() => {
        document.title = 'Fries Menu';
        
        menuItemService.getAllOfItemType(token, itemType)
            .then(res => {
                setFriesCollection(res);
            })
            .catch(err => {
                console.log(err.message);
            });
    }, []);

    const getAllFries = () => {
        return friesCollection.map(fries => (
            <ItemCard key={fries.id} item={fries}/>
        ));
    }

    return (
        <Fragment>
            <section id={styles['search']}>
            </section>

            <div id={styles['grid-container']}>
                <Sidebar />

                <section id={styles['menu']} className={styles['grid']}>
                    {friesCollection && getAllFries()}
                </section>
            </div>
        </Fragment>
    )
}

export default FriesMenu;