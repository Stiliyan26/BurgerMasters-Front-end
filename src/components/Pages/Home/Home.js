import styles from './Home.module.css';

const Home = () => {
    return (
        <div className={styles['slider-frame']}>
            <div className={styles['wrapper']}>
                <img src="/images/burgers/AmericanCheeseBurger.png"></img>
                <img src="/images/burgers/Rusty-Savage.png"></img>
                <img src="/images/burgers/Juicy-Lucy.png"></img>
                <img src="/images/burgers/PineApple.png"></img>
                <img src="/images/burgers/Tripple-Cheese.png"></img>
            </div>
        </div>
    )
}

export default Home;
