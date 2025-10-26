import React, { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: () => void;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        this.setState({ hasError: true });
        console.error('ErrorBoundary caught an error', error, info);
        this.props.onError?.();
    }

    render() {
        if (this.state.hasError) {
            return <>{this.props.fallback ?? <h1>Something went wrong.</h1>}</>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
