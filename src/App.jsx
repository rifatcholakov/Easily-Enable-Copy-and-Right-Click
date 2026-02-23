import { useState, useEffect } from 'react';
import { DEFAULT_ACTIVE_STATE, STORAGE_KEY } from './config';
import './App.css';

function App() {
  const [isActive, setIsActive] = useState(DEFAULT_ACTIVE_STATE);

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get([STORAGE_KEY], (result) => {
        setIsActive(result[STORAGE_KEY] === true);
      });
    }
  }, []);

  const toggleExtension = () => {
    const newState = !isActive;
    setIsActive(newState);

    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.set({
        [STORAGE_KEY]: newState
      });
    }
  };

  return (
    <div className="extension-container">
      <header className="header">
        <h1>Easily Enable Copy and Right-Click</h1>
        <p className="subtitle">Works on any website!</p>
      </header>

      <div className="status-card">
        <div className={`status-indicator ${isActive ? 'active' : 'inactive'}`}>
          <span className="pulse"></span>
        </div>
        <h2>{isActive ? 'Active and Running' : 'Stopped'}</h2>
        <p>This extension prevents websites from blocking text copying or right-clicking.</p>
      </div>

      <div className="action-area">
        <button className={`toggle-btn ${isActive ? 'btn-active' : ''}`} onClick={toggleExtension}>
          {isActive ? 'Stop Extension' : 'Enable Extension'}
        </button>
      </div>

      <footer className="footer">
        <p>Made with ❤️ by <a href="https://rifatcholakov.com" target="_blank">Rifat Cholakov</a></p>
      </footer>
    </div>
  )
}

export default App
