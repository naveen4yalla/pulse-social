import { useState } from 'react'
import { ImagePlus, MapPin, Sparkles } from 'lucide-react'
import Modal from './Modal'
import Avatar from './Avatar'
import { useApp } from '../context/AppContext'
import { userById, CURRENT_USER_ID } from '../data/mock'

const SUGGESTIONS = [
  'https://picsum.photos/seed/pulse-suggest-1/900/900',
  'https://picsum.photos/seed/pulse-suggest-2/900/900',
  'https://picsum.photos/seed/pulse-suggest-3/900/900',
  'https://picsum.photos/seed/pulse-suggest-4/900/900',
]

export default function CreatePostModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { createPost } = useApp()
  const me = userById(CURRENT_USER_ID)
  const [image, setImage] = useState('')
  const [caption, setCaption] = useState('')
  const [location, setLocation] = useState('')

  const preview = image.trim() || SUGGESTIONS[0]

  const submit = () => {
    createPost(image, caption, location)
    setImage('')
    setCaption('')
    setLocation('')
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} className="max-w-lg overflow-hidden">
      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 px-4 py-3">
        <h2 className="text-base font-semibold">Create new post</h2>
        <button
          onClick={submit}
          className="text-sm font-semibold brand-text hover:opacity-80"
        >
          Share
        </button>
      </div>

      <div className="max-h-[70vh] overflow-y-auto">
        <div className="relative aspect-square w-full bg-neutral-100 dark:bg-neutral-800">
          <img src={preview} alt="preview" className="h-full w-full object-cover" />
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white">
            <Sparkles className="h-3.5 w-3.5" /> Live preview
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <Avatar src={me.avatar} alt={me.name} size={36} />
            <span className="text-sm font-semibold">{me.username}</span>
          </div>

          <label className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-neutral-500">
              <ImagePlus className="h-3.5 w-3.5" /> Image URL
            </span>
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Paste an image URL or pick one below"
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500/40"
            />
          </label>

          <div className="flex gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setImage(s)}
                className={`h-14 w-14 overflow-hidden rounded-lg border-2 transition ${
                  image === s ? 'border-brand-500' : 'border-transparent'
                }`}
              >
                <img src={s} alt="suggestion" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>

          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption…"
            rows={3}
            className="w-full resize-none rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500/40"
          />

          <label className="flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2">
            <MapPin className="h-4 w-4 text-neutral-400" />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Add location"
              className="w-full bg-transparent text-sm outline-none"
            />
          </label>

          <button
            onClick={submit}
            className="w-full rounded-xl brand-gradient py-2.5 text-sm font-semibold text-white hover:opacity-90 transition"
          >
            Share post
          </button>
        </div>
      </div>
    </Modal>
  )
}
