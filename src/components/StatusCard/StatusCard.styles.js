export const styles = {
    card: {
        backgroundColor: 'var(--card-bg)',
        borderRadius: '12px',
        padding: '20px',
        textAlign: 'center',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
        border: '1px solid var(--card-border)',
        flexGrow: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: '18px',
        margin: '16px 0 8px 0',
    },
    indicator: {
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicatorActive: {
        backgroundColor: 'var(--success-color)',
    },
    indicatorInactive: {
        backgroundColor: 'var(--inactive-color)',
    },
};
