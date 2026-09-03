import { NavLink } from 'react-router-dom'
import { LayoutDashboard, FileText, FolderOpen, Bell, Settings, LogOut, User, HelpCircle, FileCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/services', icon: FileText, label: 'Services' },
  { to: '/applications', icon: FolderOpen, label: 'My Applications' },
  { to: '/documents', icon: FileCheck, label: 'Documents' },
  { to: '/notifications', icon: Bell, label: 'Notifications' },
  { to: '/profile', icon: User, label: 'Profile' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  const { logout } = useAuth()

  return (
    <aside className="w-64 min-h-screen shrink-0 flex flex-col" style={{ backgroundColor: 'var(--color-sidebar-bg)', color: 'var(--color-sidebar-text)' }}>
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Navigation</p>
        <nav className="space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive ? 'text-white' : 'hover:text-white'
                }`
              }
              style={({ isActive }) => isActive ? { backgroundColor: 'var(--color-sidebar-active)', color: '#fff' } : {}}
            >
              <item.icon className="w-4.5 h-4.5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex-1" />

      <div className="px-5 pb-5">
        <div className="border-t border-white/10 pt-4">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-900/20 transition-all duration-200"
          >
            <LogOut className="w-4.5 h-4.5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  )
}
