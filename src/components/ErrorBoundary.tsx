import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught React Error caught by ErrorBoundary:', error, errorInfo);
    try {
      localStorage.removeItem('wh_services');
      localStorage.removeItem('wh_projects');
      localStorage.removeItem('wh_inquiries');
      localStorage.removeItem('wh_banned_ips');
      localStorage.removeItem('whd_app_version');
    } catch (e) {}

    // Auto recover silently once if not already reloaded
    try {
      if (!sessionStorage.getItem('whd_auto_recovered')) {
        sessionStorage.setItem('whd_auto_recovered', 'true');
        window.location.reload();
      }
    } catch (e) {}
  }

  public render() {
    if (this.state.hasError) {
      // If auto-recovery already attempted, render children safely or clean fallback
      return (
        <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center p-6 text-center font-mono">
          <h2 className="text-xl font-bold text-lime-400 mb-2">Team WhiteHat Dev | Portal Reloading...</h2>
          <p className="text-sm text-gray-400 max-w-md mb-4">
            Refreshing application assets. If page does not update automatically, click below:
          </p>
          <button
            onClick={() => {
              try {
                localStorage.clear();
                sessionStorage.clear();
              } catch (e) {}
              window.location.href = window.location.origin + window.location.pathname;
            }}
            className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-lime-400 text-black font-extrabold text-xs uppercase rounded-xl shadow-lg hover:opacity-90 transition-all"
          >
            RELOAD WEBSITE NOW
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
