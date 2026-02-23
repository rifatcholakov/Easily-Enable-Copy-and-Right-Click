function ToggleButton({ isActive, disabled, onClick }) {
    return (
        <button
            className={`toggle-btn ${isActive ? 'btn-active' : ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            {isActive ? 'Disable for this site' : 'Enable for this site'}
        </button>
    );
}

export default ToggleButton;
