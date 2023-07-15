import styles from './FriesMenu.module.css';

import ItemCard from '../ItemCard/ItemCard';
import Sidebar from '../Sidebar/Sidebar';
import Loader from '../Loader/Loader';

import { useAuthContext } from '../../../contexts/AuthContext';
import * as menuItemService from '../../../services/menuItemService';

import { Fragment, useEffect, useState } from 'react';

const FriesMenu = () => {
    const [friesCollection, setFriesCollection] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useAuthContext();
    const itemType = 'Fries';

    useEffect(() => {
        document.title = 'Fries Menu';

        menuItemService.getAllOfItemType(token, itemType)
            .then(res => {
                setFriesCollection(res);
                setTimeout(() => setIsLoading(false), 500);
            })
            .catch(err => {
                console.log(err.message);
                setIsLoading(false);
            });
    }, []);

    const getAllFries = () => {
        return friesCollection.map(fries => (
            <ItemCard key={fries.id} item={fries} />
        ));
    }

    const menuData = () => {
        return (<Fragment>
            <section id={styles['search']}>
            </section>

            <div id={styles['grid-container']}>
                <Sidebar />

                <section id={styles['menu']} className={styles['grid']}>
                    {friesCollection && getAllFries()}
                </section>
            </div>
        </Fragment>)
    }
    
    return isLoading
            ? <Loader itemType={'fries'}/>
            : menuData()
}

export default FriesMenu;