import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import appReducer from './slices/appSlice';
import languageReducer from './slices/languageSlice';

// Load initial state from localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('aiPalmReaderState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.warn('Failed to load state from localStorage:', err);
    return undefined;
  }
};

// Save state to localStorage
const saveToLocalStorage = (state) => {
  try {
    // Only save non-sensitive data
    const stateToSave = {
      user: {
        name: state.user.name,
        dateOfBirth: state.user.dateOfBirth,
        timeOfBirth: state.user.timeOfBirth,
        gender: state.user.gender,
        isProfileComplete: state.user.isProfileComplete,
      },
      app: {
        hasCompletedOnboarding: state.app.hasCompletedOnboarding,
        lastDailyGuidanceDate: state.app.lastDailyGuidanceDate,
        selectedHand: state.app.selectedHand,
        currentScreen: state.app.currentScreen,
        isDisclaimerAccepted: state.app.isDisclaimerAccepted,
      },
      language: {
        current: state.language.current,
      },
    };
    const serializedState = JSON.stringify(stateToSave);
    localStorage.setItem('aiPalmReaderState', serializedState);
  } catch (err) {
    console.warn('Failed to save state to localStorage:', err);
  }
};

// Initial state
const preloadedState = loadFromLocalStorage() || {
  user: {
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    gender: '',
    isProfileComplete: false,
    palmReadings: [],
    tarotReadings: [],
    chatHistory: [],
  },
  app: {
    hasCompletedOnboarding: false,
    hasSelectedLanguage: false,
    isSplashScreenShown: true,
    lastDailyGuidanceDate: '',
    selectedHand: 'right',
    currentScreen: 'splash',
    isDisclaimerAccepted: false,
    isLoading: false,
    error: null,
    toast: null,
  },
  language: {
    current: 'en',
    available: ['en', 'hi', 'es', 'fr', 'it', 'ko'],
  },
};

const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
    language: languageReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['app/setToast', 'app/clearToast'],
        // Ignore these paths in the state
        ignoredPaths: ['app.toast'],
      },
    }),
});

// Subscribe to store changes to save to localStorage
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

// Clear localStorage on app reset (for development)
export const clearAppStorage = () => {
  localStorage.removeItem('aiPalmReaderState');
  console.log('App storage cleared');
};

// Debug helper to see state changes
if (import.meta.env.DEV) {
  store.subscribe(() => {
    console.log('State changed:', store.getState());
  });
}

export { store };
export default store;
