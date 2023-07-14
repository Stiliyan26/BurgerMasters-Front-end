import styles from './Header.module.css';

import { useAuthContext } from '../../../contexts/AuthContext';
import * as authService from '../../../services/authService';

import { Link, useNavigate } from "react-router-dom";
import { Fragment } from 'react';

const Header = () => {
    const { isAuthenticated, isAdmin, user, logout } = useAuthContext();
    const { token } = user;

    const navigate = useNavigate();

    function handleLogout(e) {
        e.preventDefault();
        
        authService.logout(token)
            .then(() => {
                logout();
                navigate("/");
            });
    }

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
                    <li className={styles['menu-item']}>
                        <Link to="/Menu/Burgers">
                            Burgers <i className="fa-solid fa-burger fa-flip" style={{ color: "#995900", }}></i>
                        </Link>
                    </li>

                    <li className={styles['menu-item']}>
                        <Link to="/Menu/Drinks">
                            Drinks <i className="fa-solid fa-cup-straw-swoosh fa-flip" style={{ color: "#9d0101", }}></i>
                        </Link>
                    </li>

                    <li className={styles['menu-item']}>
                        <Link to="/Menu/Fries">
                            Fries <i className="fa-solid fa-french-fries fa-flip" style={{ color: "#b8b100", }}></i>
                        </Link>
                    </li>

                    <li className={styles['menu-item']}>
                        <Link to="/Menu/Hotdog">
                            Hotdog <i class="fa-duotone fa-hotdog fa-flip"></i>
                        </Link>
                    </li>

                    <li className={styles['menu-item']}>
                        <Link to="/Menu/Grill">
                            Grill <i class="fa-solid fa-sausage fa-flip" style={{ color: '#940a00'}}></i>
                        </Link>
                    </li>
                </ul>
            </li>

            <li className={styles['list-item']}>
                <Link to="/">Cart <i className="fa-solid fa-cart-shopping" style={{ color: "#d5d9de", }}></i></Link>
            </li>

            <li className={styles['list-item']}>
                <Link onClick={handleLogout}>Logout <i className="fa-solid fa-right-from-bracket"></i></Link>
            </li>

            <li className={styles['list-item']}>
                <Link>Hello {user.username}</Link>
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
                <Link to="/">My Posts <i className="fa-light fa-mailbox"></i></Link>
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