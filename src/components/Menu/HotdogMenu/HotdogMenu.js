import styles from './HotdogMenu.module.css';

import ItemCard from '../ItemCard/ItemCard';
import Sidebar from '../Sidebar/Sidebar';

import { useAuthContext } from '../../../contexts/AuthContext';
import * as menuItemService from '../../../services/menuItemService';

import { Fragment, useEffect, useState } from 'react';

const HotdogMenu = () => {
    const [hotdogs, setHotdogs] = useState([]);
    const { token } = useAuthContext();
    const itemType = 'Hotdog';

    useEffect(() => {
        document.title = 'Hotdog Menu';
        
        menuItemService.getAllOfItemType(token, itemType)
            .then(res => {
                setHotdogs(res);
            })
            .catch(err => {
                console.log(err.message);
            });
    }, []);

    const getAllHotdogs = () => {
        return hotdogs.map(hotdog => (
            <ItemCard key={hotdog.id} item={hotdog}/>
        ));
    }

    return (
        <Fragment>
            <section id={styles['search']}>
            </section>

            <div id={styles['grid-container']}>
                <Sidebar />

                <section id={styles['menu']} className={styles['grid']}>
                    {hotdogs && getAllHotdogs()}
                </section>
            </div>
        </Fragment>
    )
}

export default HotdogMenu;