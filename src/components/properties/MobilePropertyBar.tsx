import { Calendar } from 'lucide-react'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { CallButton } from '@/components/ui/CallButton'
import { Button } from '@/components/ui/Button'
import { useLocale } from '@/context/LocaleContext'
import type { Property } from '@/types/property'

interface MobilePropertyBarProps {
  property: Property
  agentPhone: string
  ownerPhone: string
  onBookVisit: () => void
}

/** Sticky bottom CTA bar — visible on phones & tablets */
export function MobilePropertyBar({
  property,
  agentPhone,
  ownerPhone,
  onBookVisit,
}: MobilePropertyBarProps) {
  const { t } = useLocale()

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-black/10 dark:border-white/10 bg-white/95 dark:bg-brand-slate/95 backdrop-blur-xl safe-bottom"
      role="region"
      aria-label="Property actions"
    >
      <div className="flex items-center gap-2 p-3 max-w-lg mx-auto sm:max-w-none sm:px-4">
        <CallButton
          phone={ownerPhone}
          variant="compact"
          label={t('card.call')}
          className="flex-1 min-w-0"
          ariaLabel={t('detail.call')}
        />
        <WhatsAppButton
          phone={agentPhone}
          property={property}
          variant="compact"
          label="WhatsApp"
          className="flex-1 min-w-0"
        />
        <Button
          variant="primary"
          size="md"
          className="flex-1 min-h-[44px] px-2 text-sm"
          icon={<Calendar className="w-4 h-4 shrink-0" />}
          onClick={onBookVisit}
        >
          <span className="truncate hidden min-[380px]:inline">{t('detail.bookVisit')}</span>
          <span className="truncate min-[380px]:hidden">Visit</span>
        </Button>
      </div>
    </div>
  )
}
