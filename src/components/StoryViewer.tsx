import { useCallback, useEffect, useRef, useState } from 'react'
import { X, ChevronLeft, ChevronRight, Heart, Send } from 'lucide-react'
import Avatar from './Avatar'
import { stories, userById } from '../data/mock'
import { timeAgo } from '../lib/utils'

const SLIDE_MS = 4000

export default function StoryViewer({
  startIndex,
  onClose,
}: {
  startIndex: number
  onClose: () => void
}) {
  const [userIndex, setUserIndex] = useState(startIndex)
  const [slide, setSlide] = useState(0)
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number | undefined>(undefined)
  const startRef = useRef<number>(0)

  const story = stories[userIndex]
  const user = userById(story.userId)
  const totalSlides = story.images.length

  const goNextUser = useCallback(() => {
    if (userIndex < stories.length - 1) {
      setUserIndex((i) => i + 1)
      setSlide(0)
    } else {
      onClose()
    }
  }, [userIndex, onClose])

  const goPrevUser = useCallback(() => {
    if (userIndex > 0) {
      setUserIndex((i) => i - 1)
      setSlide(0)
    }
  }, [userIndex])

  const nextSlide = useCallback(() => {
    if (slide < totalSlides - 1) {
      setSlide((s) => s + 1)
    } else {
      goNextUser()
    }
  }, [slide, totalSlides, goNextUser])

  const prevSlide = useCallback(() => {
    if (slide > 0) setSlide((s) => s - 1)
    else goPrevUser()
  }, [slide, goPrevUser])

  // progress animation
  useEffect(() => {
    setProgress(0)
    startRef.current = performance.now()
    const tick = (t: number) => {
      const elapsed = t - startRef.current
      const p = Math.min(elapsed / SLIDE_MS, 1)
      setProgress(p)
      if (p >= 1) {
        nextSlide()
      } else {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [userIndex, slide, nextSlide])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, nextSlide, prevSlide])

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 text-white/90 hover:text-white p-2"
        aria-label="Close"
      >
        <X className="h-7 w-7" />
      </button>

      {/* desktop nav arrows */}
      {userIndex > 0 && (
        <button
          onClick={goPrevUser}
          className="hidden md:flex absolute left-4 z-20 h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}
      {userIndex < stories.length - 1 && (
        <button
          onClick={goNextUser}
          className="hidden md:flex absolute right-4 z-20 h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      <div className="relative h-full w-full md:h-[92vh] md:w-[430px] md:rounded-xl overflow-hidden bg-neutral-900">
        {/* progress bars */}
        <div className="absolute top-0 inset-x-0 z-20 flex gap-1 p-3">
          {story.images.map((_, i) => (
            <div key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30">
              <div
                className="h-full bg-white"
                style={{
                  width: i < slide ? '100%' : i === slide ? `${progress * 100}%` : '0%',
                }}
              />
            </div>
          ))}
        </div>

        {/* header */}
        <div className="absolute top-6 inset-x-0 z-20 flex items-center gap-3 px-4 pt-2">
          <Avatar src={user.avatar} alt={user.name} size={34} />
          <div className="flex items-center gap-2 text-white">
            <span className="text-sm font-semibold">{user.username}</span>
            <span className="text-xs text-white/70">{timeAgo(Date.now() - (slide + 1) * 3600_000)}</span>
          </div>
        </div>

        {/* image */}
        <img
          src={story.images[slide]}
          alt="story"
          className="h-full w-full object-cover"
        />

        {/* tap zones */}
        <button
          onClick={prevSlide}
          className="absolute inset-y-0 left-0 z-10 w-1/3"
          aria-label="Previous"
        />
        <button
          onClick={nextSlide}
          className="absolute inset-y-0 right-0 z-10 w-1/3"
          aria-label="Next"
        />

        {/* reply bar */}
        <div className="absolute bottom-0 inset-x-0 z-20 flex items-center gap-2 p-4">
          <input
            placeholder={`Reply to ${user.username}…`}
            className="flex-1 rounded-full border border-white/40 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/60 outline-none"
          />
          <button className="text-white p-2" aria-label="Like">
            <Heart className="h-6 w-6" />
          </button>
          <button className="text-white p-2" aria-label="Send">
            <Send className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  )
}
