import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Shield, ChevronDown } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [lang, setLang] = useState('English')
  const { isAuthenticated, user, logout } = useAuth()
  const location = useLocation()

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/dashboard', label: 'Dashboard' },
  ]

  return (
    <header className="sticky top-0 z-50">
      {/* Tricolor accent */}
      <div className="h-[3px] flex" role="presentation">
        <div className="flex-1" style={{ backgroundColor: 'var(--color-accent)' }} />
        <div className="flex-1 bg-white dark:bg-gray-800" />
        <div className="flex-1" style={{ backgroundColor: 'var(--color-green)' }} />
      </div>

      <nav style={{ backgroundColor: 'var(--color-primary-dark)', color: '#fff' }} className="shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-105" style={{ backgroundColor: 'var(--color-accent)' }}>
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold leading-tight">Citizen Services Portal</p>
                <p className="text-[11px] text-gray-400 leading-tight">Government of India</p>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.to
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  style={location.pathname === link.to ? { backgroundColor: 'var(--color-accent)' } : {}}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-2">
              {/* Language */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Select language"
                >
                  {lang === 'English' ? 'EN' : 'HI'}
                  <ChevronDown className="w-3 h-3" />
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-1 w-32 rounded-xl shadow-xl border overflow-hidden animate-scale-in" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                    {['English', 'हिन्दी'].map(l => (
                      <button
                        key={l}
                        onClick={() => { setLang(l); setLangOpen(false) }}
                        className="block w-full text-left px-4 py-2.5 text-sm transition-colors"
                        style={{ color: lang === l ? 'var(--color-accent)' : 'var(--color-text)', backgroundColor: lang === l ? 'var(--color-bg)' : 'transparent' }}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Accessibility */}
              <button
                className="px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                title="Accessibility options"
                aria-label="Accessibility options"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </button>

              <ThemeToggle />

              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: 'var(--color-accent)' }}>
                      {user?.fullName?.charAt(0) || 'U'}
                    </div>
                    <span className="hidden lg:block">{user?.fullName?.split(' ')[0]}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-1 w-48 rounded-xl shadow-xl border overflow-hidden animate-scale-in" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                      <Link to="/profile" onClick={() => setProfileOpen(false)} className="block px-4 py-2.5 text-sm transition-colors hover:bg-[var(--color-bg)]" style={{ color: 'var(--color-text)' }}>Profile</Link>
                      <Link to="/dashboard" onClick={() => setProfileOpen(false)} className="block px-4 py-2.5 text-sm transition-colors hover:bg-[var(--color-bg)]" style={{ color: 'var(--color-text)' }}>Dashboard</Link>
                      <Link to="/settings" onClick={() => setProfileOpen(false)} className="block px-4 py-2.5 text-sm transition-colors hover:bg-[var(--color-bg)]" style={{ color: 'var(--color-text)' }}>Settings</Link>
                      <div className="border-t" style={{ borderColor: 'var(--color-border)' }} />
                      <button onClick={() => { logout(); setProfileOpen(false) }} className="block w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-red-50 dark:hover:bg-red-900/20" style={{ color: 'var(--color-error)' }}>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg transition-colors">
                    Login
                  </Link>
                  <Link to="/register" className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-accent)' }}>
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile controls */}
            <div className="flex md:hidden items-center gap-1">
              <ThemeToggle />
              <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors" aria-label="Toggle menu">
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-96 border-t border-white/10' : 'max-h-0'}`}>
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: location.pathname === link.to ? '#fff' : '#d1d5db',
                  backgroundColor: location.pathname === link.to ? 'var(--color-accent)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-white/10 my-2" />
            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 rounded-lg">Profile</Link>
                <Link to="/settings" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 rounded-lg">Settings</Link>
                <button onClick={() => { logout(); setMobileOpen(false) }} className="block w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-900/20 rounded-lg">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 rounded-lg">Login</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm font-medium rounded-lg" style={{ color: 'var(--color-accent)' }}>Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
