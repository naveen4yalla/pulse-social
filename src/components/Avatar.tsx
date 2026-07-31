import { cn } from '../lib/utils'

interface AvatarProps {
  src: string
  alt: string
  size?: number
  ring?: boolean
  seen?: boolean
  className?: string
}

export default function Avatar({ src, alt, size = 40, ring = false, seen = false, className }: AvatarProps) {
  const img = (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      className={cn('rounded-full object-cover bg-neutral-200 dark:bg-neutral-800', className)}
      style={{ width: size, height: size }}
    />
  )

  if (!ring) return img

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full p-[2.5px]',
        seen ? 'bg-neutral-300 dark:bg-neutral-700' : 'story-ring'
      )}
    >
      <span className="rounded-full p-[2px] bg-white dark:bg-neutral-950">{img}</span>
    </span>
  )
}
