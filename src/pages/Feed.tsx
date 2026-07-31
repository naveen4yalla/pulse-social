import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { users, userById, CURRENT_USER_ID } from '../data/mock'
import StoryBar from '../components/StoryBar'
import PostCard from '../components/PostCard'
import Avatar from '../components/Avatar'
import { VerifiedBadge } from '../components/PostCard'
import { formatCount } from '../lib/utils'

function FeedSkeleton() {
  return (
    <div className="bg-white dark:bg-neutral-950 md:rounded-2xl md:border border-neutral-200 dark:border-neutral-800 overflow-hidden">
      <div className="flex items-center gap-3 p-3">
        <div className="skeleton h-10 w-10 rounded-full" />
        <div className="skeleton h-3 w-28 rounded" />
      </div>
      <div className="skeleton aspect-square w-full" />
      <div className="space-y-2 p-3">
        <div className="skeleton h-3 w-24 rounded" />
        <div className="skeleton h-3 w-3/4 rounded" />
      </div>
    </div>
  )
}

export default function Feed() {
  const { posts, following, toggleFollow } = useApp()
  const me = userById(CURRENT_USER_ID)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 650)
    return () => window.clearTimeout(t)
  }, [])

  const suggestions = users.filter((u) => u.id !== CURRENT_USER_ID).slice(0, 5)

  return (
    <div className="mx-auto flex max-w-5xl gap-8 px-0 md:px-6 py-0 md:py-6">
      <div className="w-full max-w-[600px] mx-auto lg:mx-0">
        <StoryBar />
        <div className="space-y-4 md:space-y-6 pt-4">
          {loading ? (
            <>
              <FeedSkeleton />
              <FeedSkeleton />
            </>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
          {!loading && (
            <div className="py-10 text-center text-sm text-neutral-400">
              You're all caught up ✦
            </div>
          )}
        </div>
      </div>

      {/* right sidebar */}
      <aside className="hidden lg:block w-80 shrink-0 pt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Avatar src={me.avatar} alt={me.name} size={54} />
            <div className="leading-tight">
              <Link to={`/u/${me.username}`} className="text-sm font-semibold hover:underline flex items-center gap-1">
                {me.username}
                {me.verified && <VerifiedBadge />}
              </Link>
              <div className="text-sm text-neutral-500">{me.name}</div>
            </div>
          </div>
          <button className="text-xs font-semibold brand-text">Switch</button>
        </div>

        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-neutral-500">Suggested for you</span>
          <button className="text-xs font-semibold">See All</button>
        </div>

        <div className="space-y-3">
          {suggestions.map((u) => {
            const isFollowing = following.has(u.id)
            return (
              <div key={u.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar src={u.avatar} alt={u.name} size={40} />
                  <div className="leading-tight">
                    <Link to={`/u/${u.username}`} className="text-sm font-semibold hover:underline flex items-center gap-1">
                      {u.username}
                      {u.verified && <VerifiedBadge />}
                    </Link>
                    <div className="text-xs text-neutral-500">{formatCount(u.followers)} followers</div>
                  </div>
                </div>
                <button
                  onClick={() => toggleFollow(u.id)}
                  className={
                    isFollowing
                      ? 'text-xs font-semibold text-neutral-500'
                      : 'text-xs font-semibold brand-text'
                  }
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            )
          })}
        </div>

        <p className="mt-8 text-xs leading-relaxed text-neutral-400">
          Pulse is a client-side demo built with React, TypeScript &amp; Tailwind.
          All data is mock — no backend, no tracking.
        </p>
        <p className="mt-4 text-xs text-neutral-400">© 2026 Pulse</p>
      </aside>
    </div>
  )
}
