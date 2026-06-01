import { useLocale } from '@/context/LocaleContext'
import { localeLabels, type Locale } from '@/i18n/translations'

const locales: Locale[] = ['en', 'rw', 'fr', 'sw']

interface LanguageSwitcherProps {
  compact?: boolean
  inverted?: boolean
}

export function LanguageSwitcher({ compact, inverted }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useLocale()

  const selectClass = compact
    ? 'text-[11px] font-bold rounded-lg min-h-[36px] min-w-[52px] px-1.5 bg-black/40 text-white border border-white/20 focus:outline-none focus:border-brand-gold'
    : `text-[11px] font-bold rounded-lg min-h-[36px] px-2 border focus:outline-none focus:border-brand-gold ${
        inverted
          ? 'bg-black/30 text-white border-white/20'
          : 'bg-brand-cream dark:bg-white/10 text-brand-charcoal dark:text-white border-black/10 dark:border-white/10'
      }`

  const pillClass = (l: Locale) =>
    `px-2 py-1.5 text-[10px] font-bold rounded-lg min-w-[34px] min-h-[32px] transition-colors ${
      locale === l
        ? 'bg-brand-gold text-brand-charcoal'
        : compact || inverted
          ? 'text-white/70 hover:text-white'
          : 'text-brand-charcoal/50 dark:text-white/60 hover:text-brand-charcoal dark:hover:text-white'
    }`

  return (
    <>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        aria-label={t('lang.choose')}
        className={`lg:hidden ${selectClass}`}
      >
        {locales.map((l) => (
          <option key={l} value={l} className="text-brand-charcoal bg-white">
            {localeLabels[l]}
          </option>
        ))}
      </select>
      <div
        className={`hidden lg:flex rounded-xl p-0.5 gap-0.5 ${
          compact || inverted ? 'bg-black/30' : 'bg-brand-cream dark:bg-white/10'
        }`}
        role="group"
        aria-label={t('lang.choose')}
      >
        {locales.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            className={pillClass(l)}
          >
            {localeLabels[l]}
          </button>
        ))}
      </div>
    </>
  )
}
