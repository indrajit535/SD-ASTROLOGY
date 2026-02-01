import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './store/store';
import './index.css';

// Register service worker for PWA
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}

// Handle app installation prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Store for later use
  window.deferredPrompt = deferredPrompt;
  
  // Optional: Show install button
  const installEvent = new CustomEvent('pwa:installable', { detail: deferredPrompt });
  window.dispatchEvent(installEvent);
});

// Handle app installed event
window.addEventListener('appinstalled', () => {
  console.log('PWA installed successfully');
  window.deferredPrompt = null;
});

// Handle online/offline status
window.addEventListener('online', () => {
  const event = new CustomEvent('app:online', { detail: true });
  window.dispatchEvent(event);
});

window.addEventListener('offline', () => {
  const event = new CustomEvent('app:offline', { detail: false });
  window.dispatchEvent(event);
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
