import { useState, useEffect } from 'react';
import { DEFAULT_ACTIVE_STATE, getSiteKey } from './config';
import './App.css';
import StatusCard from './components/StatusCard/StatusCard';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HostnameBadge from './components/HostnameBadge/HostnameBadge';
import { getCurrentHostname, getSiteState, setSiteState } from './services/chrome';
import ToggleButton from './components/ToggleButton/ToggleButton';

function App() {
  const [isActive, setIsActive] = useState(DEFAULT_ACTIVE_STATE);
  const [siteKey, setSiteKey] = useState(null);
  const [hostname, setHostname] = useState(null);

  useEffect(() => {
    getCurrentHostname().then((host) => {
      if (!host) {
        return;
      }

      const key = getSiteKey(host);

      setHostname(host);
      setSiteKey(key);
      getSiteState(key).then(setIsActive);
    });
  }, []);

  const toggleExtension = () => {
    if (!siteKey) {
      return;
    }

    const newState = !isActive;
    setIsActive(newState);
    setSiteState(siteKey, newState);
  };

  return (
    <div className="extension-container">
      <Header />

      <StatusCard isActive={isActive} />
      <HostnameBadge hostname={hostname} />

      <div className="action-area">
        <ToggleButton
          isActive={isActive}
          disabled={!siteKey}
          onClick={toggleExtension}
        />
      </div>

      <Footer />
    </div>
  )
}

export default App
