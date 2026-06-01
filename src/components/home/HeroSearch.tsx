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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="glass-dark rounded-3xl p-2 shadow-luxury">
        <div className="flex flex-wrap gap-1 p-1 mb-2">
          {tabs.map(({ id, labelKey, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                activeTab === id
                  ? 'bg-brand-gold text-brand-charcoal'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              {t(labelKey)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 p-2">
          <div className="md:col-span-2 relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 z-10" />
            <input
              list="rwanda-locations"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={t('search.location')}
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-gold/50 min-h-[48px]"
            />
            <datalist id="rwanda-locations">
              {[...kigaliNeighborhoods, ...districts].map((loc) => (
                <option key={loc} value={loc} />
              ))}
            </datalist>
          </div>
          <input
            type="text"
            placeholder={t('search.budget')}
            className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-gold/50"
          />
          <input
            type="text"
            placeholder={t('search.size')}
            className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-gold/50"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 p-2">
          <button
            type="button"
            onClick={() => navigate('/properties')}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-white/70 hover:bg-white/5 text-sm border border-white/10 min-h-[48px]"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {t('search.filters')}
          </button>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            className="sm:flex-1"
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
