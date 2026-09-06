import styles from './Footer.module.css'

const Footer = () => {
    return (
        <footer id={styles['footer']}>
            <div className={styles['waves']}>
                <div className={styles['wave']} id={styles['wave1']}></div>
                <div className={styles['wave']} id={styles['wave2']}></div>
                <div className={styles['wave']} id={styles['wave4']}></div>
                <div className={styles['wave']} id={styles['wave4']}></div>
            </div>

            <ul className={styles['social-icons']}>
                <li className={styles['icon']}>
                    <a><ion-icon name="logo-facebook"></ion-icon></a>
                </li>
                <li className={styles['icon']}>
                    <a><ion-icon name="logo-twitter"></ion-icon></a>
                </li>
                <li className={styles['icon']}>
                    <a href="https://www.linkedin.com/in/stiliyan-nikolov-36a0a8270/"><ion-icon name="logo-linkedin"></ion-icon></a>
                </li>
                <li className={styles['icon']}>
                    <a><ion-icon name="logo-instagram"></ion-icon></a>
                </li>
            </ul>

            <ul className={styles['menu']}>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Team</a></li>
                <li><a href="#">Contact</a></li>
            </ul>

            <p>@{(new Date).getFullYear()} BurgerMasters project | All Rights Reserved</p>
        </footer>
    )
}

export default Footer;