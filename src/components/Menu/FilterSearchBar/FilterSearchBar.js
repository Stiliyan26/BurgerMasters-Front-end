import styles from './FilterSearchBar.module.css';

import { useState } from 'react';

import { Link } from 'react-router-dom';

const SearchBar = ({ handleSearch, query, setSortQuery }) => {
    const [isActive, setIsActive] = useState(false);

    const toggleDropdown = () => {
        setIsActive(prevState => !prevState);
    };

    const getDropDownClass = () => {
        return isActive 
            ? `${styles.dropdown} ${styles.active}` 
            : styles.dropdown;
    };

    return (
        <section id={styles.filters}>
            <section id={styles.search}>
                <input
                    className={styles['search--inp']}
                    value={query}
                    onChange={handleSearch}
                    type="search"
                    placeholder='Search by name'
                />
                <i className="fa-solid fa-magnifying-glass fa-beat-fade search--icon"></i>
            </section>

            <div className={styles.box}>
                <div onClick={toggleDropdown} className={getDropDownClass()}>
                    Sort by
                    <span className={styles['left-icon']}></span>
                    <span className={styles['right-icon']}></span>
                    <div className={styles.items}>
                        <Link onClick={() => setSortQuery('price ascending')}><span></span>Price Ascending</Link>
                        <Link onClick={() => setSortQuery('price descending')}><span></span>Price Descending</Link>
                        <Link onClick={() => setSortQuery('portionSize')}><span></span>Portion size</Link>
                        <Link onClick={() => setSortQuery('name')}><span></span>Name</Link>
                        <Link onClick={() => setSortQuery('')}><span></span>Reset</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SearchBar;
