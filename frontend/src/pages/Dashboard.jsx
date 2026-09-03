import { useNavigate } from 'react'
import { Shield, CheckCircle2, LogOut, Sun, Moon, User, Mail, ShieldCheck, Laptop } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { useTheme } from '../context/ThemeContext'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const { addToast } = useToast()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    addToast('Logged out successfully.', 'info')
    navigate('/login')
  }

  const userName = user?.fullName || user?.username || 'User'

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b shadow-sm backdrop-blur-md" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Portal Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: 'var(--color-accent)' }}>
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm sm:text-base leading-tight" style={{ color: 'var(--color-text)' }}>
                Citizen Services Portal
              </p>
              <p className="text-xs hidden sm:block" style={{ color: 'var(--color-text-muted)' }}>
                Government of India
              </p>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/welcome')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all hover:opacity-80"
              style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Welcome Page</span>
            </button>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border transition-all duration-200 hover:scale-105 flex items-center gap-2 text-xs font-semibold"
              style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              aria-label="Toggle light/dark mode"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              <span className="hidden md:inline">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            {/* User Profile Badge */}
            <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l" style={{ borderColor: 'var(--color-border)' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm" style={{ backgroundColor: 'var(--color-accent)' }}>
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                {userName}
              </span>
            </div>

            {/* Header Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 border border-transparent hover:border-red-200 dark:hover:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/40"
              style={{ color: 'var(--color-error)' }}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-xl rounded-3xl shadow-xl border overflow-hidden animate-scale-in" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          {/* Top Decorative Tri-Color Bar */}
          <div className="h-2 flex">
            <div className="flex-1" style={{ backgroundColor: 'var(--color-accent)' }} />
            <div className="flex-1" style={{ backgroundColor: 'var(--color-surface)' }} />
            <div className="flex-1" style={{ backgroundColor: 'var(--color-green)' }} />
          </div>

          <div className="p-8 sm:p-10 text-center flex flex-col items-center">
            {/* Success Icon Badge */}
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: 'var(--color-success-bg)', border: '2px solid var(--color-success-border)' }}>
                <CheckCircle2 className="w-10 h-10 animate-fade-in" style={{ color: 'var(--color-success)' }} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-white shadow" style={{ backgroundColor: 'var(--color-accent)' }}>
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            {/* Success Message */}
            <h1 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight" style={{ color: 'var(--color-text)' }}>
              Hey {userName}! You logged in successfully!
            </h1>
            <p className="text-sm max-w-md mb-8 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              Welcome to your Citizen Services Dashboard. Your identity has been verified and your secure session is currently active.
            </p>

            {/* Account Details Box */}
            <div className="w-full rounded-2xl p-5 mb-8 border text-left space-y-3" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
              <div className="flex items-center justify-between text-sm py-1 border-b" style={{ borderColor: 'var(--color-border)' }}>
                <div className="flex items-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
                  <User className="w-4 h-4" />
                  <span>Account Name</span>
                </div>
                <span className="font-semibold" style={{ color: 'var(--color-text)' }}>
                  {userName}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm py-1 border-b" style={{ borderColor: 'var(--color-border)' }}>
                <div className="flex items-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
                  <Mail className="w-4 h-4" />
                  <span>Email / ID</span>
                </div>
                <span className="font-mono text-xs font-medium" style={{ color: 'var(--color-text)' }}>
                  {user?.email || user?.username || 'N/A'}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm py-1">
                <div className="flex items-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Status</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: 'var(--color-success-bg)', color: 'var(--color-success)', border: '1px solid var(--color-success-border)' }}>
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-success)' }} />
                  Authenticated & Active
                </span>
              </div>
            </div>

            {/* Logout Action Button */}
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto px-8 py-3.5 text-white font-semibold rounded-xl shadow-md transition-all duration-200 hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2.5"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
