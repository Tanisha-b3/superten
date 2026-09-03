import Sidebar from '../components/Sidebar'
import { Bell, FileText, Download, Eye } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const documents = [
  { name: 'Aadhaar Card', type: 'Identity', date: '15 Jan 2024', status: 'verified' },
  { name: 'PAN Card', type: 'Identity', date: '20 Mar 2023', status: 'verified' },
  { name: 'Income Certificate', type: 'Certificate', date: '02 Sep 2026', status: 'verified' },
  { name: 'Residence Proof', type: 'Certificate', date: '01 Sep 2026', status: 'pending' },
  { name: 'Driving License', type: 'License', date: '18 Aug 2026', status: 'verified' },
  { name: 'Ration Card', type: 'Identity', date: '15 Aug 2026', status: 'pending' },
]

export default function Documents() {
  const { user } = useAuth()

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Sidebar />
      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-10 px-6 py-3 border-b flex items-center justify-between" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <h1 className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Documents</h1>
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
            <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>My Documents</h2>
            <p className="mt-1" style={{ color: 'var(--color-text-muted)' }}>Access and manage your uploaded documents</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map(doc => (
              <div key={doc.name} className="rounded-xl border p-5 transition-all duration-200 hover:shadow-md" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
                    <FileText className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: doc.status === 'verified' ? 'var(--color-success-bg)' : 'var(--color-warning-bg)', color: doc.status === 'verified' ? 'var(--color-success)' : 'var(--color-warning)' }}>
                    {doc.status}
                  </span>
                </div>
                <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--color-text)' }}>{doc.name}</h3>
                <p className="text-xs mb-3" style={{ color: 'var(--color-text-muted)' }}>{doc.type} • {doc.date}</p>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                    <Eye className="w-3 h-3" /> View
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                    <Download className="w-3 h-3" /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
