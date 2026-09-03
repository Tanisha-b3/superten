import { useNavigate } from 'react-router-dom'
import { Bell, FileText, Clock, CheckCircle2, TrendingUp, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const stats = [
  { icon: FileText, label: 'Applications', value: 12, change: '+2 this week' },
  { icon: Clock, label: 'Pending', value: 3, change: 'Awaiting review' },
  { icon: CheckCircle2, label: 'Completed', value: 9, change: '+1 today' },
]

const recentApps = [
  { name: 'Income Certificate', status: 'approved', date: '02 Sep 2026' },
  { name: 'Residence Certificate', status: 'pending', date: '01 Sep 2026' },
  { name: 'Birth Certificate', status: 'approved', date: '28 Aug 2026' },
  { name: 'Caste Certificate', status: 'processing', date: '25 Aug 2026' },
  { name: 'PAN Card Application', status: 'rejected', date: '20 Aug 2026' },
]

const statusColors = {
  approved: { bg: 'var(--color-success-bg)', text: 'var(--color-success)', border: 'var(--color-success-border)' },
  pending: { bg: 'var(--color-warning-bg)', text: 'var(--color-warning)', border: 'var(--color-warning-border)' },
  rejected: { bg: 'var(--color-error-bg)', text: 'var(--color-error)', border: 'var(--color-error-border)' },
  processing: { bg: 'var(--color-info-bg)', text: 'var(--color-info)', border: 'var(--color-info-border)' },
}

const statusLabels = { approved: 'Approved', pending: 'Pending', rejected: 'Rejected', processing: 'Processing' }

const quickActions = [
  { label: 'New Application', icon: FileText, color: 'var(--color-primary)' },
  { label: 'Track Status', icon: TrendingUp, color: 'var(--color-accent)' },
  { label: 'View Notices', icon: Bell, color: 'var(--color-green)' },
]

export default function Dashboard() {
  const { user, logout } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const handleLogout = () => {
    logout()
    addToast('Logged out successfully.', 'info')
    navigate('/login')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent)' }}>
              <span className="text-white font-bold text-sm">GI</span>
            </div>
            <span className="font-semibold text-sm hidden sm:block" style={{ color: 'var(--color-text)' }}>Citizen Portal</span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg transition-colors hover:bg-[var(--color-bg)]" style={{ color: 'var(--color-text-muted)' }} aria-label="Notifications">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-accent)' }} />
            </button>

            <div className="flex items-center gap-2 pl-3 border-l" style={{ borderColor: 'var(--color-border)' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: 'var(--color-accent)' }}>
                {user?.fullName?.charAt(0) || 'U'}
              </div>
              <span className="text-sm font-medium hidden sm:block" style={{ color: 'var(--color-text)' }}>{user?.fullName || 'Citizen'}</span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
              style={{ color: 'var(--color-error)' }}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--color-text)' }}>{greeting} 👋</h1>
          <p className="mt-1" style={{ color: 'var(--color-text-muted)' }}>Welcome to your Citizen Dashboard.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map(stat => (
            <div key={stat.label} className="rounded-2xl p-5 border transition-all duration-200 hover:shadow-md" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: 'var(--color-bg)' }}>
                <stat.icon className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
              </div>
              <p className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{stat.value}</p>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{stat.label}</p>
              <p className="text-xs mt-2" style={{ color: 'var(--color-green)' }}>{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {quickActions.map(action => (
            <button key={action.label} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: action.color }}>
              <action.icon className="w-4 h-4" />
              {action.label}
            </button>
          ))}
        </div>

        {/* Recent Applications */}
        <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--color-border)' }}>
            <h2 className="font-semibold" style={{ color: 'var(--color-text)' }}>Recent Applications</h2>
            <button className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: 'var(--color-bg)' }}>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Application</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Action</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
                {recentApps.map(app => {
                  const sc = statusColors[app.status]
                  return (
                    <tr key={app.name} className="transition-colors hover:opacity-80 cursor-pointer">
                      <td className="px-6 py-4 text-sm font-medium" style={{ color: 'var(--color-text)' }}>{app.name}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}>
                          <span className={`w-1.5 h-1.5 rounded-full ${app.status === 'pending' || app.status === 'processing' ? 'animate-pulse' : ''}`} style={{ backgroundColor: sc.text }} />
                          {statusLabels[app.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm" style={{ color: 'var(--color-text-muted)' }}>{app.date}</td>
                      <td className="px-6 py-4">
                        <button className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>View</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
