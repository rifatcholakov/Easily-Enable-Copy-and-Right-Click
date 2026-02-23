import { useState, useEffect } from 'react';
import { DEFAULT_ACTIVE_STATE, getSiteKey } from './config';
import './App.css';

function App() {
  const [isActive, setIsActive] = useState(DEFAULT_ACTIVE_STATE);
  const [siteKey, setSiteKey] = useState(null);
  const [hostname, setHostname] = useState(null);

  useEffect(() => {
    if (typeof chrome === 'undefined'
      || !chrome.storage
      || !chrome.tabs
    ) {
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0]?.url) {
        return;
      }

      const hostname = new URL(tabs[0].url).hostname;
      const key = getSiteKey(hostname);
      setSiteKey(key);
      setHostname(hostname);

      chrome.storage.local.get([key], (result) => {
        setIsActive(result[key] === true);
      });

    });
  }, []);

  const toggleExtension = () => {
    if (!siteKey) {
      return;
    }

    const newState = !isActive;
    setIsActive(newState);

    if (typeof chrome === 'undefined' || !chrome.storage) {
      return;
    }

    chrome.storage.local.set({
      [siteKey]: newState
    });
  };

  return (
    <div className="extension-container">
      <header className="header">
        <h1>Easily Enable Copy and Right-Click</h1>
        <p className="subtitle">
          This extension prevents websites from blocking text copying or right-clicking.
        </p>
      </header>

      <div className="status-card">
        <div className={`status-indicator ${isActive ? 'active' : 'inactive'}`}>
          <span className="pulse"></span>
        </div>
        <h2>{isActive ? 'Active and Running' : 'Stopped'}</h2>
      </div>

      <p className="host-badge">{hostname}</p>

      <div className="action-area">
        <button
          className={`toggle-btn ${isActive ? 'btn-active' : ''}`}
          onClick={toggleExtension}
          disabled={!siteKey}
        >
          {isActive ? 'Disable for this site' : 'Enable for this site'}
        </button>
      </div>

      <footer className="footer">
        <p>Made with ❤️ by <a href="https://rifatcholakov.com" target="_blank">Rifat Cholakov</a></p>
      </footer>
    </div>
  )
}

export default App
