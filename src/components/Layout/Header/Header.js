import styles from './Header.module.css';

import { useAuthContext } from '../../../contexts/AuthContext';
import * as authService from '../../../services/authService';
import { MENU_PAGE_NAME, MYPOSTS_PAGE_NAME } from '../../../Constants/globalConstants';

import { Link, useNavigate } from "react-router-dom";
import { Fragment } from 'react';

const Header = () => {
    const { isAuthenticated, isAdmin, user, token, logout } = useAuthContext();

    const navigate = useNavigate();

    function handleLogout(e) {
        e.preventDefault();

        authService.logout(token)
            .then(() => {
                logout();
                navigate("/");
            });
    }

    const iconClassName = (iconNameAndStyle) =>
        `${iconNameAndStyle} fa-bounce`;

    const setIcon = (iconNameAndStyle, color) =>
        <i className={iconClassName(iconNameAndStyle)} style={{ color: color }}></i>

    const itemOptions = [
        {
            name: 'Burgers',
            icon: setIcon('fa-solid fa-burger', '#995900'),
            menuRoute: '/Menu/Burgers',
            myPostsRoute: '/MyPosts/Burgers'
        },
        {
            name: 'Sandwiches',
            icon: setIcon('fa-solid fa-sandwich', '#a39600'),
            menuRoute: '/Menu/Sandwiches',
            myPostsRoute: '/MyPosts/Sandwiches'
        },
        {
            name: 'Drinks',
            icon: setIcon('fa-solid fa-cup-straw-swoosh', '#9d0101'),
            menuRoute: '/Menu/Drinks',
            myPostsRoute: '/MyPosts/Drinks'
        },
        {
            name: 'Fries',
            icon: setIcon('fa-solid fa-french-fries', '#b8b100'),
            menuRoute: '/Menu/Fries',
            myPostsRoute: '/MyPosts/Fries'
        },
        {
            name: 'Hotdogs',
            icon: setIcon('fa-duotone fa-hotdog', ''),
            menuRoute: '/Menu/Hotdogs',
            myPostsRoute: '/MyPosts/Hotdogs'
        },
        {
            name: 'Grills',
            icon: setIcon('fa-solid fa-sausage', '#940a00'),
            menuRoute: '/Menu/Grills',
            myPostsRoute: '/MyPosts/Grills'
        },
        {
            name: 'Salads',
            icon: setIcon('fa-solid fa-salad', '#1f5125'),
            menuRoute: '/Menu/Salads',
            myPostsRoute: '/MyPosts/Salads'
        }
    ]

    const getPageRoute = (page, itemInfo) => {
        switch (page) {
            case MENU_PAGE_NAME:
                return itemInfo.menuRoute;
            case MYPOSTS_PAGE_NAME:
                return itemInfo.myPostsRoute;
        }
    }

    const getAllItemsNav = (page) => {
        return itemOptions
            .map((itemInfo, i) => {
                return (
                    <li key={i} className={styles['menu-item']}>
                        <Link to={getPageRoute(page, itemInfo)}>
                            {itemInfo.name} {itemInfo.icon}
                        </Link>
                    </li>
                )
            })
    };


    const guestNav = (
        <Fragment>
            <li className={styles['list-item']}>
                <Link to="/Register">Register <i className="fa-sharp fa-solid fa-right-to-bracket"></i></Link>
            </li>

            <li className={styles['list-item']}>
                <Link to="/Login">Login <i className="fa-solid fa-right-to-bracket"></i></Link>
            </li>
        </Fragment>
    );

    const userNav = (
        <Fragment>
            <li className={styles['list-item']}>
                <Link>
                    <div className={styles.menu}>
                        <p className={styles['menu-title']}>Menu</p>
                        <i className="fa-solid fa-bars"></i>
                    </div>
                </Link>

                <ul className={styles['menu-dropdown']}>
                    {getAllItemsNav(MENU_PAGE_NAME)}
                </ul>
            </li>

            <li className={styles['list-item']}>
                <Link to="/Cart">Cart <i className="fa-solid fa-cart-shopping" style={{ color: "#d5d9de", }}></i></Link>
            </li>

            <li className={styles['list-item']}>
                <Link onClick={handleLogout}>Logout <i className="fa-solid fa-right-from-bracket"></i></Link>
            </li>

            <li className={styles['list-item']}>
                <Link>Hello, {user.username}!</Link>
            </li>
        </Fragment>
    );

    const adminNav = (
        <Fragment>
            <li className={styles['list-item']}>
                <Link to='/MyOrders' className={styles['create']}>
                    My Orders <i className="fa-sharp fa-solid fa-clock-rotate-left"></i>
                </Link>
            </li>

            <li className={styles['list-item']}>
                <Link to='/OrderHistory' className={styles['create']}>
                    History <i className="fa-sharp fa-solid fa-clock-rotate-left"></i>
                </Link>
            </li>

            <li className={styles['list-item']}>
                <Link to='/Orders' className={styles['create']}>
                    Orders <i className="fa-sharp fa-light fa-clipboard-list fa-bounce"></i>
                </Link>
            </li>

            <li className={styles['list-item']}>
                <Link to='/CreateItem' className={styles['create']}>
                    Create Item <i className="fa-solid fa-plus fa-beat-fade"></i>
                </Link>
            </li>

            <li className={styles['list-item']}>
                <Link>
                    <div className={styles.menu}>
                        <p className={styles['menu-title']}>My Posts</p>
                        <i className="fa-light fa-mailbox"></i>
                    </div>
                </Link>

                <ul className={styles['menu-dropdown']}>
                    {getAllItemsNav(MYPOSTS_PAGE_NAME)}
                </ul>
            </li>

            {userNav}

        </Fragment>
    )

    const showNav = isAuthenticated
        ? isAdmin
            ? adminNav
            : userNav
        : guestNav

    return (
        <header id={styles['header']}>
            <nav className={styles['nav']}>
                <Link to="/">
                    <img className={styles['logo']} src="/images/logo/logo.png" alt="Burger logo"></img>
                </Link>

                <ul className={styles['list']}>
                    <li className={styles['list-item']}>
                        <Link to="/">Home <i className="fa-solid fa-house"></i></Link>
                    </li>

                    {showNav}
                </ul>
            </nav>
        </header>
    )
}

export default Header;