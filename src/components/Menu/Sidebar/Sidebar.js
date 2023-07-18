import styles from './Sidebar.module.css';

import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ pageType }) => {
    const menu = [
        { name: "Burgers", image: 'Burger.png', menuRoute: '/Menu/Burgers', myPostsRoute: '/MyPosts/Burgers' },
        { name: "Sandwich", image: 'Sandwich.png', menuRoute: '/Menu/Sandwich', myPostsRoute: '/MyPosts/Sandwich' },
        { name: "Fries", image: 'Fries.png', menuRoute: '/Menu/Fries', myPostsRoute: '/MyPosts/Fries' },
        { name: "Drinks", image: 'Drinks.png', menuRoute: '/Menu/Drinks', myPostsRoute: '/MyPosts/Drinks' },
        { name: "Hot-dogs", image: 'Hot-Dog.png', menuRoute: '/Menu/Hotdog', myPostsRoute: '/MyPosts/Hotdog' },
        { name: "Grill", image: 'Grill.png', menuRoute: '/Menu/Grill', myPostsRoute: '/MyPosts/Grill' },
        { name: "Salads", image: 'Salad.png', menuRoute: '/Menu/Salad', myPostsRoute: '/MyPosts/Salad' }
    ];

    const getPageRoute = (option) =>
        pageType === 'Menu'
            ? option.menuRoute
            : option.myPostsRoute;


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