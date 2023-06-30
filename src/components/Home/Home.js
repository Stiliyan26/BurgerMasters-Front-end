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

// <div className={styles['welcome']}>
//             <h1 className={styles['title']}>Welcome to Pizza Masters</h1>
//             <h3 className={styles['subtitle']}>The best pizza in Bulgaria</h3>
//             <h4>Are you ready to try it?</h4>
//             <button className={styles['btn']}><a>Click here</a></button>
//         </div>