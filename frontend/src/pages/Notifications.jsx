import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Bell, CheckCircle, AlertTriangle, Info, Clock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const notificationsData = [
  { id: 1, type: 'success', title: 'Application Approved', desc: 'Your Income Certificate application has been approved.', time: '2 hours ago', read: false },
  { id: 2, type: 'warning', title: 'Document Verification Required', desc: 'Please upload your residence proof for the pending application.', time: '5 hours ago', read: false },
  { id: 3, type: 'info', title: 'New Government Scheme', desc: 'A new scholarship scheme has been launched for students.', time: '1 day ago', read: true },
  { id: 4, type: 'success', title: 'Profile Updated', desc: 'Your profile information has been successfully updated.', time: '2 days ago', read: true },
  { id: 5, type: 'error', title: 'Application Rejected', desc: 'Your PAN Card application was rejected. Please review and reapply.', time: '3 days ago', read: true },
  { id: 6, type: 'info', title: 'Maintenance Notice', desc: 'The tax filing portal will be under maintenance on 5 September.', time: '4 days ago', read: true },
]

const icons = { success: CheckCircle, warning: AlertTriangle, info: Info, error: AlertTriangle }
const colors = { success: 'var(--color-success)', warning: 'var(--color-warning)', info: 'var(--color-info)', error: 'var(--color-error)' }

export default function Notifications() {
  const [notifications, setNotifications] = useState(notificationsData)
  const { user } = useAuth()

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Sidebar />
      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-10 px-6 py-3 border-b flex items-center justify-between" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <h1 className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Notifications</h1>
          <div className="flex items-center gap-3">
            <div className="relative p-2 rounded-lg" style={{ color: 'var(--color-text-muted)' }}>
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold text-white flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent)' }}>{unreadCount}</span>}
            </div>
            <div className="flex items-center gap-2 pl-3 border-l" style={{ borderColor: 'var(--color-border)' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: 'var(--color-accent)' }}>
                {user?.fullName?.charAt(0) || 'U'}
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Notifications</h2>
              <p className="mt-1" style={{ color: 'var(--color-text-muted)' }}>{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
            </div>
            <button onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))} className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
              Mark all as read
            </button>
          </div>

          <div className="space-y-3">
            {notifications.map(n => {
              const Icon = icons[n.type]
              return (
                <button
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  className="w-full text-left rounded-xl border p-4 flex items-start gap-4 transition-all duration-200 hover:shadow-sm"
                  style={{ backgroundColor: n.read ? 'var(--color-surface)' : 'var(--color-bg-secondary)', borderColor: 'var(--color-border)' }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--color-bg)' }}>
                    <Icon className="w-5 h-5" style={{ color: colors[n.type] }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{n.title}</h3>
                      {!n.read && <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: 'var(--color-accent)' }} />}
                    </div>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{n.desc}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Clock className="w-3 h-3" style={{ color: 'var(--color-text-muted)' }} />
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{n.time}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
