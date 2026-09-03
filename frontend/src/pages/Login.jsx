import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Shield, Loader2, CheckCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Alert from '../components/Alert'
import Captcha from '../components/Captcha'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [captchaToken, setCaptchaToken] = useState(null)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const { login, loading } = useAuth()
  const navigate = useNavigate()

  const validate = () => {
    const errs = {}
    if (!username.trim()) errs.username = 'Username is required.'
    else if (username.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) errs.username = 'Please enter a valid email address.'
    else if (username.trim().length < 3) errs.username = 'Username must be at least 3 characters.'
    if (!password) errs.password = 'Password is required.'
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters.'
    if (!captchaToken) errs.captcha = 'Please complete the CAPTCHA.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError('')
    if (!validate()) return
    const result = await login(username, password, captchaToken)
    if (result.success) {
      navigate('/dashboard')
    } else {
      setApiError(result.error)
      setCaptchaToken(null)
    }
  }

  const inputStyle = { backgroundColor: 'var(--color-input-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }

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

          {apiError && <div className="mb-4"><Alert type="error" message={apiError} onClose={() => setApiError('')} /></div>}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>
                Username / Email
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter username or email"
                aria-invalid={!!errors.username}
                aria-describedby={errors.username ? 'username-error' : undefined}
                className="w-full px-4 py-3 rounded-xl text-sm border transition-colors duration-200 focus:ring-2 focus:ring-offset-0"
                style={{ ...inputStyle, focusRingColor: 'var(--color-accent)' }}
              />
              {errors.username && <p id="username-error" className="text-xs mt-1 flex items-center gap-1" style={{ color: 'var(--color-error)' }} role="alert">{errors.username}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  className="w-full px-4 py-3 pr-12 rounded-xl text-sm border transition-colors duration-200"
                  style={inputStyle}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 transition-colors" style={{ color: 'var(--color-text-muted)' }} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p id="password-error" className="text-xs mt-1 flex items-center gap-1" style={{ color: 'var(--color-error)' }} role="alert">{errors.password}</p>}
            </div>

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="w-4 h-4 rounded border" style={{ accentColor: 'var(--color-accent)' }} />
                <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Remember me</span>
              </label>
              <button type="button" className="text-sm font-medium transition-colors hover:underline" style={{ color: 'var(--color-accent)' }}>
                Forgot Password?
              </button>
            </div>

            {/* CAPTCHA */}
            <Captcha onVerify={(tok) => setCaptchaToken(tok)} onExpire={() => setCaptchaToken(null)} />
            {errors.captcha && <p className="text-xs flex items-center gap-1" style={{ color: 'var(--color-error)' }} role="alert">{errors.captcha}</p>}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:opacity-90"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              {loading ? (<><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</>) : 'Login'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold hover:underline" style={{ color: 'var(--color-accent)' }}>Register here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
