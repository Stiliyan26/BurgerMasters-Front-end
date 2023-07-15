import styles from './Loader.module.css';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger, faFrenchFries } from '@fortawesome/free-solid-svg-icons';
import {  } from '@fortawesome/free-solid-svg-icons';

const Loader = ({itemType}) => {
    const itemIcon = {
        'burger': <FontAwesomeIcon icon={faHamburger} className={styles['burgerIcon']}/>,
        'fries': <i id={styles['icon']} className="fa-solid fa-french-fries"></i>,
        'drink': <i id={styles['icon']} className="fa-duotone fa-glass"></i>,
        'hotdog': <i id={styles['icon']} className="fa-solid fa-hotdog"></i>,
        'grill': <i id={styles['icon']} class="fa-solid fa-sausage"></i>
    }

    return (
        <div id={styles['loaderContainer']}>
            <div className={styles['loader']}>
                {itemIcon[itemType]}
            </div>
        </div>
    )
}

export default Loader;