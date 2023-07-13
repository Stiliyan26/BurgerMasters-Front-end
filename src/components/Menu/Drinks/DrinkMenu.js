import styles from './DrinkMenu.module.css';

import ItemCard from '../ItemCard/ItemCard';
import Sidebar from '../Sidebar/Sidebar';

import { useAuthContext } from '../../../contexts/AuthContext';
import * as menuItemService from '../../../services/menuItemService';

import { Fragment, useEffect, useState } from 'react';

const DrinkMenu = () => {
    const [drinks, setDrinks] = useState([]);
    const { token } = useAuthContext();
    const itemType = 'Drink';

    useEffect(() => {
        document.title = 'Drinks Menu';
        
        menuItemService.getAllOfItemType(token, itemType)
            .then(res => {
                setDrinks(res);
            })
            .catch(err => {
                console.log(err.message);
            });
    }, []);

    const getAllDrinks = () => {
        return drinks.map(drink => (
            <ItemCard key={drink.id} item={drink}/>
        ));
    }

    return (
        <Fragment>
            <section id={styles['search']}>
            </section>

            <div id={styles['grid-container']}>
                <Sidebar />

                <section id={styles['menu']} className={styles['grid']}>
                    {drinks && getAllDrinks()}
                </section>
            </div>
        </Fragment>
    )
}

export default DrinkMenu;