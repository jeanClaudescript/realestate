import { useEffect } from 'react'
import { X } from 'lucide-react'

interface ListingVideoModalProps {
  open: boolean
  onClose: () => void
  videoUrl: string
  title: string
}

export function ListingVideoModal({ open, onClose, videoUrl, title }: ListingVideoModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85"
      role="dialog"
      aria-modal="true"
      aria-label={`Video: ${title}`}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Close video"
      >
        <X className="w-6 h-6" />
      </button>
      <div
        className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black shadow-luxury"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          key={videoUrl}
          src={videoUrl}
          controls
          autoPlay
          playsInline
          className="w-full h-full object-contain"
          title={title}
        />
      </div>
    </div>
  )
}
