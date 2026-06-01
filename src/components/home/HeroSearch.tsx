import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, SlidersHorizontal, Building2, Trees, Home, Store, Car } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { kigaliNeighborhoods, districts } from '@/lib/rwanda'
import { useLocale } from '@/context/LocaleContext'

type Tab = 'buy' | 'rent' | 'land' | 'house' | 'car' | 'commercial'

const tabs: { id: Tab; labelKey: string; icon: typeof Home }[] = [
  { id: 'buy', labelKey: 'hero.tab.buy', icon: Home },
  { id: 'house', labelKey: 'filters.type.house', icon: Home },
  { id: 'car', labelKey: 'hero.tab.car', icon: Car },
  { id: 'rent', labelKey: 'hero.tab.rent', icon: Building2 },
  { id: 'land', labelKey: 'hero.tab.land', icon: Trees },
  { id: 'commercial', labelKey: 'hero.tab.commercial', icon: Store },
]

export function HeroSearch() {
  const { t } = useLocale()
  const [activeTab, setActiveTab] = useState<Tab>('buy')
  const [location, setLocation] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (activeTab === 'rent') params.set('mode', 'rent')
    else if (activeTab === 'buy') params.set('mode', 'buy')
    else params.set('type', activeTab)
    if (location) params.set('location', location)
    navigate(`/properties?${params.toString()}`)
  }

  const inputClass =
    'w-full bg-black/[0.03] dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm sm:text-base text-brand-charcoal dark:text-white placeholder:text-brand-charcoal/40 dark:placeholder:text-white/40 focus:outline-none focus:border-brand-gold/50 min-h-[44px] sm:min-h-[48px]'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="glass-dark rounded-xl sm:rounded-3xl p-1.5 sm:p-2 shadow-luxury">
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-0.5 sm:gap-1 p-0.5 sm:p-1 mb-1 sm:mb-2">
          {tabs.map(({ id, labelKey, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`flex items-center justify-center gap-1 px-1 sm:px-4 py-2 rounded-lg sm:rounded-2xl text-[10px] min-[380px]:text-xs sm:text-sm font-medium min-h-[36px] sm:min-h-[44px] transition-all ${
                activeTab === id
                  ? 'bg-brand-gold text-brand-charcoal'
                  : 'text-brand-charcoal/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="truncate">{t(labelKey)}</span>
            </button>
          ))}
        </div>

        <div className="p-1 sm:p-2">
          <div className="relative">
            <MapPin className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-charcoal/40 dark:text-white/40 z-10 pointer-events-none" />
            <input
              list="rwanda-locations"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={t('search.location')}
              className={`${inputClass} pl-10 sm:pl-11`}
            />
            <datalist id="rwanda-locations">
              {[...kigaliNeighborhoods, ...districts].map((loc) => (
                <option key={loc} value={loc} />
              ))}
            </datalist>
          </div>

          <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-2 gap-2 mt-2">
            <input type="text" placeholder={t('search.budget')} className={inputClass} />
            <input type="text" placeholder={t('search.size')} className={inputClass} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-col gap-1.5 sm:gap-2 p-1 sm:p-2 pt-0 sm:pt-0">
          <button
            type="button"
            onClick={() => navigate('/properties')}
            className="hidden sm:flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-brand-charcoal/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 text-sm border border-black/10 dark:border-white/10 min-h-[48px] w-full"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {t('search.filters')}
          </button>
          <Button
            variant="primary"
            size="md"
            fullWidth
            className="min-h-[44px] sm:min-h-[48px] text-sm sm:text-base"
            icon={<Search className="w-4 h-4 sm:w-5 sm:h-5" />}
            onClick={handleSearch}
          >
            {t('hero.search')}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
