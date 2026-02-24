import { styles } from './StatusCard.styles';

function StatusCard({ isActive }) {
    const indicatorStyle = {
        ...styles.indicator,
        ...(isActive ? styles.indicatorActive : styles.indicatorInactive),
    };

    return (
        <div style={styles.card}>
            <div style={indicatorStyle}>
                {isActive && <span className="pulse"></span>}
            </div>
            <h2
                style={styles.title}
                role="status"
                aria-live="polite"
            >
                {isActive ? 'Active and Running' : 'Stopped'}
            </h2>
        </div>
    );
}

export default StatusCard;
