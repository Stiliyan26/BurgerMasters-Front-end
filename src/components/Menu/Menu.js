import styles from './Menu.module.css';

import ItemCard from './ItemCard/ItemCard';
import Sidebar from './Sidebar/Sidebar';
import Loader from './Loader/Loader';
import FilterSearchBar from './FilterSearchBar/FilterSearchBar';
import SideCart from '../Cart/SideCart/SideCart';

import { MENU_PAGE_NAME } from '../../Constants/globalConstants';

import { useAuthContext } from '../../contexts/AuthContext';
import * as menuItemService from '../../services/menuItemService';

import { Fragment, useEffect, useMemo, useState } from 'react';

const Menu = ({ itemType }) => {
    const [itemsCollection, setItemsCollection] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [sortQuery, setSortQuery] = useState("");

    const [isSideCartOpen, setIsSideCartOpen] = useState(false);
    const [sideCartItemCount, setSideCartItemsCount] = useState(0);

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
                <ItemCard
                    key={item.id}
                    item={item}
                    pageType={MENU_PAGE_NAME}
                    handleShowSideCart={handleShowSideCart}
                    setSideCartItemsCount={setSideCartItemsCount}
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
                        setSideCartItemsCount={setSideCartItemsCount}
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
                    setSideCartItemsCount={setSideCartItemsCount}

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
                        sideCartItemCount={sideCartItemCount}
                        setSideCartItemsCount={setSideCartItemsCount}
                    />}
        </Fragment>
    );

    return isLoading
        ? <Loader itemType={itemType} />
        : menuData();
};

export default Menu;