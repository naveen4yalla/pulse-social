import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, MapPin } from 'lucide-react'
import type { Post } from '../types'
import { useApp } from '../context/AppContext'
import { userById } from '../data/mock'
import { timeAgo, formatCount, cn } from '../lib/utils'
import Avatar from './Avatar'
import SmartImage from './SmartImage'
import CommentsModal from './CommentsModal'

export default function PostCard({ post }: { post: Post }) {
  const { toggleLike, toggleSave, addComment } = useApp()
  const user = userById(post.userId)
  const [showHeart, setShowHeart] = useState(false)
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [comment, setComment] = useState('')
  const [expanded, setExpanded] = useState(false)
  const lastTap = useRef(0)

  const handleDoubleTap = () => {
    if (!post.liked) toggleLike(post.id)
    setShowHeart(true)
    window.setTimeout(() => setShowHeart(false), 900)
  }

  const onImageClick = () => {
    const now = Date.now()
    if (now - lastTap.current < 300) {
      handleDoubleTap()
    }
    lastTap.current = now
  }

  const submitComment = () => {
    if (!comment.trim()) return
    addComment(post.id, comment)
    setComment('')
  }

  const longCaption = post.caption.length > 120

  return (
    <article className="bg-white dark:bg-neutral-950 md:rounded-2xl md:border border-neutral-200 dark:border-neutral-800 overflow-hidden">
      {/* header */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center gap-2.5">
          <Link to={`/u/${user.username}`}>
            <Avatar src={user.avatar} alt={user.name} size={38} ring seen={false} />
          </Link>
          <div className="leading-tight">
            <Link to={`/u/${user.username}`} className="flex items-center gap-1 text-sm font-semibold hover:underline">
              {user.username}
              {user.verified && <VerifiedBadge />}
            </Link>
            {post.location && (
              <span className="flex items-center gap-0.5 text-xs text-neutral-500">
                <MapPin className="h-3 w-3" /> {post.location}
              </span>
            )}
          </div>
        </div>
        <button className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-white" aria-label="More">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* image */}
      <div className="relative select-none" onClick={onImageClick}>
        <SmartImage
          src={post.image}
          alt={post.caption.slice(0, 60)}
          wrapperClassName="aspect-square w-full bg-neutral-100 dark:bg-neutral-900"
          className="h-full w-full object-cover"
        />
        {showHeart && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <Heart className="h-28 w-28 text-white drop-shadow-lg animate-pop-heart" fill="white" />
          </div>
        )}
      </div>

      {/* actions */}
      <div className="flex items-center justify-between px-3 pt-2.5">
        <div className="flex items-center gap-3.5">
          <button
            onClick={() => toggleLike(post.id)}
            className="transition-transform active:scale-90"
            aria-label="Like"
          >
            <Heart
              className={cn(
                'h-6.5 w-6.5 transition-colors',
                post.liked ? 'text-rose-500 animate-like-bounce' : 'text-neutral-800 dark:text-neutral-100 hover:text-neutral-500'
              )}
              style={{ width: 26, height: 26 }}
              fill={post.liked ? 'currentColor' : 'none'}
              strokeWidth={post.liked ? 0 : 1.9}
            />
          </button>
          <button onClick={() => setCommentsOpen(true)} aria-label="Comments">
            <MessageCircle className="text-neutral-800 dark:text-neutral-100 hover:text-neutral-500" style={{ width: 25, height: 25 }} strokeWidth={1.9} />
          </button>
          <button aria-label="Share">
            <Send className="text-neutral-800 dark:text-neutral-100 hover:text-neutral-500" style={{ width: 24, height: 24 }} strokeWidth={1.9} />
          </button>
        </div>
        <button onClick={() => toggleSave(post.id)} aria-label="Save">
          <Bookmark
            className="text-neutral-800 dark:text-neutral-100 hover:text-neutral-500"
            style={{ width: 24, height: 24 }}
            fill={post.saved ? 'currentColor' : 'none'}
            strokeWidth={post.saved ? 0 : 1.9}
          />
        </button>
      </div>

      {/* likes */}
      <div className="px-3 pt-2 text-sm font-semibold">{formatCount(post.likedBy)} likes</div>

      {/* caption */}
      <div className="px-3 pt-1 text-sm">
        <Link to={`/u/${user.username}`} className="font-semibold mr-1.5">
          {user.username}
        </Link>
        <span className="text-neutral-800 dark:text-neutral-200">
          {longCaption && !expanded ? `${post.caption.slice(0, 120)}… ` : post.caption}
        </span>
        {longCaption && !expanded && (
          <button onClick={() => setExpanded(true)} className="text-neutral-500">
            more
          </button>
        )}
      </div>

      {/* comments preview */}
      {post.comments.length > 0 && (
        <button
          onClick={() => setCommentsOpen(true)}
          className="block px-3 pt-1.5 text-sm text-neutral-500 hover:underline"
        >
          View all {post.comments.length} comments
        </button>
      )}
      {post.comments.slice(-1).map((c) => {
        const cu = userById(c.userId)
        return (
          <div key={c.id} className="px-3 pt-1 text-sm">
            <Link to={`/u/${cu.username}`} className="font-semibold mr-1.5">
              {cu.username}
            </Link>
            <span className="text-neutral-800 dark:text-neutral-200">{c.text}</span>
          </div>
        )
      })}

      <div className="px-3 pt-1.5 pb-1 text-[11px] uppercase tracking-wide text-neutral-400">
        {timeAgo(post.createdAt)} ago
      </div>

      {/* inline add comment */}
      <div className="hidden md:flex items-center gap-2 border-t border-neutral-100 dark:border-neutral-900 px-3 py-2.5">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submitComment()}
          placeholder="Add a comment…"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-400"
        />
        {comment.trim() && (
          <button onClick={submitComment} className="text-sm font-semibold brand-text">
            Post
          </button>
        )}
      </div>

      <CommentsModal post={post} open={commentsOpen} onClose={() => setCommentsOpen(false)} />
    </article>
  )
}

export function VerifiedBadge() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-sky-500" fill="currentColor" aria-label="Verified">
      <path d="M12 1l2.5 2.2 3.3-.3 1.3 3 3 1.3-.3 3.3L23 12l-2.2 2.5.3 3.3-3 1.3-1.3 3-3.3-.3L12 23l-2.5-2.2-3.3.3-1.3-3-3-1.3.3-3.3L1 12l2.2-2.5-.3-3.3 3-1.3 1.3-3 3.3.3L12 1zm-1.2 14.3l5.6-5.6-1.4-1.4-4.2 4.2-2-2L7.4 12l3.4 3.3z" />
    </svg>
  )
}
