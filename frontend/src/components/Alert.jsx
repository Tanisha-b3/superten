import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react'

const icons = {
  error: AlertCircle,
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
}

const colors = {
  error: { bg: 'var(--color-error-bg)', border: 'var(--color-error-border)', text: 'var(--color-error)' },
  success: { bg: 'var(--color-success-bg)', border: 'var(--color-success-border)', text: 'var(--color-success)' },
  warning: { bg: 'var(--color-warning-bg)', border: 'var(--color-warning-border)', text: 'var(--color-warning)' },
  info: { bg: 'var(--color-info-bg)', border: 'var(--color-info-border)', text: 'var(--color-info)' },
}

export default function Alert({ type = 'info', message, onClose }) {
  const Icon = icons[type]
  const c = colors[type]

  return (
    <div
      className="flex items-start gap-3 p-4 rounded-xl border animate-slide-down"
      style={{ backgroundColor: c.bg, borderColor: c.border }}
      role="alert"
    >
      <Icon className="w-5 h-5 shrink-0 mt-0.5" style={{ color: c.text }} />
      <p className="text-sm flex-1" style={{ color: c.text }}>{message}</p>
      {onClose && (
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-black/5 transition-colors" aria-label="Dismiss">
          <X className="w-4 h-4" style={{ color: c.text }} />
        </button>
      )}
    </div>
  )
}
