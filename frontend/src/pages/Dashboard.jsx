import { Bell, FileText, Clock, CheckCircle2, TrendingUp } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import StatCard from '../components/StatCard'
import StatusBadge from '../components/StatusBadge'
import { useAuth } from '../context/AuthContext'

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

const quickActions = [
  { label: 'New Application', icon: FileText, color: 'var(--color-primary)' },
  { label: 'Track Status', icon: TrendingUp, color: 'var(--color-accent)' },
  { label: 'View Notices', icon: Bell, color: 'var(--color-green)' },
]

export default function Dashboard() {
  const { user } = useAuth()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Sidebar />
      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-10 px-6 py-3 border-b flex items-center justify-between" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <h1 className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Dashboard</h1>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg transition-colors" style={{ color: 'var(--color-text-muted)' }} aria-label="Notifications">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-accent)' }} />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l" style={{ borderColor: 'var(--color-border)' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: 'var(--color-accent)' }}>
                {user?.fullName?.charAt(0) || 'U'}
              </div>
              <span className="text-sm font-medium hidden sm:block" style={{ color: 'var(--color-text)' }}>{user?.fullName || 'Citizen'}</span>
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{greeting} 👋</h2>
            <p className="mt-1" style={{ color: 'var(--color-text-muted)' }}>Welcome to your Citizen Dashboard.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {stats.map(stat => (
              <StatCard key={stat.label} icon={stat.icon} label={stat.label} value={stat.value} change={stat.change} />
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
              <h3 className="font-semibold" style={{ color: 'var(--color-text)' }}>Recent Applications</h3>
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
                  {recentApps.map(app => (
                    <tr key={app.name} className="transition-colors hover:opacity-80" style={{ cursor: 'pointer' }}>
                      <td className="px-6 py-4 text-sm font-medium" style={{ color: 'var(--color-text)' }}>{app.name}</td>
                      <td className="px-6 py-4"><StatusBadge status={app.status} /></td>
                      <td className="px-6 py-4 text-sm" style={{ color: 'var(--color-text-muted)' }}>{app.date}</td>
                      <td className="px-6 py-4"><button className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
