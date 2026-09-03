import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Bell, Sun, Moon, Monitor, Globe, Type, Eye, Lock, Loader2 } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import Alert from '../components/Alert'

export default function Settings() {
  const { theme, setTheme } = useTheme()
  const { user } = useAuth()
  const [lang, setLang] = useState('English')
  const [fontSize, setFontSize] = useState('Medium')
  const [highContrast, setHighContrast] = useState(false)
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setSaving(true)
    await new Promise(r => setTimeout(r, 500))
    setSaving(false)
    setSaved(true)
    setPasswordForm({ current: '', newPass: '', confirm: '' })
    setTimeout(() => setSaved(false), 3000)
  }

  const inputStyle = { backgroundColor: 'var(--color-input-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
  ]

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Sidebar />
      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-10 px-6 py-3 border-b flex items-center justify-between" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <h1 className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Settings</h1>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg" style={{ color: 'var(--color-text-muted)' }} aria-label="Notifications"><Bell className="w-5 h-5" /></button>
            <div className="flex items-center gap-2 pl-3 border-l" style={{ borderColor: 'var(--color-border)' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: 'var(--color-accent)' }}>{user?.fullName?.charAt(0) || 'U'}</div>
            </div>
          </div>
        </header>

        <div className="p-6 max-w-2xl">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>Settings</h2>
          {saved && <div className="mb-4"><Alert type="success" message="Settings saved successfully." onClose={() => setSaved(false)} /></div>}

          {/* Appearance */}
          <section className="rounded-2xl border p-6 mb-6" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
              <Sun className="w-4 h-4" style={{ color: 'var(--color-accent)' }} /> Appearance
            </h3>
            <div className="flex gap-3">
              {themeOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setTheme(opt.value)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all"
                  style={{
                    backgroundColor: theme === opt.value ? 'var(--color-primary)' : 'var(--color-bg)',
                    color: theme === opt.value ? '#fff' : 'var(--color-text)',
                    borderColor: theme === opt.value ? 'var(--color-primary)' : 'var(--color-border)',
                  }}
                >
                  <opt.icon className="w-4 h-4" />
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          {/* Language */}
          <section className="rounded-2xl border p-6 mb-6" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
              <Globe className="w-4 h-4" style={{ color: 'var(--color-accent)' }} /> Language
            </h3>
            <div className="flex gap-3">
              {['English', 'हिन्दी'].map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium border transition-all"
                  style={{
                    backgroundColor: lang === l ? 'var(--color-primary)' : 'var(--color-bg)',
                    color: lang === l ? '#fff' : 'var(--color-text)',
                    borderColor: lang === l ? 'var(--color-primary)' : 'var(--color-border)',
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
          </section>

          {/* Accessibility */}
          <section className="rounded-2xl border p-6 mb-6" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
              <Eye className="w-4 h-4" style={{ color: 'var(--color-accent)' }} /> Accessibility
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>Font Size</label>
                <div className="flex gap-3">
                  {['Small', 'Medium', 'Large'].map(size => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className="px-4 py-2 rounded-lg text-sm font-medium border transition-all"
                      style={{
                        backgroundColor: fontSize === size ? 'var(--color-primary)' : 'var(--color-bg)',
                        color: fontSize === size ? '#fff' : 'var(--color-text)',
                        borderColor: fontSize === size ? 'var(--color-primary)' : 'var(--color-border)',
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={highContrast} onChange={e => setHighContrast(e.target.checked)} className="w-4 h-4 rounded" style={{ accentColor: 'var(--color-accent)' }} />
                <span className="text-sm" style={{ color: 'var(--color-text)' }}>High Contrast Mode</span>
              </label>
            </div>
          </section>

          {/* Security */}
          <section className="rounded-2xl border p-6" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
              <Lock className="w-4 h-4" style={{ color: 'var(--color-accent)' }} /> Change Password
            </h3>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label htmlFor="currentPass" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>Current Password</label>
                <input id="currentPass" type="password" value={passwordForm.current} onChange={e => setPasswordForm(p => ({ ...p, current: e.target.value }))} className="w-full px-4 py-3 rounded-xl text-sm border transition-colors" style={inputStyle} />
              </div>
              <div>
                <label htmlFor="newPass" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>New Password</label>
                <input id="newPass" type="password" value={passwordForm.newPass} onChange={e => setPasswordForm(p => ({ ...p, newPass: e.target.value }))} className="w-full px-4 py-3 rounded-xl text-sm border transition-colors" style={inputStyle} />
              </div>
              <div>
                <label htmlFor="confirmPass" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>Confirm New Password</label>
                <input id="confirmPass" type="password" value={passwordForm.confirm} onChange={e => setPasswordForm(p => ({ ...p, confirm: e.target.value }))} className="w-full px-4 py-3 rounded-xl text-sm border transition-colors" style={inputStyle} />
              </div>
              <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 text-white font-semibold rounded-xl transition-all duration-200 hover:opacity-90 disabled:opacity-60" style={{ backgroundColor: 'var(--color-primary)' }}>
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Updating...</> : 'Update Password'}
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  )
}
