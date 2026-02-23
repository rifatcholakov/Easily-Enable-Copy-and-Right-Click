import { styles } from './HostnameBadge.styles';

function HostnameBadge({ hostname }) {
    return (
        <p style={styles.badge}>{hostname}</p>
    );
}

export default HostnameBadge;
