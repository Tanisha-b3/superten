const styles = {
  approved: { bg: 'var(--color-success-bg)', text: 'var(--color-success)', border: 'var(--color-success-border)' },
  pending: { bg: 'var(--color-warning-bg)', text: 'var(--color-warning)', border: 'var(--color-warning-border)' },
  rejected: { bg: 'var(--color-error-bg)', text: 'var(--color-error)', border: 'var(--color-error-border)' },
  processing: { bg: 'var(--color-info-bg)', text: 'var(--color-info)', border: 'var(--color-info-border)' },
}

const labels = { approved: 'Approved', pending: 'Pending', rejected: 'Rejected', processing: 'Processing' }

export default function StatusBadge({ status }) {
  const s = styles[status] || styles.pending
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ backgroundColor: s.bg, color: s.text, border: `1px solid ${s.border}` }}
      role="status"
    >
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'pending' || status === 'processing' ? 'animate-pulse' : ''}`} style={{ backgroundColor: s.text }} />
      {labels[status]}
    </span>
  )
}
