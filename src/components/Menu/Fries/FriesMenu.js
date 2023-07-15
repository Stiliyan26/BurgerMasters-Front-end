import styles from './FriesMenu.module.css';

import ItemCard from '../ItemCard/ItemCard';
import Sidebar from '../Sidebar/Sidebar';
import Loader from '../Loader/Loader';

import { useAuthContext } from '../../../contexts/AuthContext';
import * as menuItemService from '../../../services/menuItemService';

import { Fragment, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const FriesMenu = () => {
    const [friesCollection, setFriesCollection] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [sortQuery, setSortQuery] = useState("");
    const [isActive, setIsActive] = useState(false);

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
    //sorting expressions
    const sortQueries = {
        'price ascending': (a, b) => a.price - b.price,
        'price descending': (a, b) => b.price - a.price,
        portionSize: (a, b) => b.portionSize - a.portionSize,
        name: (a, b) => a.name.localeCompare(b.name),
    };
    //filtered data
    const getFilteredFries = useMemo(() => {
        if (!query && !sortQuery) {
            return friesCollection
                .map(fries => (
                    <ItemCard key={fries.id} item={fries} />
                ));
        }

        if (sortQuery && sortQueries.hasOwnProperty(sortQuery)) {
            return friesCollection
                .slice()
                .sort(sortQueries[sortQuery])
                .map(fries => (
                    <ItemCard key={fries.id} item={fries} />
                ));
        }

        return friesCollection
            .filter(fries => fries.name.toLowerCase().includes(query.toLowerCase()))
            .map(fries => (
                <ItemCard key={fries.id} item={fries} />
            ));
    }, [friesCollection, query, sortQuery]);

    const toggleDropdown = () => {
        setIsActive(prevState => !prevState);
    };

    const getDropDownClass = () => {
        return isActive ?
            `${styles.dropdown} ${styles.active}`
            : styles.dropdown;
    };

    function handleSerach(e) {
        setQuery(e.target.value);
        setSortQuery('');
    }

    const menuData = () => (
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
                    {friesCollection && getFilteredFries}
                </section>
            </div>
        </Fragment>
    )

    return isLoading
        ? <Loader itemType={itemType} />
        : menuData()
}

export default FriesMenu;