import './Footer.css'

const Footer = () => {
    return (
        <footer id="footer">
    <div class="info">
        <div class="phone row">
            <i class="fa-solid fa-phone"></i>
            <p>0700-1-2525</p>
        </div>

        <div class="address row">
            <i class="fa-solid fa-location-dot"></i>
            <p>Sofia, Kostenski vodopad 58</p>
        </div>
    </div>

    <div class="follow">
        <h3 class="follow--title">Follow us on</h3>

        <ul class="social-media" role="list">
            <li class="social">
                <i class="fa-brands fa-twitter"></i>
                <p class="social-name">Tweeter</p>
            </li>
            <li class="social">
                <i class="fa-brands fa-facebook"></i>
                <p class="social-name">Facebook</p>
            </li>
            <li class="social">
                <i class="fa-brands fa-instagram"></i>
                <p class="social-name">Instagram</p>
            </li>
            <li class="social">
                <i class="fa-brands fa-youtube"></i>
                <p class="social-name">Youtube</p>
            </li>
        </ul>
    </div>
</footer>
    )
}

export default Footer;