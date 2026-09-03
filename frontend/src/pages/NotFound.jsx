import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-[100px] md:text-[140px] font-black leading-none select-none" style={{ color: 'var(--color-border)' }}>404</p>
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Page Not Found</h1>
          <p className="mb-8 max-w-md" style={{ color: 'var(--color-text-muted)' }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
