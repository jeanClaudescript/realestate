import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, SlidersHorizontal, Building2, Trees, Home, Store } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { kigaliNeighborhoods, districts } from '@/lib/rwanda'
import { useLocale } from '@/context/LocaleContext'

type Tab = 'buy' | 'rent' | 'land' | 'commercial'

const tabs: { id: Tab; labelKey: string; icon: typeof Home }[] = [
  { id: 'buy', labelKey: 'hero.tab.buy', icon: Home },
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
    'w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-base text-white placeholder:text-white/40 focus:outline-none focus:border-brand-gold/50 min-h-[48px]'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="w-full max-w-4xl mx-auto px-0 sm:px-0"
    >
      <div className="glass-dark rounded-2xl sm:rounded-3xl p-2 sm:p-2 shadow-luxury">
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1 p-1 mb-2">
          {tabs.map(({ id, labelKey, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium min-h-[44px] transition-all ${
                activeTab === id
                  ? 'bg-brand-gold text-brand-charcoal'
                  : 'text-white/70 hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{t(labelKey)}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 p-2">
          <div className="sm:col-span-2 relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 z-10 pointer-events-none" />
            <input
              list="rwanda-locations"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={t('search.location')}
              className={`${inputClass} pl-11`}
            />
            <datalist id="rwanda-locations">
              {[...kigaliNeighborhoods, ...districts].map((loc) => (
                <option key={loc} value={loc} />
              ))}
            </datalist>
          </div>
          <input type="text" placeholder={t('search.budget')} className={inputClass} />
          <input type="text" placeholder={t('search.size')} className={inputClass} />
        </div>

        <div className="flex flex-col gap-2 p-2">
          <button
            type="button"
            onClick={() => navigate('/properties')}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-white/70 hover:bg-white/5 text-sm border border-white/10 min-h-[48px] w-full"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {t('search.filters')}
          </button>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            className="min-h-[48px]"
            icon={<Search className="w-5 h-5" />}
            onClick={handleSearch}
          >
            {t('hero.search')}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
