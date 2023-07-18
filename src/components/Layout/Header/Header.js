import styles from './Header.module.css';

import { useAuthContext } from '../../../contexts/AuthContext';
import * as authService from '../../../services/authService';

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
        `${iconNameAndStyle} fa-beat-fade`;

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
            name: 'Sandwich',
            icon: setIcon('fa-solid fa-sandwich', '#a39600'),
            menuRoute: '/Menu/Sandwich',
            myPostsRoute: '/MyPosts/Sandwich'
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
            name: 'Hotdog',
            icon: setIcon('fa-duotone fa-hotdog', ''),
            menuRoute: '/Menu/Hotdog',
            myPostsRoute: '/MyPosts/Hotdog'
        },
        {
            name: 'Grill',
            icon: setIcon('fa-solid fa-sausage', '#940a00'),
            menuRoute: '/Menu/Grill',
            myPostsRoute: '/MyPosts/Grill'
        },
        {
            name: 'Salad',
            icon: setIcon('fa-solid fa-salad', '#1f5125'),
            menuRoute: '/Menu/Salad',
            myPostsRoute: '/MyPosts/Salad'
        }
    ]

    const getPageRoute = (page, itemInfo) => 
        page === 'Menu'
            ? itemInfo.menuRoute
            : itemInfo.myPostsRoute

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
                    {getAllItemsNav('Menu')}
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
                    {getAllItemsNav('MyPosts')}
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