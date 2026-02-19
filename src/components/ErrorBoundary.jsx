import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // You could log to an external monitoring service here
    // console.error('ErrorBoundary caught an error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] p-6">
          <div className="max-w-2xl w-full bg-white border border-gray-200 rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-6">The application encountered an unexpected error. Please try reloading the page.</p>
            <div className="flex items-center justify-center gap-4">
              <button onClick={() => window.location.reload()} className="px-5 py-2 bg-[#111827] text-white rounded-lg">Reload</button>
              <a href="/" className="px-5 py-2 border border-gray-200 rounded-lg text-sm text-gray-700">Go Home</a>
            </div>
            <pre className="mt-4 text-xs text-left text-red-600 overflow-auto max-h-40">{String(this.state.error)}</pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
