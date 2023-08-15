import styles from './Menu.module.css';

import ItemCard from './ItemCard/ItemCard';
import Sidebar from './Sidebar/Sidebar';
import Loader from './Loader/Loader';
import FilterSearchBar from './FilterSearchBar/FilterSearchBar';
import SideCart from '../Cart/SideCart/SideCart';

import { MENU_PAGE_NAME } from '../../Constants/globalConstants';

import * as menuItemService from '../../services/menuItemService';
import { handleSmoothRedirection } from '../../services/navigationServices';

import { useAuthContext } from '../../contexts/AuthContext';

import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Menu = ({ itemType }) => {

    const [queryModel, setQueryModel] = useState({
        itemType: itemType,
        searchTerm: '',
        sorting: 'Default',
        currentPage: 1,
        totalMenuItemsCount: 0,
        menuItems: [],
    });

    const [itemsCollection, setItemsCollection] = useState([]);
    const [totalMenuItemsCount, setTotalMenuItemsCount] = useState(0);

    const [isLoading, setIsLoading] = useState(true);
    const [isSideCartOpen, setIsSideCartOpen] = useState(false);

    const { token } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = `${itemType} Menu`;

        menuItemService.getFilteredAndSortedItems(token, queryModel)
            .then(res => {
                if (res.status === 200) {
                    setItemsCollection(res.queryModel.menuItems);
                    setTotalMenuItemsCount(res.queryModel.totalMenuItemsCount);
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
    }, [itemType, queryModel.currentPage, queryModel.searchTerm, queryModel.sorting]);


    function handleSearch(e) {
        const searchTerm = e.target.value;

        setQueryModel({
            ...queryModel,
            searchTerm: searchTerm,
            currentPage: 1
        })
    }

    function handleSort(sorting) {
        setQueryModel({
            ...queryModel,
            sorting: sorting,
        });
    }

    function handlePageChange(pageNumber) {
        handleSmoothRedirection();

        setQueryModel({
            ...queryModel,
            currentPage: pageNumber
        });
    }

    function handleShowSideCart(isOpened) {
        setIsSideCartOpen(isOpened);
    }

    const getAllMenuItems = () => {
        return itemsCollection.map(item => (
            <ItemCard
                key={item.id}
                item={item}
                pageType={MENU_PAGE_NAME}
                handleShowSideCart={handleShowSideCart}
            />
        ));
    };

    const getPaginationButtons = () => {
        const totalPages = Math.ceil(totalMenuItemsCount / 6);

        return (<div className={styles['pagination']}>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={queryModel.currentPage === index + 1 ? styles.active : ''}
                >
                    {index + 1}
                </button>
            ))}
        </div>)
    }


    const menuData = () => (
        <Fragment>
            {isLoading && <Loader itemType={itemType} />}

            <FilterSearchBar
                query={queryModel.searchTerm}
                handleSearch={handleSearch}
                handleSort={handleSort}
            />

            <div id={styles['grid-container']}>
                <Sidebar pageType={MENU_PAGE_NAME} />

                <section id={styles.menu} className={styles.grid}>
                    {itemsCollection && getAllMenuItems()}
                </section>
            </div>

            {isSideCartOpen
                && <SideCart
                    isSideCartOpen={isSideCartOpen}
                    handleShowSideCart={handleShowSideCart}
                />
            }


            {getPaginationButtons()}

        </Fragment>
    );

    return menuData();
};

export default Menu;
