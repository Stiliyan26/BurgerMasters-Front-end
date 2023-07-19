import styles from './Sidebar.module.css';

import { MENU_PAGE_NAME, MYPOSTS_PAGE_NAME } from '../../../Constants/globalConstants';

import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ pageType }) => {
    const menu = [
        { name: "Burgers", image: 'Burger.png', menuRoute: '/Menu/Burgers', myPostsRoute: '/MyPosts/Burgers' },
        { name: "Sandwiches", image: 'Sandwich.png', menuRoute: '/Menu/Sandwiches', myPostsRoute: '/MyPosts/Sandwiches' },
        { name: "Fries", image: 'Fries.png', menuRoute: '/Menu/Fries', myPostsRoute: '/MyPosts/Fries' },
        { name: "Drinks", image: 'Drinks.png', menuRoute: '/Menu/Drinks', myPostsRoute: '/MyPosts/Drinks' },
        { name: "Hot-dogs", image: 'Hot-Dog.png', menuRoute: '/Menu/Hotdogs', myPostsRoute: '/MyPosts/Hotdogs' },
        { name: "Grills", image: 'Grill.png', menuRoute: '/Menu/Grills', myPostsRoute: '/MyPosts/Grills' },
        { name: "Salads", image: 'Salad.png', menuRoute: '/Menu/Salads', myPostsRoute: '/MyPosts/Salads' }
    ];

    const getPageRoute = (option) => {
        switch (pageType) {
            case MENU_PAGE_NAME:
                return option.menuRoute;
            case MYPOSTS_PAGE_NAME:
                return option.myPostsRoute
        }
    }

    const getMenuSidebar = () => {
        return menu.map(option => (
            <Fragment key={option.name}>
                <hr className={styles.divider} />

                <Link to={getPageRoute(option)} className={styles['sidebar--wrapper--link']}>
                    <img className={styles['sidebar--img']} src={`/images/menu/${option.image}`} alt={option.name} />
                    <p className={styles['sidebar--subtitle']}>{option.name}</p>
                </Link>
            </Fragment>
        ));
    };

    return (
        <aside id={styles['sidebar']}>
            {getMenuSidebar()}
            <hr className={styles['divider']}></hr>
        </aside>
    );
}

export default Sidebar;