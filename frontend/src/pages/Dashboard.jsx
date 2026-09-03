import { useNavigate } from 'react-router-dom'
import { Shield, User, LogOut, ShieldCheck, Mail, Hash } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { addToast } = useToast()

  const handleLogout = async () => {
    await logout()
    addToast('Logged out successfully', 'info')
    navigate('/login')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Top Navbar */}
      <header className="border-b" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)' }}>
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight" style={{ color: 'var(--color-text)' }}>Citizen Services Portal</h1>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Government of India • Authorized Session</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all hover:bg-red-50 dark:hover:bg-red-950/20"
            style={{ borderColor: 'var(--color-error-border)', color: 'var(--color-error)' }}
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Welcome Card */}
        <div
          className="rounded-2xl p-6 md:p-8 border shadow-sm flex items-center gap-4"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl shrink-0" style={{ backgroundColor: 'var(--color-info-bg)', color: 'var(--color-primary)' }}>
            <User className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                Welcome, {user?.username || 'Citizen'}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider" style={{ backgroundColor: 'var(--color-success-bg)', color: 'var(--color-success)', border: '1px solid var(--color-success-border)' }}>
                {user?.role || 'ROLE_CITIZEN'}
              </span>
            </div>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
              Your citizen account is verified and active.
            </p>
          </div>
        </div>

        {/* User Details */}
        <div
          className="rounded-2xl p-6 border shadow-sm max-w-2xl"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <h3 className="font-bold text-base mb-4 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
            <ShieldCheck className="w-5 h-5 text-blue-500" /> User Profile Information
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: 'var(--color-input-bg)' }}>
              <span className="text-xs font-medium flex items-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
                <Hash className="w-4 h-4" /> User ID
              </span>
              <span className="font-mono text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                {user?.id || 1}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: 'var(--color-input-bg)' }}>
              <span className="text-xs font-medium flex items-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
                <User className="w-4 h-4" /> Username
              </span>
              <span className="font-mono text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                {user?.username || 'N/A'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: 'var(--color-input-bg)' }}>
              <span className="text-xs font-medium flex items-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
                <Mail className="w-4 h-4" /> Email Address
              </span>
              <span className="font-mono text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                {user?.email || 'citizen@example.com'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: 'var(--color-input-bg)' }}>
              <span className="text-xs font-medium flex items-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
                <Shield className="w-4 h-4" /> Assigned Role
              </span>
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--color-primary-dark)', color: '#fff' }}>
                {user?.role || 'ROLE_CITIZEN'}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
