import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppLayout from './components/Layout/AppLayout';
import SplashScreen from './components/Layout/SplashScreen';
import LanguageSelection from './screens/LanguageSelection';
import Onboarding from './screens/Onboarding';
import UserProfile from './screens/UserProfile';
import HomeDashboard from './screens/HomeDashboard';

// Palm Scan Screens
import PalmHandSelection from './screens/PalmScan/PalmHandSelection';
import ScanGuide from './screens/PalmScan/ScanGuide';
import ImageUpload from './screens/PalmScan/ImageUpload';
import AnalysisResult from './screens/PalmScan/AnalysisResult';

// AI Chat Screens
import ChatScreen from './screens/AIPalmChat/ChatScreen';

// Tarot Screens
import TarotCategorySelection from './screens/Tarot/TarotCategorySelection';
import CardReveal from './screens/Tarot/CardReveal';
import ReadingResult from './screens/Tarot/ReadingResult';

// Daily Guidance
import DailyGuidanceScreen from './screens/DailyGuidance/DailyGuidanceScreen';

// Horoscope Screens
import ZodiacSelection from './screens/Horoscope/ZodiacSelection';
import HoroscopeResult from './screens/Horoscope/HoroscopeResult';

// Settings Screens
import SettingsScreen from './screens/Settings/SettingsScreen';
import PrivacyPolicy from './screens/Settings/PrivacyPolicy';

import './index.css';

const App = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  
  const appState = useSelector((state) => state.app);
  const userState = useSelector((state) => state.user);
  const languageState = useSelector((state) => state.language);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Handle route protection and redirection
  const getInitialRoute = () => {
    if (!appState.hasCompletedOnboarding) {
      return '/onboarding';
    }
    if (!userState.isProfileComplete) {
      return '/user-profile';
    }
    return '/home';
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <AppLayout>
      <Routes location={location}>
        {/* Initial screens */}
        <Route path="/" element={<Navigate to={getInitialRoute()} replace />} />
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/language" element={<LanguageSelection />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/user-profile" element={<UserProfile />} />
        
        {/* Main Dashboard */}
        <Route path="/home" element={<HomeDashboard />} />
        
        {/* Palm Scan Flow */}
        <Route path="/palm-scan" element={<PalmHandSelection />} />
        <Route path="/palm-scan/guide" element={<ScanGuide />} />
        <Route path="/palm-scan/upload" element={<ImageUpload />} />
        <Route path="/palm-scan/result" element={<AnalysisResult />} />
        
        {/* AI Chat */}
        <Route path="/ai-chat" element={<ChatScreen />} />
        
        {/* Tarot Reading Flow */}
        <Route path="/tarot" element={<TarotCategorySelection />} />
        <Route path="/tarot/category" element={<TarotCategorySelection />} />
        <Route path="/tarot/reveal" element={<CardReveal />} />
        <Route path="/tarot/result" element={<ReadingResult />} />
        
        {/* Daily Guidance */}
        <Route path="/daily-guidance" element={<DailyGuidanceScreen />} />
        
        {/* Horoscope Flow */}
        <Route path="/horoscope" element={<ZodiacSelection />} />
        <Route path="/horoscope/selection" element={<ZodiacSelection />} />
        <Route path="/horoscope/result" element={<HoroscopeResult />} />
        
        {/* Settings */}
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </AppLayout>
  );
};

export default App;
