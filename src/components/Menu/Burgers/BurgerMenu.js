import styles from './BurgerMenu.module.css';

import ItemCard from '../ItemCard/ItemCard';
import Sidebar from '../Sidebar/Sidebar';

import { useAuthContext } from '../../../contexts/AuthContext';
import * as menuItemService from '../../../services/menuItemService';

import { Fragment, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const BurgerMenu = () => {
    const [burgers, setBurgers] = useState([]);
    const [query, setQuery] = useState("");
    const [sortQuery, setSortQuery] = useState("");
    const [isActive, setIsActive] = useState(false);

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

    const sortQueries = {
        'price ascending': (a, b) => a.price - b.price,
        'price descending': (a, b) => b.price - a.price,
        portionSize: (a, b) => b.portionSize - a.portionSize,
        name: (a, b) => a.name.localeCompare(b.name),
    };

    const getFilteredBurgers = useMemo(() => {
        if (!query && !sortQuery) {
            return burgers
                .map(burger => (
                    <ItemCard key={burger.id} item={burger} />
                ));
        }

        if (sortQuery && sortQueries.hasOwnProperty(sortQuery)) {
            return burgers
                .slice()
                .sort(sortQueries[sortQuery])
                .map(burger => (
                    <ItemCard key={burger.id} item={burger} />
                ));
        }

        return burgers
            .filter(burger => burger.name.toLowerCase().includes(query.toLowerCase()))
            .map(burger => (
                <ItemCard key={burger.id} item={burger} />
            ));
    }, [burgers, query, sortQuery]);

    const toggleDropdown = () => {
        setIsActive(prevState => !prevState);
    };

    const getDropDownClass = () => {
        return isActive ? `${styles.dropdown} ${styles.active}` : styles.dropdown;
    };

    function handleSerach(e) {
        setQuery(e.target.value);
        setSortQuery('');
    }

    return (
        <Fragment>
            <section id={styles['filters']}>
                <section id={styles['search']}>
                    <input
                        className={styles['search--inp']}
                        value={query}
                        onChange={handleSerach}
                        type="search"
                        placeholder='Search by name'
                    />
                    <i className="fa-solid fa-magnifying-glass fa-beat-fade search--icon"></i>
                </section>

                <div className={styles['box']}>
                    <div onClick={toggleDropdown} className={getDropDownClass()}>
                        Sort by
                        <span className={styles['left-icon']}></span>
                        <span className={styles['right-icon']}></span>
                        <div className={styles['items']}>
                            <Link onClick={e => setSortQuery('price ascending')}><span></span>Price Ascending</Link>
                            <Link onClick={e => setSortQuery('price descending')}><span></span>Price Descending </Link>
                            <Link onClick={e => setSortQuery('portionSize')}><span></span>Protion size</Link>
                            <Link onClick={e => setSortQuery('name')}><span></span>Name</Link>
                            <Link onClick={e => setSortQuery('')}><span></span>Reset</Link>
                        </div>
                    </div>
                </div>
            </section>

            <div id={styles['grid-container']}>
                <Sidebar />

                <section id={styles['menu']} className={styles['grid']}>
                    {burgers && getFilteredBurgers}
                </section>
            </div>
        </Fragment>
    )
}

export default BurgerMenu;