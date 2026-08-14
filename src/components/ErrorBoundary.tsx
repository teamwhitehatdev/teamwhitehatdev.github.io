import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught React Error:', error, errorInfo);
    try {
      localStorage.removeItem('wh_services');
      localStorage.removeItem('wh_projects');
      localStorage.removeItem('wh_inquiries');
      localStorage.removeItem('wh_banned_ips');
    } catch (e) {}
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px 20px', textAlign: 'center', background: '#090d16', color: '#00f0ff', fontFamily: 'monospace', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#a3e635' }}>⚡ WHITE HAT DEV | AUTOMATIC RECOVERY MODE</h1>
          <p style={{ color: '#cbd5e1', margin: '16px 0', maxWidth: '500px', fontSize: '14px', lineHeight: '1.6' }}>
            A local browser storage cache conflict was detected. Click below to instantly clear cache and restore the website.
          </p>
          <button
            onClick={() => {
              try {
                localStorage.clear();
                sessionStorage.clear();
              } catch (e) {}
              window.location.href = window.location.origin + window.location.pathname;
            }}
            style={{ padding: '14px 28px', background: 'linear-gradient(to right, #22d3ee, #a3e635)', color: '#000', border: 'none', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', fontSize: '14px', textTransform: 'uppercase' }}
          >
            CLEAR CACHE & RELOAD WEBSITE
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
