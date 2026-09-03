import { useNavigate } from 'react-router-dom'
import { Sun, Moon, LogOut, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { useTheme } from '../context/ThemeContext'

export default function Welcome() {
  const { user, logout } = useAuth()
  const { addToast } = useToast()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    addToast('Logged out successfully.', 'info')
    navigate('/login')
  }

  const usernameDisplay = user?.fullName || user?.username || 'user'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 relative" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Top Controls: Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-2.5 rounded-xl border shadow-xs transition-all duration-200 hover:scale-105 flex items-center gap-2 text-xs font-medium"
        style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
      </button>

      {/* Minimalistic & Professional Card */}
      <div className="w-full max-w-md rounded-2xl border shadow-lg p-8 sm:p-10 text-center animate-scale-in transition-all duration-300" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        {/* Subtle Checkmark Badge */}
        <div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-6 shadow-xs" style={{ backgroundColor: 'var(--color-success-bg)', border: '1px solid var(--color-success-border)' }}>
          <CheckCircle2 className="w-7 h-7" style={{ color: 'var(--color-success)' }} />
        </div>

        {/* Clean Header & Message */}
        <h1 className="text-2xl font-bold tracking-tight mb-2" style={{ color: 'var(--color-text)' }}>
          Hey {usernameDisplay}, you've successfully logged in!
        </h1>

        <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          Your session is active and secure.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full py-3 px-4 rounded-xl text-white font-medium text-sm transition-all duration-200 shadow-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}
