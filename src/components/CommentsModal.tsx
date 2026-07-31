import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Smile } from 'lucide-react'
import type { Post } from '../types'
import { useApp } from '../context/AppContext'
import { userById } from '../data/mock'
import { timeAgo, formatCount } from '../lib/utils'
import Avatar from './Avatar'
import Modal from './Modal'
import { VerifiedBadge } from './PostCard'

export default function CommentsModal({
  post,
  open,
  onClose,
}: {
  post: Post
  open: boolean
  onClose: () => void
}) {
  const { addComment, posts } = useApp()
  const [text, setText] = useState('')
  const live = posts.find((p) => p.id === post.id) ?? post
  const author = userById(live.userId)

  const submit = () => {
    if (!text.trim()) return
    addComment(live.id, text)
    setText('')
  }

  return (
    <Modal open={open} onClose={onClose} className="max-w-3xl overflow-hidden p-0">
      <div className="flex flex-col md:flex-row max-h-[85vh]">
        {/* image side */}
        <div className="hidden md:block md:w-1/2 bg-black">
          <img src={live.image} alt="" className="h-full w-full object-cover" />
        </div>

        {/* comments side */}
        <div className="flex w-full md:w-1/2 flex-col max-h-[85vh]">
          <div className="flex items-center gap-2.5 border-b border-neutral-200 dark:border-neutral-800 px-4 py-3">
            <Avatar src={author.avatar} alt={author.name} size={34} />
            <Link to={`/u/${author.username}`} className="flex items-center gap-1 text-sm font-semibold">
              {author.username}
              {author.verified && <VerifiedBadge />}
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
            {/* caption as first item */}
            <div className="flex gap-3">
              <Avatar src={author.avatar} alt={author.name} size={32} />
              <div className="text-sm">
                <Link to={`/u/${author.username}`} className="font-semibold mr-1.5">
                  {author.username}
                </Link>
                <span className="text-neutral-800 dark:text-neutral-200">{live.caption}</span>
                <div className="mt-1 text-xs text-neutral-400">{timeAgo(live.createdAt)}</div>
              </div>
            </div>

            {live.comments.map((c) => {
              const cu = userById(c.userId)
              return (
                <div key={c.id} className="flex gap-3">
                  <Avatar src={cu.avatar} alt={cu.name} size={32} />
                  <div className="flex-1 text-sm">
                    <Link to={`/u/${cu.username}`} className="font-semibold mr-1.5">
                      {cu.username}
                    </Link>
                    <span className="text-neutral-800 dark:text-neutral-200">{c.text}</span>
                    <div className="mt-1 flex items-center gap-3 text-xs text-neutral-400">
                      <span>{timeAgo(c.createdAt)}</span>
                      {c.likes > 0 && <span>{formatCount(c.likes)} likes</span>}
                      <button className="font-medium">Reply</button>
                    </div>
                  </div>
                  <button className="pt-1 text-neutral-400 hover:text-rose-500" aria-label="Like comment">
                    <Heart className="h-3.5 w-3.5" />
                  </button>
                </div>
              )
            })}
          </div>

          <div className="border-t border-neutral-200 dark:border-neutral-800 px-4 py-3">
            <div className="mb-2 text-sm font-semibold">{formatCount(live.likedBy)} likes</div>
            <div className="flex items-center gap-2">
              <Smile className="h-5 w-5 text-neutral-400" />
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submit()}
                placeholder="Add a comment…"
                className="flex-1 bg-transparent text-sm outline-none"
              />
              <button
                onClick={submit}
                disabled={!text.trim()}
                className="text-sm font-semibold brand-text disabled:opacity-40"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
