import { styles } from './Footer.styles';

function Footer() {
    return (
        <footer style={styles.footer}>
            <p style={styles.paragraph}>
                Made with ❤️ by <a className="footer-link" href="https://rifatcholakov.com" target="_blank">Rifat Cholakov</a>
            </p>
        </footer>
    );
}

export default Footer;
