import { styles } from './ToggleButton.styles';

function ToggleButton({ isActive, disabled, onClick }) {
    const buttonStyle = {
        ...styles.button,
        ...(isActive ? styles.buttonActive : {}),
    };

    return (
        <button
            style={buttonStyle}
            className={isActive ? 'toggle-btn btn-active' : 'toggle-btn'}
            onClick={onClick}
            disabled={disabled}
            aria-pressed={isActive}
        >
            {isActive ? 'Disable for this site' : 'Enable for this site'}
        </button>
    );
}

export default ToggleButton;
