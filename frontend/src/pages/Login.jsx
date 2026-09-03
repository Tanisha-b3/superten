import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, Shield, Loader2, CheckCircle, AlertCircle, User, Lock, Sparkles, Check, RefreshCw } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { useTheme } from '../context/ThemeContext'

export default function Login() {
  const navigate = useNavigate()
  const { login, loading } = useAuth()
  const { addToast } = useToast()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [captchaChecked, setCaptchaChecked] = useState(false)
  const [captchaVerifying, setCaptchaVerifying] = useState(false)
  const [captchaError, setCaptchaError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [apiError, setApiError] = useState('')
  const [loginSuccess, setLoginSuccess] = useState(false)

  const validateUsername = (value) => {
    if (!value.trim()) return 'Username or email is required.'
    return ''
  }

  const validatePassword = (value) => {
    if (!value) return 'Password is required.'
    return ''
  }

  const handleUsernameChange = (e) => {
    const v = e.target.value
    setUsername(v)
    setApiError('')
    setLoginSuccess(false)
    if (touched.username) setErrors((p) => ({ ...p, username: validateUsername(v) }))
  }

  const handlePasswordChange = (e) => {
    const v = e.target.value
    setPassword(v)
    setApiError('')
    setLoginSuccess(false)
    if (touched.password) setErrors((p) => ({ ...p, password: validatePassword(v) }))
  }

  const handleUsernameBlur = () => {
    setTouched((p) => ({ ...p, username: true }))
    setErrors((p) => ({ ...p, username: validateUsername(username) }))
  }

  const handlePasswordBlur = () => {
    setTouched((p) => ({ ...p, password: true }))
    setErrors((p) => ({ ...p, password: validatePassword(password) }))
  }

  const handleCaptchaClick = () => {
    if (captchaChecked || captchaVerifying) return
    setCaptchaVerifying(true)
    setCaptchaError(false)

    setTimeout(() => {
      setCaptchaVerifying(false)
      setCaptchaChecked(true)
    }, 600)
  }

  const handleFillTestCredentials = () => {
    setUsername('citizen123')
    setPassword('Password@123')
    setCaptchaChecked(true)
    setCaptchaError(false)
    setErrors({})
    setTouched({})
    setApiError('')
    addToast('Filled seed test credentials: citizen123', 'info')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError('')
    setLoginSuccess(false)

    const uErr = validateUsername(username)
    const pErr = validatePassword(password)
    setTouched({ username: true, password: true })
    setErrors({ username: uErr, password: pErr })

    if (!captchaChecked) {
      setCaptchaError(true)
    }

    if (uErr || pErr || !captchaChecked) return

    const result = await login(username.trim(), password, 'dev-captcha-passed')

    if (result.success) {
      setLoginSuccess(true)
      addToast('Login successful! Redirecting...', 'success')
      setTimeout(() => {
        navigate('/dashboard')
      }, 500)
    } else {
      setApiError(result.message || result.error || 'Invalid username or password')
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

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div
        className="w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border animate-scale-in"
        style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
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
              {['Secure login with JWT encryption', 'Access citizen profile and services', 'Real-time credentials authentication'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 shrink-0" style={{ color: 'var(--color-accent)' }} />
                  <span className="text-sm text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Seed Test Credentials Quick Box */}
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Seed Test Account
              </span>
              <button
                type="button"
                onClick={handleFillTestCredentials}
                className="text-xs px-2 py-1 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-all font-medium"
              >
                Auto-Fill
              </button>
            </div>
            <p className="text-xs text-gray-300 font-mono">
              User: <span className="text-white font-semibold">citizen123</span><br />
              Pass: <span className="text-white font-semibold">Password@123</span>
            </p>
          </div>
        </div>

        {/* Right panel - form */}
        <div className="w-full md:w-1/2 p-8 md:p-10">
          <div className="md:hidden flex items-center gap-3 mb-6">
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

          {/* Mobile Test Credentials Quick Button */}
          <div className="md:hidden mb-4 p-3 rounded-xl border flex items-center justify-between" style={{ backgroundColor: 'var(--color-input-bg)', borderColor: 'var(--color-border)' }}>
            <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
              Test: <strong>citizen123</strong> / <strong>Password@123</strong>
            </span>
            <button
              type="button"
              onClick={handleFillTestCredentials}
              className="text-xs font-semibold px-2 py-1 rounded"
              style={{ backgroundColor: 'var(--color-accent)', color: '#fff' }}
            >
              Fill
            </button>
          </div>

          {apiError && (
            <div
              className="mb-4 p-3 rounded-xl border flex items-center gap-2 text-sm"
              style={{ backgroundColor: 'var(--color-error-bg)', borderColor: 'var(--color-error-border)', color: 'var(--color-error)' }}
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="flex-1">{apiError}</span>
              <button onClick={() => setApiError('')} className="shrink-0 hover:opacity-70">✕</button>
            </div>
          )}

          {loginSuccess && (
            <div
              className="mb-4 p-3 rounded-xl border flex items-center gap-2 text-sm"
              style={{ backgroundColor: 'var(--color-success-bg)', borderColor: 'var(--color-success-border)', color: 'var(--color-success)' }}
            >
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span className="flex-1">Login successful! Redirecting to dashboard...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>
                Username / Email <span style={{ color: 'var(--color-error)' }}>*</span>
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: hasError('username') ? 'var(--color-error)' : 'var(--color-text-muted)' }}
                />
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
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: hasError('password') ? 'var(--color-error)' : 'var(--color-text-muted)' }}
                />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  aria-invalid={hasError('password')}
                  aria-describedby={hasError('password') ? 'password-error' : undefined}
                  className={inputCls('password') + ' pl-10 pr-12'}
                  style={inputStyle('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
                  style={{ color: 'var(--color-text-muted)' }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {hasError('password') && (
                <p id="password-error" className="flex items-center gap-1 mt-1.5 text-xs" style={{ color: 'var(--color-error)' }} role="alert">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.password}
                </p>
              )}
            </div>

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded"
                  style={{ accentColor: 'var(--color-accent)' }}
                />
                <span className="text-sm group-hover:underline" style={{ color: 'var(--color-text-muted)' }}>Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm font-medium hover:underline"
                style={{ color: 'var(--color-accent)' }}
              >
                Forgot Password?
              </Link>
            </div>

            {/* I am not a robot CAPTCHA Widget */}
            <div
              onClick={handleCaptchaClick}
              className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer select-none flex items-center justify-between ${
                captchaError ? 'border-red-400 bg-red-50/50 dark:bg-red-950/20' : 'hover:border-gray-400'
              }`}
              style={{
                backgroundColor: 'var(--color-input-bg)',
                borderColor: captchaError ? 'var(--color-error)' : 'var(--color-border)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-md border flex items-center justify-center transition-all ${
                    captchaChecked
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                      : 'border-gray-400 hover:border-gray-600 bg-white dark:bg-gray-800'
                  }`}
                >
                  {captchaVerifying && <Loader2 className="w-4 h-4 animate-spin text-blue-600" />}
                  {captchaChecked && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
                <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                  I'm not a robot
                </span>
              </div>

              {/* reCAPTCHA Brand Logo */}
              <div className="flex flex-col items-center justify-center text-[10px] text-gray-400 leading-tight">
                <div className="flex items-center gap-1 text-blue-500 mb-0.5">
                  <RefreshCw className="w-3.5 h-3.5 animate-[spin_10s_linear_infinite]" />
                </div>
                <span className="font-semibold text-gray-500 dark:text-gray-400 text-[10px]">reCAPTCHA</span>
                <span className="text-[8px] text-gray-400">Privacy - Terms</span>
              </div>
            </div>

            {captchaError && !captchaChecked && (
              <p className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-error)' }} role="alert">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" /> Please verify that you are not a robot.
              </p>
            )}

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
        </div>
      </div>
    </div>
  )
}
