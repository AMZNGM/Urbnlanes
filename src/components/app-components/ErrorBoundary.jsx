'use client'

import React from 'react'
import { TriangleAlert } from 'lucide-react'
import MainBtn from '@/components/ui/buttons/MainBtn'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }

    this.containerRef = React.createRef()
    this.iconRef = React.createRef()
    this.h1Ref = React.createRef()
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error)
    this.setState({ error, errorInfo })
  }

  componentDidUpdate() {
    if (!this.state.hasError) return
    if (typeof window === 'undefined') return
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="overflow-hidden">
          <div ref={this.containerRef} className="min-h-screen flex flex-col justify-center items-center bg-bg text-center px-4">
            <div ref={this.iconRef} className="mb-6">
              <TriangleAlert size={160} className="text-main" />
            </div>

            <h1 ref={this.h1Ref} className="font-bold text-main text-4xl md:text-5xl mb-4">
              <span>Oops! Something went wrong</span>
            </h1>

            <p className="max-w-2xl text-text/50 text-base sm:text-lg md:text-xl leading-relaxed mb-8">
              We are sorry, but something unexpected happened. Please try refreshing the page.
            </p>

            <div className="flex sm:flex-row flex-col gap-4">
              <MainBtn onClick={() => window.location.reload()} variant="outline" className="border-main text-main">
                Refresh Page
              </MainBtn>

              <MainBtn
                onClick={() => {
                  window.location.href = '/'
                }}
                variant="outline"
                className="border-main text-main"
              >
                Go Home
              </MainBtn>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="max-w-2xl text-left mt-8">
                <summary className="font-semibold text-sec mb-2 cursor-pointer">Error Details (Development)</summary>

                <div className="overflow-auto bg-bgLight rounded-lg text-sm p-4">
                  <pre className="whitespace-pre-wrap">{String(this.state.error)}</pre>
                  <pre className="whitespace-pre-wrap mt-2">{this.state.errorInfo?.componentStack}</pre>
                </div>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
