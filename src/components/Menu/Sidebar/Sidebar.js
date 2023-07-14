import styles from './Sidebar.module.css';

import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const menu = [
        { name: "Burgers", image: 'Burger.png', route: '/Menu/Burgers' },
        { name: "Fries", image: 'Fries.png', route: '/Menu/Fries' },
        { name: "Drinks", image: 'Drinks.png', route: '/Menu/Drinks' },
        { name: "Hot dog", image: 'Hot-Dog.png', route: '/Menu/Hotdog' },
        { name: "Grill", image: 'Grill.png', route: '/Menu/Grill' },
    ];

    const getMenuSidebar = () => {
        return menu.map(option => (
            <Fragment key={option.name}>
                <hr className={styles.divider} />

                <Link to={option.route} className={styles['sidebar--wrapper--link']}>
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