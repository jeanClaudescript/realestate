import { useState } from 'react'
import { useToast } from '@/context/ToastContext'
import { useLocale } from '@/context/LocaleContext'
import { Upload, Image, Video, FileText, MapPin, Home, Trees, Building2, Store } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { kigaliNeighborhoods, districts } from '@/lib/rwanda'

const propertyTypes = [
  { id: 'house', label: 'House', icon: Home },
  { id: 'apartment', label: 'Apartment', icon: Building2 },
  { id: 'land', label: 'Land', icon: Trees },
  { id: 'commercial', label: 'Commercial', icon: Store },
]

export function OwnerUploadForm() {
  const { showToast } = useToast()
  const { t } = useLocale()
  const [step, setStep] = useState(1)
  const [type, setType] = useState('house')

  const handleSubmit = () => {
    showToast(t('toast.listingSubmitted'))
    setStep(1)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Steps */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['Details', 'Location', 'Media', 'Survey'].map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setStep(i + 1)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium min-h-[40px] ${
              step === i + 1 ? 'bg-brand-charcoal text-white' : 'bg-brand-cream text-brand-charcoal/60'
            }`}
          >
            {i + 1}. {label}
          </button>
        ))}
      </div>

      {step === 1 && (
        <Card className="p-5 sm:p-6 space-y-5">
          <h3 className="font-display text-lg font-semibold">Property Details</h3>
          <div>
            <label className="text-sm font-medium text-brand-charcoal/70 block mb-2">Property type</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {propertyTypes.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setType(id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 min-h-[80px] ${
                    type === id ? 'border-brand-gold bg-brand-gold/10' : 'border-black/10'
                  }`}
                >
                  <Icon className="w-6 h-6 text-brand-gold-dark" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-brand-charcoal/70 block mb-2">Title</label>
            <input
              type="text"
              placeholder="e.g. Kimihurura Executive Villa"
              className="w-full border border-black/10 rounded-xl px-4 py-3 text-sm min-h-[44px] focus:outline-none focus:border-brand-gold"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-brand-charcoal/70 block mb-2">Price (RWF)</label>
              <input
                type="number"
                placeholder="485000000"
                className="w-full border border-black/10 rounded-xl px-4 py-3 text-sm min-h-[44px] focus:outline-none focus:border-brand-gold"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-brand-charcoal/70 block mb-2">Listing mode</label>
              <select className="w-full border border-black/10 rounded-xl px-4 py-3 text-sm min-h-[44px] focus:outline-none focus:border-brand-gold">
                <option value="buy">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-brand-charcoal/70 block mb-2">Description</label>
            <textarea
              rows={4}
              placeholder="Describe your property..."
              className="w-full border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold resize-y"
            />
          </div>
          <Button variant="primary" fullWidth onClick={() => setStep(2)}>
            Continue to Location
          </Button>
        </Card>
      )}

      {step === 2 && (
        <Card className="p-5 sm:p-6 space-y-5">
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-gold" />
            Location — Rwanda
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-brand-charcoal/70 block mb-2">District</label>
              <select className="w-full border border-black/10 rounded-xl px-4 py-3 text-sm min-h-[44px]">
                {districts.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-brand-charcoal/70 block mb-2">Neighborhood</label>
              <select className="w-full border border-black/10 rounded-xl px-4 py-3 text-sm min-h-[44px]">
                {kigaliNeighborhoods.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-brand-charcoal/70 block mb-2">Plot size (m²)</label>
              <input type="text" placeholder="1200" className="w-full border border-black/10 rounded-xl px-4 py-3 text-sm min-h-[44px]" />
            </div>
            <div>
              <label className="text-sm font-medium text-brand-charcoal/70 block mb-2">Built area (m²)</label>
              <input type="text" placeholder="650" className="w-full border border-black/10 rounded-xl px-4 py-3 text-sm min-h-[44px]" />
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
            <Button variant="primary" className="flex-1" onClick={() => setStep(3)}>Continue to Media</Button>
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card className="p-5 sm:p-6 space-y-5">
          <h3 className="font-display text-lg font-semibold">Photos & Videos</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed border-brand-gold/40 bg-brand-gold/5 cursor-pointer min-h-[160px]">
              <Image className="w-10 h-10 text-brand-gold" />
              <span className="text-sm font-medium text-center">Upload photos</span>
              <span className="text-xs text-brand-charcoal/50">JPG, PNG up to 10MB</span>
              <input type="file" accept="image/*" multiple className="sr-only" />
            </label>
            <label className="flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed border-black/15 bg-brand-cream cursor-pointer min-h-[160px]">
              <Video className="w-10 h-10 text-brand-charcoal/40" />
              <span className="text-sm font-medium text-center">Upload video / 360°</span>
              <span className="text-xs text-brand-charcoal/50">MP4, optional tour</span>
              <input type="file" accept="video/*" className="sr-only" />
            </label>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Back</Button>
            <Button variant="primary" className="flex-1" onClick={() => setStep(4)}>Continue to Survey</Button>
          </div>
        </Card>
      )}

      {step === 4 && (
        <Card className="p-5 sm:p-6 space-y-5">
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-gold" />
            Survey Plans & Documents
          </h3>
          <p className="text-sm text-brand-charcoal/60">
            Upload RDB cadastral survey, plot plan, and title deed for verification & trust score boost.
          </p>
          <label className="flex flex-col items-center justify-center gap-3 p-10 rounded-2xl border-2 border-dashed border-brand-gold/40 bg-brand-gold/5 cursor-pointer">
            <Upload className="w-10 h-10 text-brand-gold" />
            <span className="text-sm font-medium">Drop survey PDF here</span>
            <input type="file" accept=".pdf" className="sr-only" />
          </label>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium block mb-2">Latitude</label>
              <input type="text" placeholder="-1.9361" className="w-full border rounded-xl px-4 py-3 text-sm min-h-[44px]" />
            </div>
            <div>
              <label className="text-sm font-medium block mb-2">Longitude</label>
              <input type="text" placeholder="30.0892" className="w-full border rounded-xl px-4 py-3 text-sm min-h-[44px]" />
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setStep(3)}>Back</Button>
            <Button
              variant="primary"
              className="flex-1 min-h-[48px]"
              icon={<Upload className="w-5 h-5" />}
              onClick={handleSubmit}
            >
              Submit for Verification
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
