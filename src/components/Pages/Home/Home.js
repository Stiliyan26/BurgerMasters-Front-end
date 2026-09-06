import styles from './Home.module.css';

import { useEffect } from 'react';

const Home = () => {
    useEffect(() => {
        document.title = 'Home';
    }, []);

    const getAllImages = () => {
        const allImages = [
            "/images/burgers/AmericanCheeseBurger.png",
            "/images/burgers/Rusty-Savage.png",
            "/images/burgers/Juicy-Lucy.png",
            "/images/burgers/PineApple.png",
            "/images/burgers/Tripple-Cheese.png"
        ];

        return allImages.map((image, index) => (
            <img
                key={index}
                className={styles['burger-img']}
                src={`${image}`}
                alt="Burger image"
            />
        ));
    }

    return (
        <div className={styles['slider-frame']}>
            <div className={styles['wrapper']}>
                {getAllImages()}
            </div>
        </div>
    )
}

export default Home;
