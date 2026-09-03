export default function ServiceCard({ icon: Icon, title, description, department, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group w-full text-left rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg border"
      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors duration-200 group-hover:scale-105" style={{ backgroundColor: 'var(--color-bg)' }}>
        <Icon className="w-5.5 h-5.5" style={{ color: 'var(--color-primary)' }} />
      </div>
      <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--color-text)' }}>{title}</h3>
      <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-text-muted)' }}>{description}</p>
      {department && <p className="text-xs font-medium mb-3" style={{ color: 'var(--color-text-secondary)' }}>{department}</p>}
      <span className="text-sm font-semibold transition-colors" style={{ color: 'var(--color-accent)' }}>
        View Services →
      </span>
    </button>
  )
}
