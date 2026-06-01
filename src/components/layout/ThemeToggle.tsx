import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useLocale } from '@/context/LocaleContext'

export function ThemeToggle({ inverted }: { inverted?: boolean }) {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLocale()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`p-2.5 rounded-xl min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors ${
        inverted
          ? 'text-white/80 hover:bg-white/10'
          : 'text-brand-charcoal/70 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10'
      }`}
      aria-label={theme === 'dark' ? t('theme.light') : t('theme.dark')}
    >
      {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  )
}
