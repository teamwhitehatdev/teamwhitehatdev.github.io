import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

// UNIVERSAL WEBKIT / SAFARI / IOS / IPAD POLYFILLS
if (typeof window !== 'undefined') {
  if (!(window as any).globalThis) {
    (window as any).globalThis = window;
  }
}

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
  } catch (err) {
    console.error("DOM RENDER ERROR:", err);
    rootElement.innerHTML = `
      <div style="padding:20px;color:#fff;font-family:sans-serif;text-align:center;">
        <h2 style="color:#06b6d4;">Team WhiteHat Dev</h2>
        <p>Loading application...</p>
      </div>
    `;
  }
}
