export default function StatCard({ icon: Icon, label, value, change }) {
  return (
    <div className="rounded-2xl p-5 border transition-all duration-200 hover:shadow-md" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
          <Icon className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
        </div>
      </div>
      <p className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{value}</p>
      <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{label}</p>
      {change && <p className="text-xs mt-2" style={{ color: 'var(--color-green)' }}>{change}</p>}
    </div>
  )
}
