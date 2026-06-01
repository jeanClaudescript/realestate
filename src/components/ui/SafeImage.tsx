import { useState, useEffect, type ImgHTMLAttributes } from 'react'
import { propertyImage } from '@/lib/images'

interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSeed?: string
}

export function SafeImage({
  src,
  alt,
  fallbackSeed = 'fallback',
  className,
  ...props
}: SafeImageProps) {
  const [url, setUrl] = useState(src)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    setUrl(src)
    setAttempt(0)
  }, [src])

  return (
    <img
      {...props}
      src={url}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => {
        if (attempt === 0) {
          setUrl(propertyImage(fallbackSeed))
          setAttempt(1)
        } else if (attempt === 1) {
          setUrl(propertyImage(`${fallbackSeed}-alt`))
          setAttempt(2)
        }
      }}
    />
  )
}
