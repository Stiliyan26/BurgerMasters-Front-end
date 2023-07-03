import styles from './Header.module.css';

import { Link } from "react-router-dom";
import { Fragment } from 'react';

import { useEffect } from "react";
import { useAuthContext } from '../../../contexts/AuthContext';

const Header = () => {
    const { isAuthenticated, user } = useAuthContext();

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
                <Link to="/" className={styles['create']}>
                    Create <i className="fa-solid fa-caret-down"></i>
                </Link>

                <ul className={styles['create-dropdown']}>
                    <li className={styles['create-item']}>
                    <Link to="/"><i className="fa-solid fa-plus fa-beat-fade"></i> Burger</Link>
                    </li>

                    <li className={styles['create-item']}>
                        <Link to="/"><i className="fa-solid fa-plus fa-beat-fade"></i> Drink</Link>
                    </li>

                    <li className={styles['create-item']}>
                        <Link to="/"><i className="fa-solid fa-plus fa-beat-fade"></i> Fries</Link>
                    </li>
                </ul>
            </li>
            <li className={styles['list-item']}>
                <div className={styles.menu}>
                    <p className={styles['menu-title']}>Menu</p>
                    <i className="fa-solid fa-bars"></i>
                </div>

                <ul className={styles['menu-dropdown']}>
                    <li className={styles['menu-item']}>
                        <Link to="/">
                            Burgers <i className="fa-solid fa-burger fa-flip" style={{color: "#995900",}}></i>
                        </Link>
                    </li>

                    <li className={styles['menu-item']}>
                        <Link to="/">
                            Drinks <i className="fa-solid fa-cup-straw-swoosh fa-flip" style={{color: "#9d0101",}}></i>
                        </Link>
                    </li>

                    <li className={styles['menu-item']}>
                        <Link to="/">Fries <i className="fa-solid fa-french-fries fa-flip" style={{color: "#b8b100",}}></i></Link>
                    </li>
                </ul>
            </li>

            <li className={styles['list-item']}>
                <Link to="/">Cart <i className="fa-solid fa-cart-shopping" style={{color: "#d5d9de",}}></i></Link>
            </li>

            <li className={styles['list-item']}>
                <Link to="/">My Posts <i className="fa-light fa-mailbox"></i></Link>
            </li>

            <li className={styles['list-item']}>
                <Link to="/Logout">Logout <i className="fa-solid fa-right-from-bracket"></i></Link>
            </li>

            <li className={styles['list-item']}>
                <Link>Hello {user.username}</Link>
            </li>
        </Fragment>
    );

    const showNav = isAuthenticated
        ? userNav
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