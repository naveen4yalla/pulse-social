import { useState } from 'react'
import { cn } from '../lib/utils'

interface SmartImageProps {
  src: string
  alt: string
  className?: string
  wrapperClassName?: string
}

export default function SmartImage({ src, alt, className, wrapperClassName }: SmartImageProps) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={cn('relative overflow-hidden', wrapperClassName)}>
      {!loaded && <div className="absolute inset-0 skeleton" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={cn(
          'transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0',
          className
        )}
      />
    </div>
  )
}
