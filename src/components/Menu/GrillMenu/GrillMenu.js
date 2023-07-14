import styles from './GrillMenu.module.css';

import ItemCard from '../ItemCard/ItemCard';
import Sidebar from '../Sidebar/Sidebar';

import { useAuthContext } from '../../../contexts/AuthContext';
import * as menuItemService from '../../../services/menuItemService';

import { Fragment, useEffect, useState } from 'react';

const GrillMenu = () => {
    const [grills, setGrills] = useState([]);
    const { token } = useAuthContext();
    const itemType = 'Grill';

    useEffect(() => {
        document.title = 'Grill Menu';
        
        menuItemService.getAllOfItemType(token, itemType)
            .then(res => {
                setGrills(res);
            })
            .catch(err => {
                console.log(err.message);
            });
    }, []);

    const getAllGrills = () => {
        return grills.map(grill => (
            <ItemCard key={grill.id} item={grill}/>
        ));
    }

    return (
        <Fragment>
            <section id={styles['search']}>
            </section>

            <div id={styles['grid-container']}>
                <Sidebar />

                <section id={styles['menu']} className={styles['grid']}>
                    {grills && getAllGrills()}
                </section>
            </div>
        </Fragment>
    )
}

export default GrillMenu;