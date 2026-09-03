import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Bell, User, Save, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Alert from '../components/Alert'

export default function Profile() {
  const { user, updateProfile } = useAuth()
  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    await new Promise(r => setTimeout(r, 500))
    updateProfile(form)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const inputStyle = { backgroundColor: 'var(--color-input-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Sidebar />
      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-10 px-6 py-3 border-b flex items-center justify-between" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <h1 className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Profile</h1>
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

        <div className="p-6 max-w-2xl">
          <div className="mb-6">
            <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Profile Information</h2>
            <p className="mt-1" style={{ color: 'var(--color-text-muted)' }}>Manage your personal details</p>
          </div>

          {saved && <div className="mb-4"><Alert type="success" message="Profile updated successfully." onClose={() => setSaved(false)} /></div>}

          <form onSubmit={handleSave} className="rounded-2xl border p-6 space-y-5" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white" style={{ backgroundColor: 'var(--color-accent)' }}>
                {user?.fullName?.charAt(0) || 'U'}
              </div>
              <div>
                <p className="font-semibold" style={{ color: 'var(--color-text)' }}>{user?.fullName}</p>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{user?.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="profName" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>Full Name</label>
                <input id="profName" type="text" value={form.fullName} onChange={e => update('fullName', e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm border transition-colors" style={inputStyle} />
              </div>
              <div>
                <label htmlFor="profEmail" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>Email</label>
                <input id="profEmail" type="email" value={form.email} onChange={e => update('email', e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm border transition-colors" style={inputStyle} />
              </div>
              <div>
                <label htmlFor="profPhone" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>Phone</label>
                <input id="profPhone" type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="Enter phone number" className="w-full px-4 py-3 rounded-xl text-sm border transition-colors" style={inputStyle} />
              </div>
              <div>
                <label htmlFor="profAddress" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>Address</label>
                <input id="profAddress" type="text" value={form.address} onChange={e => update('address', e.target.value)} placeholder="Enter address" className="w-full px-4 py-3 rounded-xl text-sm border transition-colors" style={inputStyle} />
              </div>
            </div>

            <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 text-white font-semibold rounded-xl transition-all duration-200 hover:opacity-90 disabled:opacity-60" style={{ backgroundColor: 'var(--color-primary)' }}>
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Changes</>}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
