import styles from './BurgerMenu.module.css';

import ItemCard from '../ItemCard/ItemCard';
import Sidebar from '../Sidebar/Sidebar';

import { useAuthContext } from '../../../contexts/AuthContext';
import * as menuItemService from '../../../services/menuItemService';

import { Fragment, useEffect, useState } from 'react';

const BurgerMenu = () => {
    const [burgers, setBurgers] = useState([]);
    const { token } = useAuthContext();
    const itemType = 'Burger';

    useEffect(() => {
        document.title = 'Burger Menu';
        
        menuItemService.getAllOfItemType(token, itemType)
            .then(res => {
                setBurgers(res);
            })
            .catch(err => {
                console.log(err.message);
            });
    }, []);

    const getAllBurgers = () => {
        return burgers.map(burger => (
            <ItemCard key={burger.id} item={burger}/>
        ));
    }

    return (
        <Fragment>
            <section id={styles['search']}>
            </section>

            <div id={styles['grid-container']}>
                <Sidebar />

                <section id={styles['menu']} className={styles['grid']}>
                    {burgers && getAllBurgers()}
                </section>
            </div>
        </Fragment>
    )
}

export default BurgerMenu;