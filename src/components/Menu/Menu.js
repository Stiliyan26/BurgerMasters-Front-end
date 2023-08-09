import styles from './Menu.module.css';

import ItemCard from './ItemCard/ItemCard';
import Sidebar from './Sidebar/Sidebar';
import Loader from './Loader/Loader';
import FilterSearchBar from './FilterSearchBar/FilterSearchBar';
import SideCart from '../Cart/SideCart/SideCart';

import { MENU_PAGE_NAME } from '../../Constants/globalConstants';

import * as menuItemService from '../../services/menuItemService';

import { useAuthContext } from '../../contexts/AuthContext';

import { Fragment, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Menu = ({ itemType }) => {
    const [itemsCollection, setItemsCollection] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [sortQuery, setSortQuery] = useState("");

    const [isSideCartOpen, setIsSideCartOpen] = useState(false);

    const { token } = useAuthContext();
    
    const navigate = useNavigate();

    useEffect(() => {
        document.title = `${itemType} Menu`;

        menuItemService.getAllItemsByType(token, itemType)
            .then(res => {
                if (res.status === 200) {
                    setItemsCollection(res.menuItems);
                    setTimeout(() => setIsLoading(false), 500);
                } else {
                    navigate('/Not-found');
                    return;
                }
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
                <ItemCard
                    key={item.id}
                    item={item}
                    pageType={MENU_PAGE_NAME}
                    handleShowSideCart={handleShowSideCart}
                />
            ));
        }

        if (sortQuery && sortQueries.hasOwnProperty(sortQuery)) {
            return itemsCollection
                .slice()
                .sort(sortQueries[sortQuery])
                .map(item => (
                    <ItemCard
                        key={item.id}
                        item={item}
                        pageType={MENU_PAGE_NAME}
                        handleShowSideCart={handleShowSideCart}
                    />
                ));
        }

        return itemsCollection
            .filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
            .map(item => (
                <ItemCard
                    key={item.id}
                    item={item}
                    pageType={MENU_PAGE_NAME}
                    handleShowSideCart={handleShowSideCart}
                />
            ));
    }, [itemsCollection, query, sortQuery]);

    function handleSearch(e) {
        setQuery(e.target.value);
        setSortQuery('');
    }

    function handleShowSideCart(isOpened) {
        setIsSideCartOpen(isOpened);
    }

    const menuData = () => (
        <Fragment>
            {isLoading && <Loader itemType={itemType} />}

            <FilterSearchBar handleSearch={handleSearch} query={query} setSortQuery={setSortQuery} />

            <div id={styles['grid-container']}>
                <Sidebar pageType={MENU_PAGE_NAME} />

                <section id={styles.menu} className={styles.grid}>
                    {itemsCollection && getFilteredItems}
                </section>
            </div>

            {isSideCartOpen
                && <SideCart
                    isSideCartOpen={isSideCartOpen}
                    handleShowSideCart={handleShowSideCart}
                />
            }
        </Fragment>
    );

    return menuData();
};

export default Menu;