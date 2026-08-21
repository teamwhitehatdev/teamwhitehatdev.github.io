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
    console.error('[Application Recovery] Caught component error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
      window.location.reload();
    } catch (e) {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center p-6 text-center font-mono">
          <div className="max-w-md w-full bg-gray-900/90 border border-cyan-500/40 rounded-3xl p-8 space-y-6 shadow-2xl backdrop-blur-md">
            <div className="w-16 h-16 mx-auto bg-cyan-500/10 border border-cyan-500/40 rounded-2xl flex items-center justify-center text-cyan-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider">TEAM WHITE HAT DEV</h2>
              <p className="text-xs text-cyan-400 font-bold uppercase tracking-widest">SYSTEM RECOVERY MODE</p>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              An application state mismatch was detected. Click below to restore full functionality.
            </p>

            <button
              onClick={this.handleReset}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-xs uppercase rounded-xl shadow-lg hover:brightness-110 transition-all cursor-pointer"
            >
              RESTORE & REFRESH WEBSITE
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
