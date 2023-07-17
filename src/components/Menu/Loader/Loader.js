import styles from './Loader.module.css';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';

const Loader = ({itemType}) => {
    const itemIcon = {
        'Burger': <FontAwesomeIcon icon={faHamburger} className={styles['burgerIcon']}/>,
        'Fries': <i id={styles['icon']} className="fa-solid fa-french-fries"></i>,
        'Drink': <i id={styles['icon']} className="fa-duotone fa-glass"></i>,
        'Hotdog': <i id={styles['icon']} className="fa-solid fa-hotdog"></i>,
        'Grill': <i id={styles['icon']} className="fa-solid fa-sausage"></i>,
        'Salad': <i id={styles['icon']} class="fa-solid fa-salad"></i>
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