import './styles/global.css';
import { styles } from './App.styles';

import { useSiteState } from './hooks/useSiteState';

import Header from './components/Header/Header';
import StatusCard from './components/StatusCard/StatusCard';
import HostnameBadge from './components/HostnameBadge/HostnameBadge';
import ToggleButton from './components/ToggleButton/ToggleButton';
import Footer from './components/Footer/Footer';

function App() {
  const {
    isActive,
    hostname,
    isLoading,
    toggleSiteExtension
  } = useSiteState();

  return (
    <div style={styles.container}>
      <Header />
      <StatusCard isActive={isActive} />
      <HostnameBadge hostname={hostname} />

      <div style={styles.actionArea}>
        <ToggleButton
          isActive={isActive}
          disabled={isLoading}
          onClick={toggleSiteExtension}
        />
      </div>

      <Footer />
    </div>
  );
}

export default App;
