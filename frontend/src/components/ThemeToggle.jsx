import { useTheme } from '../context/ThemeContext'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
      style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)' }}
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <span className="absolute transition-all duration-300" style={{ transform: theme === 'light' ? 'rotate(0deg) scale(1)' : 'rotate(90deg) scale(0)' }}>
        <Sun className="w-5 h-5" />
      </span>
      <span className="absolute transition-all duration-300" style={{ transform: theme === 'dark' ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0)' }}>
        <Moon className="w-5 h-5" />
      </span>
    </button>
  )
}
