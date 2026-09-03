import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Shield, Loader2, CheckCircle, AlertCircle, User, Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [apiError, setApiError] = useState('')
  const { login, loading } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const validateUsername = (value) => {
    if (!value.trim()) return 'Username or email is required.'
    if (value.includes('@')) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address.'
    } else {
      if (value.trim().length < 3) return 'Username must be at least 3 characters.'
      if (!/^[a-zA-Z0-9_]+$/.test(value.trim())) return 'Only letters, numbers, and underscores allowed.'
    }
    return ''
  }

  const validatePassword = (value) => {
    if (!value) return 'Password is required.'
    if (value.length < 6) return 'Password must be at least 6 characters.'
    return ''
  }

  const handleUsernameChange = (e) => {
    const v = e.target.value
    setUsername(v)
    setApiError('')
    if (touched.username) setErrors(p => ({ ...p, username: validateUsername(v) }))
  }

  const handlePasswordChange = (e) => {
    const v = e.target.value
    setPassword(v)
    setApiError('')
    if (touched.password) setErrors(p => ({ ...p, password: validatePassword(v) }))
  }

  const handleUsernameBlur = () => {
    setTouched(p => ({ ...p, username: true }))
    setErrors(p => ({ ...p, username: validateUsername(username) }))
  }

  const handlePasswordBlur = () => {
    setTouched(p => ({ ...p, password: true }))
    setErrors(p => ({ ...p, password: validatePassword(password) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError('')

    const uErr = validateUsername(username)
    const pErr = validatePassword(password)
    setTouched({ username: true, password: true })
    setErrors({ username: uErr, password: pErr })
    if (uErr || pErr) return

    const result = await login(username, password)
    if (result.success) {
      addToast('Login successful! Welcome back.', 'success')
      setTimeout(() => navigate('/dashboard'), 500)
    } else {
      setApiError(result.error)
    }
  }

  const hasError = (f) => touched[f] && errors[f]

  const inputCls = (f) => {
    const base = 'w-full px-4 py-3 rounded-xl text-sm border transition-all duration-200 outline-none'
    if (hasError(f)) return `${base} border-red-400 bg-red-50 dark:bg-red-950/20 focus:ring-2 focus:ring-red-200`
    return `${base} focus:ring-2 focus:ring-offset-0`
  }

  const inputStyle = (f) => ({
    backgroundColor: hasError(f) ? undefined : 'var(--color-input-bg)',
    borderColor: hasError(f) ? 'var(--color-error)' : 'var(--color-border)',
    color: 'var(--color-text)',
  })

  const getPasswordStrength = () => {
    if (!password) return null
    let s = 0
    if (password.length >= 6) s++
    if (password.length >= 8) s++
    if (/[A-Z]/.test(password)) s++
    if (/[0-9]/.test(password)) s++
    if (/[^A-Za-z0-9]/.test(password)) s++
    if (s <= 1) return { label: 'Weak', color: 'var(--color-error)', width: '20%' }
    if (s <= 2) return { label: 'Fair', color: 'var(--color-warning)', width: '40%' }
    if (s <= 3) return { label: 'Good', color: 'var(--color-info)', width: '60%' }
    if (s <= 4) return { label: 'Strong', color: 'var(--color-success)', width: '80%' }
    return { label: 'Very Strong', color: 'var(--color-success)', width: '100%' }
  }

  const strength = getPasswordStrength()

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border animate-scale-in" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        {/* Left panel */}
        <div className="hidden md:flex md:w-1/2 p-10 flex-col justify-between" style={{ backgroundColor: 'var(--color-primary-dark)' }}>
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent)' }}>
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">Citizen Services Portal</p>
                <p className="text-xs text-gray-400">Government of India</p>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Welcome Back</h2>
            <p className="text-gray-300 leading-relaxed mb-8">
              Secure access to citizen services. Your digital identity for all government interactions.
            </p>
            <div className="space-y-3">
              {['Secure login with encryption', 'Access 200+ government services', 'Track applications in real-time'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 shrink-0" style={{ color: 'var(--color-accent)' }} />
                  <span className="text-sm text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-1.5 flex rounded-full overflow-hidden">
            <div className="flex-1" style={{ backgroundColor: 'var(--color-accent)' }} />
            <div className="flex-1 bg-white" />
            <div className="flex-1" style={{ backgroundColor: 'var(--color-green)' }} />
          </div>
        </div>

        {/* Right panel - form */}
        <div className="w-full md:w-1/2 p-8 md:p-10">
          <div className="md:hidden flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent)' }}>
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>Citizen Services Portal</p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Government of India</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>Welcome Back</h2>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>Sign in to access your citizen dashboard.</p>

          {apiError && (
            <div className="mb-4 p-3 rounded-xl border flex items-center gap-2 text-sm" style={{ backgroundColor: 'var(--color-error-bg)', borderColor: 'var(--color-error-border)', color: 'var(--color-error)' }}>
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="flex-1">{apiError}</span>
              <button onClick={() => setApiError('')} className="shrink-0 hover:opacity-70">✕</button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>
                Username / Email <span style={{ color: 'var(--color-error)' }}>*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: hasError('username') ? 'var(--color-error)' : 'var(--color-text-muted)' }} />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  onBlur={handleUsernameBlur}
                  placeholder="Enter username or email"
                  autoComplete="username"
                  aria-invalid={hasError('username')}
                  aria-describedby={hasError('username') ? 'username-error' : undefined}
                  className={inputCls('username') + ' pl-10'}
                  style={inputStyle('username')}
                />
              </div>
              {hasError('username') && (
                <p id="username-error" className="flex items-center gap-1 mt-1.5 text-xs" style={{ color: 'var(--color-error)' }} role="alert">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.username}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>
                Password <span style={{ color: 'var(--color-error)' }}>*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: hasError('password') ? 'var(--color-error)' : 'var(--color-text-muted)' }} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  aria-invalid={hasError('password')}
                  aria-describedby={hasError('password') ? 'password-error' : 'password-strength'}
                  className={inputCls('password') + ' pl-10 pr-12'}
                  style={inputStyle('password')}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5" style={{ color: 'var(--color-text-muted)' }} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {password && strength && (
                <div id="password-strength" className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Password strength</span>
                    <span className="text-xs font-medium" style={{ color: strength.color }}>{strength.label}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
                    <div className="h-full rounded-full transition-all duration-300" style={{ width: strength.width, backgroundColor: strength.color }} />
                  </div>
                </div>
              )}

              {hasError('password') && (
                <p id="password-error" className="flex items-center gap-1 mt-1.5 text-xs" style={{ color: 'var(--color-error)' }} role="alert">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.password}
                </p>
              )}
            </div>

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="w-4 h-4 rounded" style={{ accentColor: 'var(--color-accent)' }} />
                <span className="text-sm group-hover:underline" style={{ color: 'var(--color-text-muted)' }}>Remember me</span>
              </label>
              <button type="button" className="text-sm font-medium hover:underline" style={{ color: 'var(--color-accent)' }}>
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              {loading ? (<><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</>) : 'Login'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Don't have an account?{' '}
            <span className="font-semibold hover:underline cursor-pointer" style={{ color: 'var(--color-accent)' }}>Register here</span>
          </p>
        </div>
      </div>
    </div>
  )
}
