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
    console.error('Caught application error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // Fallback gracefully without showing a blocking error UI
      return this.props.children;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
