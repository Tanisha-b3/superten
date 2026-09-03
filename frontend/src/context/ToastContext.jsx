import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

let toastId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'success', duration = 4000) => {
    const id = ++toastId
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none" style={{ maxWidth: '380px' }}>
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function Toast({ toast, onClose }) {
  const colors = {
    success: { bg: 'var(--color-success-bg)', border: 'var(--color-success-border)', text: 'var(--color-success)', icon: '✓' },
    error: { bg: 'var(--color-error-bg)', border: 'var(--color-error-border)', text: 'var(--color-error)', icon: '✗' },
    info: { bg: 'var(--color-info-bg)', border: 'var(--color-info-border)', text: 'var(--color-info)', icon: 'ℹ' },
    warning: { bg: 'var(--color-warning-bg)', border: 'var(--color-warning-border)', text: 'var(--color-warning)', icon: '⚠' },
  }

  const c = colors[toast.type] || colors.success

  return (
    <div
      className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg animate-slide-down"
      style={{ backgroundColor: c.bg, borderColor: c.border }}
      role="alert"
    >
      <span className="w-7 h- rounded-full flex items-center justify-center text-sm font-bold shrink-0" style={{ backgroundColor: c.text, color: '#fff' }}>
        {c.icon}
      </span>
      <p className="text-sm font-medium flex-1" style={{ color: 'var(--color-text)' }}>{toast.message}</p>
      <button onClick={onClose} className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors shrink-0" aria-label="Dismiss">
        <span style={{ color: 'var(--color-text-muted)' }}>✕</span>
      </button>
    </div>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
