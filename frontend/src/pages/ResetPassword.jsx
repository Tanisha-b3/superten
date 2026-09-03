import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { Shield, KeyRound, Lock, Eye, EyeOff, CheckCircle, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { resetPassword, loading } = useAuth()
  const { addToast } = useToast()

  const [token, setToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [apiError, setApiError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const tokenParam = searchParams.get('token')
    if (tokenParam) {
      setToken(tokenParam)
    }
  }, [searchParams])

  const validatePassword = (value) => {
    if (!value) return 'New password is required.'
    if (value.length < 6) return 'Password must be at least 6 characters.'
    return ''
  }

  const validateConfirmPassword = (value, currentNewPassword) => {
    if (!value) return 'Please confirm your new password.'
    if (value !== currentNewPassword) return 'Passwords do not match.'
    return ''
  }

  const validateToken = (value) => {
    if (!value.trim()) return 'Reset token is required.'
    return ''
  }

  const getPasswordStrength = () => {
    if (!newPassword) return null
    let s = 0
    if (newPassword.length >= 6) s++
    if (newPassword.length >= 8) s++
    if (/[A-Z]/.test(newPassword)) s++
    if (/[0-9]/.test(newPassword)) s++
    if (/[^A-Za-z0-9]/.test(newPassword)) s++
    if (s <= 1) return { label: 'Weak', color: 'var(--color-error)', width: '20%' }
    if (s <= 2) return { label: 'Fair', color: 'var(--color-warning)', width: '40%' }
    if (s <= 3) return { label: 'Good', color: 'var(--color-info)', width: '60%' }
    if (s <= 4) return { label: 'Strong', color: 'var(--color-success)', width: '80%' }
    return { label: 'Very Strong', color: 'var(--color-success)', width: '100%' }
  }

  const strength = getPasswordStrength()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError('')

    const tErr = validateToken(token)
    const pErr = validatePassword(newPassword)
    const cErr = validateConfirmPassword(confirmPassword, newPassword)

    setTouched({ token: true, newPassword: true, confirmPassword: true })
    setErrors({ token: tErr, newPassword: pErr, confirmPassword: cErr })

    if (tErr || pErr || cErr) return

    const result = await resetPassword(token.trim(), newPassword)

    if (result.success) {
      setIsSuccess(true)
      addToast(result.message || 'Password reset successfully!', 'success')
    } else {
      setApiError(result.message || result.error || 'Failed to reset password. Token may be invalid or expired.')
    }
  }

  const hasError = (field) => touched[field] && errors[field]

  const inputStyle = (field) => ({
    backgroundColor: hasError(field) ? undefined : 'var(--color-input-bg)',
    borderColor: hasError(field) ? 'var(--color-error)' : 'var(--color-border)',
    color: 'var(--color-text)',
  })

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div
          className="w-full max-w-md rounded-2xl shadow-xl p-8 border animate-scale-in text-center"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--color-success-bg)' }}>
            <CheckCircle className="w-8 h-8" style={{ color: 'var(--color-success)' }} />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Password Reset Successful!</h2>
          <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            Your password has been updated. You can now login with your new password.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3 text-white font-semibold rounded-xl transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Login Now
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div
        className="w-full max-w-md rounded-2xl shadow-xl p-8 border animate-scale-in"
        style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent)' }}>
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>Citizen Services Portal</p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Government of India</p>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>Set New Password</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
          Enter your reset token and choose a strong new password.
        </p>

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

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Reset Token */}
          <div>
            <label htmlFor="token" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>
              Reset Token <span style={{ color: 'var(--color-error)' }}>*</span>
            </label>
            <div className="relative">
              <KeyRound
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: hasError('token') ? 'var(--color-error)' : 'var(--color-text-muted)' }}
              />
              <input
                id="token"
                type="text"
                value={token}
                onChange={(e) => {
                  setToken(e.target.value)
                  if (touched.token) setErrors((p) => ({ ...p, token: validateToken(e.target.value) }))
                }}
                onBlur={() => {
                  setTouched((p) => ({ ...p, token: true }))
                  setErrors((p) => ({ ...p, token: validateToken(token) }))
                }}
                placeholder="e.g. 7ae4d94d-f4a2-4b19-ab6f-ec910adbe9a6"
                className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm border transition-all duration-200 outline-none font-mono text-xs ${
                  hasError('token') ? 'border-red-400 bg-red-50 dark:bg-red-950/20' : ''
                }`}
                style={inputStyle('token')}
              />
            </div>
            {hasError('token') && (
              <p className="flex items-center gap-1 mt-1.5 text-xs" style={{ color: 'var(--color-error)' }}>
                <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.token}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>
              New Password <span style={{ color: 'var(--color-error)' }}>*</span>
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: hasError('newPassword') ? 'var(--color-error)' : 'var(--color-text-muted)' }}
              />
              <input
                id="newPassword"
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => {
                  const val = e.target.value
                  setNewPassword(val)
                  if (touched.newPassword) setErrors((p) => ({ ...p, newPassword: validatePassword(val) }))
                  if (touched.confirmPassword) setErrors((p) => ({ ...p, confirmPassword: validateConfirmPassword(confirmPassword, val) }))
                }}
                onBlur={() => {
                  setTouched((p) => ({ ...p, newPassword: true }))
                  setErrors((p) => ({ ...p, newPassword: validatePassword(newPassword) }))
                }}
                placeholder="Enter new password"
                className={`w-full pl-10 pr-12 py-3 rounded-xl text-sm border transition-all duration-200 outline-none ${
                  hasError('newPassword') ? 'border-red-400 bg-red-50 dark:bg-red-950/20' : ''
                }`}
                style={inputStyle('newPassword')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-black/5"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {newPassword && strength && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Password strength</span>
                  <span className="text-xs font-medium" style={{ color: strength.color }}>{strength.label}</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
                  <div className="h-full rounded-full transition-all duration-300" style={{ width: strength.width, backgroundColor: strength.color }} />
                </div>
              </div>
            )}

            {hasError('newPassword') && (
              <p className="flex items-center gap-1 mt-1.5 text-xs" style={{ color: 'var(--color-error)' }}>
                <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.newPassword}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>
              Confirm New Password <span style={{ color: 'var(--color-error)' }}>*</span>
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: hasError('confirmPassword') ? 'var(--color-error)' : 'var(--color-text-muted)' }}
              />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  const val = e.target.value
                  setConfirmPassword(val)
                  if (touched.confirmPassword) setErrors((p) => ({ ...p, confirmPassword: validateConfirmPassword(val, newPassword) }))
                }}
                onBlur={() => {
                  setTouched((p) => ({ ...p, confirmPassword: true }))
                  setErrors((p) => ({ ...p, confirmPassword: validateConfirmPassword(confirmPassword, newPassword) }))
                }}
                placeholder="Confirm new password"
                className={`w-full pl-10 pr-12 py-3 rounded-xl text-sm border transition-all duration-200 outline-none ${
                  hasError('confirmPassword') ? 'border-red-400 bg-red-50 dark:bg-red-950/20' : ''
                }`}
                style={inputStyle('confirmPassword')}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-black/5"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {hasError('confirmPassword') && (
              <p className="flex items-center gap-1 mt-1.5 text-xs" style={{ color: 'var(--color-error)' }}>
                <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {loading ? (<><Loader2 className="w-4 h-4 animate-spin" /> Resetting Password...</>) : 'Set New Password'}
          </button>
        </form>

        <Link
          to="/login"
          className="w-full py-3 font-semibold rounded-xl transition-all duration-200 mt-3 flex items-center justify-center gap-2 hover:opacity-80"
          style={{ color: 'var(--color-accent)' }}
        >
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </Link>
      </div>
    </div>
  )
}
