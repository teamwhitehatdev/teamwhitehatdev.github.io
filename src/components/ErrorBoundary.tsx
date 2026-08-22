import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('White Hat Dev System Recovery Caught Error:', error, errorInfo);
  }

  private handleRefresh = () => {
    window.location.hash = '#/';
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-950 text-white font-mono flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-gray-900 via-black to-cyan-950/80 border-2 border-cyan-500/50 rounded-3xl p-8 max-w-lg w-full space-y-6 shadow-2xl text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-yellow-500/10 border border-yellow-500/40 flex items-center justify-center text-yellow-400">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black font-rajdhani text-white uppercase tracking-wider">
                SYSTEM RECOVERY ACTIVE
              </h2>
              <p className="text-xs text-gray-400 font-sans">
                A minor rendering exception was isolated by White Hat Dev safety shield. Click below to restore full website state instantly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleRefresh}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-400 to-lime-400 text-black font-extrabold font-rajdhani text-xs uppercase rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>RESTORE & REFRESH WEBSITE</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
