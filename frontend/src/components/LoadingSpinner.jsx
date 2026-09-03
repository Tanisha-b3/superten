export default function LoadingSpinner({ size = 'md', text = '' }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' }

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <div className={`${sizes[size]} border-3 rounded-full animate-spin`} style={{ borderColor: 'var(--color-border)', borderTopColor: 'var(--color-accent)' }} />
      {text && <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{text}</p>}
    </div>
  )
}
