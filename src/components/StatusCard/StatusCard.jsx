function StatusCard({ isActive }) {
    return (
        <div className="status-card">
            <div className={`status-indicator ${isActive ? 'active' : 'inactive'}`}>
                <span className="pulse"></span>
            </div>
            <h2>{isActive ? 'Active and Running' : 'Stopped'}</h2>
        </div>
    );
}

export default StatusCard;