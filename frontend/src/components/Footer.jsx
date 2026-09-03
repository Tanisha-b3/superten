import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-primary-dark)', color: '#d1d5db' }}>
      <div className="h-[3px] flex" role="presentation">
        <div className="flex-1" style={{ backgroundColor: 'var(--color-accent)' }} />
        <div className="flex-1 bg-white dark:bg-gray-800" />
        <div className="flex-1" style={{ backgroundColor: 'var(--color-green)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent)' }}>
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Citizen Services Portal</p>
                <p className="text-xs text-gray-500">Government of India</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              A digital platform for accessing government services.
            </p>
          </div>

          {/* Citizen Services */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Citizen Services</h3>
            <ul className="space-y-2.5">
              {['Services', 'Schemes', 'Departments', 'Track Application'].map(item => (
                <li key={item}><Link to="/services" className="text-sm text-gray-400 hover:text-white transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Information</h3>
            <ul className="space-y-2.5">
              {['About', 'Contact', 'Help', 'FAQs'].map(item => (
                <li key={item}><span className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">{item}</span></li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2.5">
              {['Privacy Policy', 'Terms of Use', 'Accessibility', 'Sitemap'].map(item => (
                <li key={item}><span className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">{item}</span></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Citizen Services Portal. Content maintained by the concerned department.
          </p>
          <div className="h-1 flex rounded-full overflow-hidden w-20">
            <div className="flex-1" style={{ backgroundColor: 'var(--color-accent)' }} />
            <div className="flex-1 bg-white" />
            <div className="flex-1" style={{ backgroundColor: 'var(--color-green)' }} />
          </div>
        </div>
      </div>
    </footer>
  )
}
