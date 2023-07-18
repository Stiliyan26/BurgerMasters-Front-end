import styles from './Menu.module.css';

import ItemCard from './ItemCard/ItemCard';
import Sidebar from './Sidebar/Sidebar';
import Loader from './Loader/Loader';

import { useAuthContext } from '../../contexts/AuthContext';
import * as menuItemService from '../../services/menuItemService';

import { Fragment, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ itemType }) => {
    const [itemsCollection, setItemsCollection] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [sortQuery, setSortQuery] = useState("");
    const [isActive, setIsActive] = useState(false);

    const { token } = useAuthContext();

    useEffect(() => {
        document.title = `${itemType} Menu`;

        menuItemService.getAllItemsByType(token, itemType)
            .then(res => {
                setItemsCollection(res);
                setTimeout(() => setIsLoading(false), 500);
            })
            .catch(err => {
                console.log(err.message);
                setIsLoading(false);
            });
    }, [itemType]);

    const sortQueries = {
        'price ascending': (a, b) => a.price - b.price,
        'price descending': (a, b) => b.price - a.price,
        portionSize: (a, b) => b.portionSize - a.portionSize,
        name: (a, b) => a.name.localeCompare(b.name),
    };

    const getFilteredItems = useMemo(() => {
        if (!query && !sortQuery) {
            return itemsCollection.map(item => (
                <ItemCard key={item.id} item={item} pageType={'Menu'}/>
            ));
        }

        if (sortQuery && sortQueries.hasOwnProperty(sortQuery)) {
            return itemsCollection
                .slice()
                .sort(sortQueries[sortQuery])
                .map(item => (
                    <ItemCard key={item.id} item={item} pageType={'Menu'}/>
                ));
        }

        return itemsCollection
            .filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
            .map(item => (
                <ItemCard key={item.id} item={item} pageType={'Menu'}/>
            ));
    }, [itemsCollection, query, sortQuery]);

    const toggleDropdown = () => {
        setIsActive(prevState => !prevState);
    };

    const getDropDownClass = () => {
        return isActive ? `${styles.dropdown} ${styles.active}` : styles.dropdown;
    };

    function handleSearch(e) {
        setQuery(e.target.value);
        setSortQuery('');
    }

    const menuData = () => (
        <Fragment>
            <section id={styles.filters}>
                <section id={styles.search}>
                    <input
                        className={styles['search--inp']}
                        value={query}
                        onChange={handleSearch}
                        type="search"
                        placeholder='Search by name'
                    />
                    <i className="fa-solid fa-magnifying-glass fa-beat-fade search--icon"></i>
                </section>

                <div className={styles.box}>
                    <div onClick={toggleDropdown} className={getDropDownClass()}>
                        Sort by
                        <span className={styles['left-icon']}></span>
                        <span className={styles['right-icon']}></span>
                        <div className={styles.items}>
                            <Link onClick={() => setSortQuery('price ascending')}><span></span>Price Ascending</Link>
                            <Link onClick={() => setSortQuery('price descending')}><span></span>Price Descending</Link>
                            <Link onClick={() => setSortQuery('portionSize')}><span></span>Portion size</Link>
                            <Link onClick={() => setSortQuery('name')}><span></span>Name</Link>
                            <Link onClick={() => setSortQuery('')}><span></span>Reset</Link>
                        </div>
                    </div>
                </div>
            </section>

            <div id={styles['grid-container']}>
                <Sidebar pageType={'Menu'} />

                <section id={styles.menu} className={styles.grid}>
                    {itemsCollection && getFilteredItems}
                </section>
            </div>
        </Fragment>
    );

    return isLoading
        ? <Loader itemType={itemType} />
        : menuData();
};

export default Menu;