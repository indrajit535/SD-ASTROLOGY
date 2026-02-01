import { useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Custom hook for handling back button press with double-tap to exit
 * Uses History API for smooth navigation
 */

const useBackHandler = (onBackPress, shouldPreventDefault = true) => {
  const location = useLocation();
  const navigate = useNavigate();
  const lastBackPressTime = useRef(0);
  const isProcessing = useRef(false);

  // Store the current path in history state for proper navigation
  const updateHistoryState = useCallback(() => {
    const state = { 
      path: location.pathname,
      timestamp: Date.now(),
      from: 'app'
    };
    
    // Use History API for PWA navigation
    if (window.history.state?.path !== location.pathname) {
      window.history.pushState(state, '', location.pathname);
    }
  }, [location.pathname]);

  // Handle browser back button and Android back button
  const handleBackButton = useCallback((event) => {
    // Prevent default back behavior if needed
    if (shouldPreventDefault) {
      event.preventDefault();
    }

    // Prevent multiple rapid clicks
    if (isProcessing.current) return;
    isProcessing.current = true;

    const currentTime = Date.now();
    const timeDiff = currentTime - lastBackPressTime.current;

    // Call the custom back press handler
    const shouldPrevent = onBackPress ? onBackPress() : false;

    if (shouldPrevent) {
      // Update last back press time for double-tap detection
      lastBackPressTime.current = currentTime;
      
      // Reset processing flag after a delay
      setTimeout(() => {
        isProcessing.current = false;
      }, 300);
      
      return;
    }

    // Handle normal back navigation
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // If no history, we're at the root - show exit confirmation
      lastBackPressTime.current = currentTime;
      
      // Show exit toast (handled by AppLayout)
      const exitEvent = new CustomEvent('app:exitRequest', {
        detail: { timestamp: currentTime }
      });
      window.dispatchEvent(exitEvent);
    }

    // Reset processing flag
    setTimeout(() => {
      isProcessing.current = false;
    }, 300);
  }, [navigate, onBackPress, shouldPreventDefault]);

  // Handle popstate (browser back/forward)
  const handlePopState = useCallback((event) => {
    if (event.state && event.state.from === 'app') {
      // This is our app navigation, allow it
      return;
    }
    
    // External navigation or initial load
    if (onBackPress) {
      const shouldPrevent = onBackPress();
      if (shouldPrevent) {
        // Prevent navigation and restore state
        window.history.pushState(
          { path: location.pathname, timestamp: Date.now(), from: 'app' },
          '',
          location.pathname
        );
        event.preventDefault();
      }
    }
  }, [location.pathname, onBackPress]);

  // Handle Android hardware back button (for PWA)
  const handleAndroidBackButton = useCallback(() => {
    const event = new Event('backbutton');
    Object.defineProperty(event, 'preventDefault', {
      value: () => {},
      writable: true
    });
    handleBackButton(event);
  }, [handleBackButton]);

  // Setup event listeners
  useEffect(() => {
    // Update history state on location change
    updateHistoryState();

    // Listen for popstate (browser back/forward)
    window.addEventListener('popstate', handlePopState);

    // Listen for backbutton (Cordova/Capacitor for PWA)
    if (window.document.addEventListener) {
      window.document.addEventListener('backbutton', handleAndroidBackButton, false);
    }

    // Add beforeunload for PWA exit confirmation
    const handleBeforeUnload = (event) => {
      // Only show confirmation if user has unsaved data
      // For now, we'll let it close normally
      // event.preventDefault();
      // event.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Handle visibility change (app going to background)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // App is going to background
        const blurEvent = new CustomEvent('app:blur');
        window.dispatchEvent(blurEvent);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (window.document.removeEventListener) {
        window.document.removeEventListener('backbutton', handleAndroidBackButton, false);
      }
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [updateHistoryState, handlePopState, handleAndroidBackButton]);

  // Public API for manual back navigation
  const goBack = useCallback((customAction) => {
    if (customAction && typeof customAction === 'function') {
      customAction();
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      // Fallback to home if no history
      navigate('/home');
    }
  }, [navigate]);

  // Force update history state (useful after certain actions)
  const forceUpdateHistory = useCallback(() => {
    updateHistoryState();
  }, [updateHistoryState]);

  // Check if we can go back
  const canGoBack = useCallback(() => {
    return window.history.length > 1;
  }, []);

  // Get current history state
  const getHistoryState = useCallback(() => {
    return window.history.state;
  }, []);

  return {
    goBack,
    forceUpdateHistory,
    canGoBack,
    getHistoryState,
    handleBackButton: handleBackButton
  };
};

// Utility function for double-tap detection
export const useDoubleTapExit = (exitCallback, delay = 2000) => {
  const lastTapRef = useRef(0);
  const toastTimeoutRef = useRef(null);

  const handleTap = useCallback(() => {
    const currentTime = Date.now();
    const timeDiff = currentTime - lastTapRef.current;

    if (timeDiff < delay) {
      // Double tap detected
      clearTimeout(toastTimeoutRef.current);
      if (exitCallback) exitCallback();
      lastTapRef.current = 0;
    } else {
      // First tap - show toast
      lastTapRef.current = currentTime;
      
      // Show toast (custom event)
      const toastEvent = new CustomEvent('app:showToast', {
        detail: { 
          message: 'Press back again to exit',
          duration: delay 
        }
      });
      window.dispatchEvent(toastEvent);

      // Clear timeout for auto-reset
      toastTimeoutRef.current = setTimeout(() => {
        lastTapRef.current = 0;
      }, delay);
    }

    return timeDiff < delay;
  }, [exitCallback, delay]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  return handleTap;
};

// Higher-order hook for specific screen back handling
export const useScreenBackHandler = (screenConfig) => {
  const {
    screenName,
    onBackOverride,
    preventDefault = true,
    showExitOnRoot = true
  } = screenConfig || {};

  const backHandler = useBackHandler(onBackOverride, preventDefault);

  // Additional screen-specific logic can be added here
  const handleScreenBack = useCallback((customAction) => {
    if (onBackOverride) {
      const shouldOverride = onBackOverride();
      if (shouldOverride) return;
    }
    
    backHandler.goBack(customAction);
  }, [backHandler, onBackOverride]);

  return {
    ...backHandler,
    handleScreenBack,
    screenName
  };
};

export default useBackHandler;
