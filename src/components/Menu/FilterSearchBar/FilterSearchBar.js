import styles from './FilterSearchBar.module.css';

import { useState } from 'react';

import { Link } from 'react-router-dom';

const FilterSearchBar = ({ query, handleSearch, handleSort }) => {
    const [isActive, setIsActive] = useState(false);

    const toggleDropdown = () => {
        setIsActive(prevState => !prevState);
    };

    const getDropDownClass = () => {
        return isActive
            ? `${styles.dropdown} ${styles.active}`
            : styles.dropdown;
    };

    const sortMappings = {
        'Price Ascending': 'PriceAscending',
        'Price Descending': 'PriceDescending',
        'Portion size': 'PortionSizeDescending',
        'Name': 'Name',
        'Default': 'Default'
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
                    <div className={styles['categories']}>
                        {Object.keys(sortMappings).map((label, index) => (
                            <Link key={index} onClick={() => handleSort(sortMappings[label])}>
                                <span></span>{label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FilterSearchBar;
