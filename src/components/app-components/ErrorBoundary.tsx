'use client'

import React, { Component, ErrorInfo } from 'react'
import { TriangleAlert } from 'lucide-react'
import MainBtn from '@/components/ui/buttons/MainBtn'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
    this.setState({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="relative w-dvw min-h-dvh overflow-hidden flex flex-col justify-center items-center gap-8 bg-black text-text text-center normal-case px-4 py-8">
          <div>
            <TriangleAlert size={160} className="text-main animate-pulse" />
          </div>

          <h1 className="font-bold max-md:text-4xl text-5xl">
            <span>Oops! Something went wrong</span>
          </h1>

          <p className="max-w-2xl text-main text-xl">We are sorry but something unexpected happened. Please try refreshing the page.</p>

          <div className="flex sm:flex-row flex-col justify-center items-center gap-4 mt-12">
            <MainBtn onClick={() => window.location.reload()} look="outline">
              Refresh Page
            </MainBtn>

            <MainBtn
              onClick={() => {
                window.location.href = '/'
              }}
              look="outline"
            >
              Go Home
            </MainBtn>
          </div>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="max-w-2xl text-left mt-8">
              <summary className="font-semibold text-sec mb-2 cursor-pointer">Error Details (Development)</summary>

              <div className="overflow-auto bg-bgLight rounded-lg text-text text-sm p-4">
                <pre className="font-mono text-red-400 whitespace-pre-wrap">{String(this.state.error)}</pre>
                <div className="font-mono text-gray-400 text-xs whitespace-pre-wrap mt-2">{this.state.errorInfo?.componentStack}</div>
              </div>
            </details>
          )}
        </main>
      )
    }

    return this.props.children
  }
}
