import { styles } from './Header.styles';

function Header() {
    return (
        <header style={styles.header}>
            <h1 style={styles.title}>Easily Enable Copy and Right-Click</h1>
            <p style={styles.subtitle}>
                This extension prevents websites from blocking text copying or right-clicking.
            </p>
        </header>
    );
};

export default Header;
