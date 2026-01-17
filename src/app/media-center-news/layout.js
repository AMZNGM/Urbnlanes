import Link from 'next/link'
import { getDatabase } from '@/database/urbnlanes-db.json'

export default function MediaCenterLayout({ children }) {
  const db = getDatabase()

  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="bg-black/20 backdrop-blur-sm sticky top-0 z-40 border-b border-text/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="text-text/60 hover:text-text transition-colors duration-200">
              ← Back to Home
            </Link>

            <div className="flex items-center gap-6">
              <Link href="/media-center/news" className="font-medium text-main hover:text-text/80 transition-colors duration-200">
                News
              </Link>
              {/* Add more media center sections here */}
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-black/20 backdrop-blur-sm border-t border-text/10 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-text/60">
          <p>&copy; 2024 Urbnlanes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
