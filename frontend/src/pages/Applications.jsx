import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import StatusBadge from '../components/StatusBadge'
import { Bell, User, FileText, Filter } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const applications = [
  { name: 'Birth Certificate', id: 'APP-2026-001', status: 'approved', date: '02 Sep 2026', dept: 'Civil Registry' },
  { name: 'Residence Proof', id: 'APP-2026-002', status: 'pending', date: '01 Sep 2026', dept: 'Revenue Dept' },
  { name: 'Income Certificate', id: 'APP-2026-003', status: 'approved', date: '28 Aug 2026', dept: 'Revenue Dept' },
  { name: 'Caste Certificate', id: 'APP-2026-004', status: 'processing', date: '25 Aug 2026', dept: 'Social Welfare' },
  { name: 'PAN Card', id: 'APP-2026-005', status: 'rejected', date: '20 Aug 2026', dept: 'Income Tax' },
  { name: 'Driving License', id: 'APP-2026-006', status: 'approved', date: '18 Aug 2026', dept: 'Transport' },
  { name: 'Ration Card', id: 'APP-2026-007', status: 'pending', date: '15 Aug 2026', dept: 'Food & Supply' },
]

const filters = ['All', 'Pending', 'Approved', 'Rejected']

export default function Applications() {
  const [activeFilter, setActiveFilter] = useState('All')
  const { user } = useAuth()

  const filtered = activeFilter === 'All' ? applications : applications.filter(a => a.status === activeFilter.toLowerCase())

  const counts = {
    all: applications.length,
    approved: applications.filter(a => a.status === 'approved').length,
    pending: applications.filter(a => a.status === 'pending').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Sidebar />
      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-10 px-6 py-3 border-b flex items-center justify-between" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <h1 className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>My Applications</h1>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg" style={{ color: 'var(--color-text-muted)' }} aria-label="Notifications">
              <Bell className="w-5 h-5" />
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
          <div className="mb-6">
            <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>My Applications</h2>
            <p className="mt-1" style={{ color: 'var(--color-text-muted)' }}>Track and manage all your service applications</p>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Total', value: counts.all, color: 'var(--color-primary)' },
              { label: 'Approved', value: counts.approved, color: 'var(--color-success)' },
              { label: 'Pending', value: counts.pending, color: 'var(--color-warning)' },
              { label: 'Rejected', value: counts.rejected, color: 'var(--color-error)' },
            ].map(item => (
              <div key={item.label} className="rounded-xl p-4 text-center border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                <p className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{item.label}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
                style={{
                  backgroundColor: activeFilter === f ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: activeFilter === f ? '#fff' : 'var(--color-text)',
                  borderColor: activeFilter === f ? 'var(--color-primary)' : 'var(--color-border)',
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-bg)' }}>
                    <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Application ID</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Service</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Department</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Status</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
                  {filtered.map(app => (
                    <tr key={app.id} className="transition-colors hover:opacity-80" style={{ cursor: 'pointer' }}>
                      <td className="px-6 py-4 text-sm font-mono" style={{ color: 'var(--color-primary)' }}>{app.id}</td>
                      <td className="px-6 py-4 text-sm font-medium" style={{ color: 'var(--color-text)' }}>{app.name}</td>
                      <td className="px-6 py-4 text-sm" style={{ color: 'var(--color-text-muted)' }}>{app.dept}</td>
                      <td className="px-6 py-4"><StatusBadge status={app.status} /></td>
                      <td className="px-6 py-4 text-sm" style={{ color: 'var(--color-text-muted)' }}>{app.date}</td>
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
