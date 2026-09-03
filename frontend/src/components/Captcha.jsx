import { useEffect, useRef, useState } from 'react'
import { ShieldCheck } from 'lucide-react'

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'

export default function Captcha({ onVerify, onExpire }) {
  const [token, setToken] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')
  const containerRef = useRef(null)
  const widgetId = useRef(null)

  useEffect(() => {
    // Load reCAPTCHA script
    if (window.grecaptcha) {
      renderCaptcha()
      return
    }

    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=explicit`
    script.async = true
    script.defer = true
    script.onload = () => renderCaptcha()
    script.onerror = () => setError('Failed to load CAPTCHA. Please refresh.')
    document.head.appendChild(script)

    return () => {
      if (window.grecaptcha && widgetId.current !== null) {
        try { window.grecaptcha.reset(widgetId.current) } catch {}
      }
    }
  }, [])

  function renderCaptcha() {
    if (!containerRef.current || !window.grecaptcha) return
    try {
      widgetId.current = window.grecaptcha.render(containerRef.current, {
        sitekey: RECAPTCHA_SITE_KEY,
        callback: (tok) => { setToken(tok); setError(''); onVerify?.(tok) },
        'expired-callback': () => { setToken(null); onExpire?.() },
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
      })
      setLoaded(true)
    } catch {
      setError('Failed to initialize CAPTCHA.')
    }
  }

  const reset = () => {
    if (window.grecaptcha && widgetId.current !== null) {
      try {
        window.grecaptcha.reset(widgetId.current)
        setToken(null)
        onExpire?.()
      } catch {}
    }
  }

  return (
    <div>
      <div className="rounded-xl border p-4" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
        <div className="flex items-center gap-3 mb-3">
          <ShieldCheck className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
          <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>Security Verification</span>
        </div>
        <div ref={containerRef} className="flex justify-center" />
        {!loaded && !error && (
          <p className="text-xs text-center mt-2" style={{ color: 'var(--color-text-muted)' }}>Loading CAPTCHA...</p>
        )}
        {error && <p className="text-xs text-center mt-2" style={{ color: 'var(--color-error)' }}>{error}</p>}
      </div>
    </div>
  )
}
