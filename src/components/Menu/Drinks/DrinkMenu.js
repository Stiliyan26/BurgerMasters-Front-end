import styles from '../Menu.module.css';

import ItemCard from '../ItemCard/ItemCard';
import Sidebar from '../Sidebar/Sidebar';
import Loader from '../Loader/Loader';

import { useAuthContext } from '../../../contexts/AuthContext';
import * as menuItemService from '../../../services/menuItemService';

import { Fragment, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';


const DrinkMenu = () => {
    const [drinksCollection, setDrinksCollection] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [sortQuery, setSortQuery] = useState("");
    const [isActive, setIsActive] = useState(false);

    const { token } = useAuthContext();
    const itemType = 'Drink';

    useEffect(() => {
        document.title = 'drinksCollection Menu';

        menuItemService.getAllItemsByType(token, itemType)
            .then(res => {
                setDrinksCollection(res);
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
    const getFilteredDrinks = useMemo(() => {
        if (!query && !sortQuery) {
            return drinksCollection
                .map(drink => (
                    <ItemCard key={drink.id} item={drink} />
                ));
        }

        if (sortQuery && sortQueries.hasOwnProperty(sortQuery)) {
            return drinksCollection
                .slice()
                .sort(sortQueries[sortQuery])
                .map(drink => (
                    <ItemCard key={drink.id} item={drink} />
                ));
        }

        return drinksCollection
            .filter(drink => drink.name.toLowerCase().includes(query.toLowerCase()))
            .map(drink => (
                <ItemCard key={drink.id} item={drink} />
            ));
    }, [drinksCollection, query, sortQuery]);
    
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
                    {drinksCollection && getFilteredDrinks}
                </section>
            </div>
        </Fragment>
    )

    return isLoading
        ? <Loader itemType={itemType} />
        : menuData();
}

export default DrinkMenu;