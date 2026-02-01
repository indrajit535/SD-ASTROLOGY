import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './Header';
import BottomNavigation from './BottomNavigation';
import Toast from '../Common/Toast';
import Disclaimer from '../Common/Disclaimer';
import ExitConfirmation from '../Common/ExitConfirmation';
import { useBackHandler } from '../../hooks/useBackHandler';
import { colors } from '../../theme/colors';
import '../../theme/glassmorphism.css';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const user = useSelector((state) => state.user);
  const language = useSelector((state) => state.language.current);
  
  // Get current screen to conditionally show header and bottom nav
  const currentPath = location.pathname;
  
  // Hide header and bottom nav on specific screens
  const hideHeader = [
    '/splash',
    '/language',
    '/onboarding',
    '/palm-scan/guide',
    '/palm-scan/upload',
    '/palm-scan/result',
    '/tarot/reveal',
    '/tarot/result',
    '/horoscope/result',
  ].some(path => currentPath.startsWith(path));
  
  const hideBottomNav = [
    '/splash',
    '/language',
    '/onboarding',
    '/user-profile',
    '/palm-scan',
    '/palm-scan/guide',
    '/palm-scan/upload',
    '/palm-scan/result',
    '/ai-chat',
    '/tarot',
    '/tarot/category',
    '/tarot/reveal',
    '/tarot/result',
    '/daily-guidance',
    '/horoscope',
    '/horoscope/selection',
    '/horoscope/result',
    '/settings',
  ].some(path => currentPath.startsWith(path));
  
  // Setup back handler for exit confirmation
  const { handleBackPress } = useBackHandler(
    () => {
      if (currentPath === '/home') {
        setToastMessage(language === 'hi' ? 'बाहर निकलने के लिए फिर से बैक दबाएं' : 'Press back again to exit');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
        setShowExitConfirm(true);
        return true; // Prevent default back
      }
      return false;
    }
  );
  
  useEffect(() => {
    // Add back button listener
    const cleanup = handleBackPress();
    return cleanup;
  }, [currentPath, handleBackPress]);
  
  const handleExitConfirm = (confirm) => {
    setShowExitConfirm(false);
    if (confirm) {
      // Close the app (for PWA)
      if (window.navigator && window.navigator.app) {
        window.navigator.app.exitApp();
      }
      // For browser, we can't close the window, but we can show a message
      setToastMessage(language === 'hi' ? 'ऐप बंद करें' : 'Close the app from browser');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };
  
  return (
    <div className="app-layout" style={styles.container}>
      {/* Background cosmic effect */}
      <div className="cosmic-bg" style={styles.background} />
      
      {/* Main content */}
      <div className="content-wrapper" style={styles.contentWrapper}>
        {!hideHeader && <Header />}
        
        <main className="main-content" style={styles.mainContent}>
          {children}
        </main>
        
        {!hideBottomNav && <BottomNavigation />}
      </div>
      
      {/* Global Components */}
      <Disclaimer />
      
      {showExitConfirm && (
        <ExitConfirmation
          onConfirm={handleExitConfirm}
          language={language}
        />
      )}
      
      {showToast && (
        <Toast
          message={toastMessage}
          duration={2000}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    width: '100%',
    overflow: 'hidden',
  },
  background: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: colors.gradients.dark,
    zIndex: -1,
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'relative',
    zIndex: 1,
  },
  mainContent: {
    flex: 1,
    padding: '16px',
    paddingBottom: '80px', // Space for bottom navigation
    maxWidth: '500px',
    margin: '0 auto',
    width: '100%',
  },
};

// Cosmic background effect styles (will be enhanced with CSS)
const cosmicStyles = `
  .cosmic-bg {
    background: linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #2E1065 100%);
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  
  .cosmic-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.1) 0%, transparent 50%);
    animation: cosmicFloat 20s ease-in-out infinite alternate;
  }
  
  @keyframes cosmicFloat {
    0% {
      transform: translate(0, 0) scale(1);
    }
    100% {
      transform: translate(-50px, -50px) scale(1.1);
    }
  }
  
  .glass-effect {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    background: rgba(26, 31, 64, 0.7);
    border: 1px solid rgba(59, 130, 246, 0.2);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
`;

// Add cosmic styles to document
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = cosmicStyles;
  document.head.appendChild(styleElement);
}

export default AppLayout;
