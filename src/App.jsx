import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(['extensionActive'], (result) => {
        setIsActive(result.extensionActive !== false);
      });
    }
  }, []);

  const toggleExtension = () => {
    const newState = !isActive;
    setIsActive(newState);

    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.set({
        extensionActive: newState
      });
    }
  };

  return (
    <div className="extension-container">
      <header className="header">
        <h1>Enable Copy</h1>
        <p className="subtitle">Right-Click & Copy Restore</p>
      </header>

      <div className="status-card">
        <div className={`status-indicator ${isActive ? 'active' : 'inactive'}`}>
          <span className="pulse"></span>
        </div>
        <h2>{isActive ? 'Active and Running' : 'Paused'}</h2>
        <p>This extension automatically intercepts attempts by websites to block you.</p>
      </div>

      <div className="action-area">
        <button className={`toggle-btn ${isActive ? 'btn-active' : ''}`} onClick={toggleExtension}>
          {isActive ? 'Pause Extension' : 'Enable Extension'}
        </button>
      </div>

      <footer className="footer">
        Works on any website automatically!
      </footer>
    </div>
  )
}

export default App
