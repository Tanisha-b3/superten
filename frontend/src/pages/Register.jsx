import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, Loader2, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Alert from '../components/Alert'

export default function Register() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const { register, loading } = useAuth()
  const navigate = useNavigate()

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const validate = () => {
    const errs = {}
    if (!form.fullName.trim()) errs.fullName = 'Full name is required.'
    if (!form.email.trim()) errs.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Please enter a valid email address.'
    if (!form.password) errs.password = 'Password is required.'
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters.'
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError('')
    if (!validate()) return
    const result = await register(form.fullName, form.email, form.password)
    if (result.success) navigate('/dashboard')
    else setApiError(result.error)
  }

  const inputStyle = { backgroundColor: 'var(--color-input-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-md rounded-2xl shadow-xl p-8 border animate-scale-in" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <div className="flex items-center gap-3 mb-6 justify-center">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent)' }}>
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>Citizen Services Portal</p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Government of India</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-1" style={{ color: 'var(--color-text)' }}>Create Account</h2>
        <p className="text-sm text-center mb-6" style={{ color: 'var(--color-text-muted)' }}>Register to access citizen services</p>

        {apiError && <div className="mb-4"><Alert type="error" message={apiError} onClose={() => setApiError('')} /></div>}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>Full Name</label>
            <input id="fullName" type="text" value={form.fullName} onChange={e => update('fullName', e.target.value)} placeholder="Enter your full name" aria-invalid={!!errors.fullName} className="w-full px-4 py-3 rounded-xl text-sm border transition-colors" style={inputStyle} />
            {errors.fullName && <p className="text-xs mt-1" style={{ color: 'var(--color-error)' }} role="alert">{errors.fullName}</p>}
          </div>
          <div>
            <label htmlFor="regEmail" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>Email</label>
            <input id="regEmail" type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="Enter your email" aria-invalid={!!errors.email} className="w-full px-4 py-3 rounded-xl text-sm border transition-colors" style={inputStyle} />
            {errors.email && <p className="text-xs mt-1" style={{ color: 'var(--color-error)' }} role="alert">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="regPassword" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>Password</label>
            <div className="relative">
              <input id="regPassword" type={showPassword ? 'text' : 'password'} value={form.password} onChange={e => update('password', e.target.value)} placeholder="Create a password" aria-invalid={!!errors.password} className="w-full px-4 py-3 pr-12 rounded-xl text-sm border transition-colors" style={inputStyle} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1" style={{ color: 'var(--color-text-muted)' }} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs mt-1" style={{ color: 'var(--color-error)' }} role="alert">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>Confirm Password</label>
            <input id="confirmPassword" type="password" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} placeholder="Confirm your password" aria-invalid={!!errors.confirmPassword} className="w-full px-4 py-3 rounded-xl text-sm border transition-colors" style={inputStyle} />
            {errors.confirmPassword && <p className="text-xs mt-1" style={{ color: 'var(--color-error)' }} role="alert">{errors.confirmPassword}</p>}
          </div>

          {/* Password strength */}
          {form.password.length > 0 && (
            <div className="flex gap-4">
              <div className={`flex items-center gap-1.5 text-xs ${form.password.length >= 6 ? 'font-medium' : ''}`} style={{ color: form.password.length >= 6 ? 'var(--color-success)' : 'var(--color-text-muted)' }}>
                <CheckCircle className="w-3.5 h-3.5" /> At least 6 characters
              </div>
              <div className={`flex items-center gap-1.5 text-xs ${form.password === form.confirmPassword && form.confirmPassword ? 'font-medium' : ''}`} style={{ color: form.password === form.confirmPassword && form.confirmPassword ? 'var(--color-success)' : 'var(--color-text-muted)' }}>
                <CheckCircle className="w-3.5 h-3.5" /> Passwords match
              </div>
            </div>
          )}

          <button type="submit" disabled={loading} className="w-full py-3 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating account...</> : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Already have an account? <Link to="/login" className="font-semibold hover:underline" style={{ color: 'var(--color-accent)' }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
