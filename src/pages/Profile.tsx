import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Grid3x3, Bookmark, UserSquare2, Settings, MessageCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { userByUsername, CURRENT_USER_ID } from '../data/mock'
import { formatCount, cn } from '../lib/utils'
import Avatar from '../components/Avatar'
import { VerifiedBadge } from '../components/PostCard'

type Tab = 'posts' | 'saved' | 'tagged'

export default function Profile() {
  const { username } = useParams<{ username: string }>()
  const { posts, following, toggleFollow } = useApp()
  const [tab, setTab] = useState<Tab>('posts')

  const user = username ? userByUsername(username) : undefined

  if (!user) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-2 text-center">
        <p className="text-lg font-semibold">User not found</p>
        <Link to="/" className="text-sm brand-text font-semibold">Back to feed</Link>
      </div>
    )
  }

  const isMe = user.id === CURRENT_USER_ID
  const isFollowing = following.has(user.id)
  const userPosts = posts.filter((p) => p.userId === user.id)
  const savedPosts = posts.filter((p) => p.saved)
  const shown = tab === 'saved' && isMe ? savedPosts : userPosts

  const tabs: { key: Tab; label: string; icon: typeof Grid3x3; meOnly?: boolean }[] = [
    { key: 'posts', label: 'Posts', icon: Grid3x3 },
    { key: 'saved', label: 'Saved', icon: Bookmark, meOnly: true },
    { key: 'tagged', label: 'Tagged', icon: UserSquare2 },
  ]

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:py-10">
      {/* header */}
      <header className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-12 mb-8">
        <Avatar src={user.avatar} alt={user.name} size={140} ring className="sm:!h-[150px] sm:!w-[150px]" />
        <div className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-xl font-semibold">{user.username}</h1>
              {user.verified && <VerifiedBadge />}
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              {isMe ? (
                <>
                  <button className="rounded-lg bg-neutral-100 dark:bg-neutral-800 px-4 py-1.5 text-sm font-semibold">
                    Edit profile
                  </button>
                  <button className="rounded-lg bg-neutral-100 dark:bg-neutral-800 p-2" aria-label="Settings">
                    <Settings className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => toggleFollow(user.id)}
                    className={cn(
                      'rounded-lg px-6 py-1.5 text-sm font-semibold',
                      isFollowing
                        ? 'bg-neutral-100 dark:bg-neutral-800'
                        : 'brand-gradient text-white'
                    )}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                  <Link
                    to="/messages"
                    className="flex items-center gap-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 px-4 py-1.5 text-sm font-semibold"
                  >
                    <MessageCircle className="h-4 w-4" /> Message
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-8 my-4 text-sm">
            <span><strong className="font-semibold">{userPosts.length}</strong> posts</span>
            <span><strong className="font-semibold">{formatCount(user.followers)}</strong> followers</span>
            <span><strong className="font-semibold">{formatCount(user.following)}</strong> following</span>
          </div>

          <div className="text-center sm:text-left text-sm">
            <div className="font-semibold">{user.name}</div>
            <p className="text-neutral-700 dark:text-neutral-300 whitespace-pre-line">{user.bio}</p>
          </div>
        </div>
      </header>

      {/* highlights */}
      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-6 mb-2 border-b border-neutral-200 dark:border-neutral-800">
        {['Travel', 'Work', 'Food', 'Design', 'Life'].map((h, i) => (
          <div key={h} className="flex w-16 shrink-0 flex-col items-center gap-1.5">
            <div className="h-16 w-16 rounded-full p-[2px] border border-neutral-300 dark:border-neutral-700">
              <img
                src={`https://picsum.photos/seed/hl-${user.id}-${i}/120/120`}
                alt={h}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <span className="text-xs">{h}</span>
          </div>
        ))}
      </div>

      {/* tabs */}
      <div className="flex items-center justify-center gap-12 border-t border-neutral-200 dark:border-neutral-800 -mt-px">
        {tabs
          .filter((t) => !t.meOnly || isMe)
          .map((t) => {
            const Icon = t.icon
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={cn(
                  'flex items-center gap-1.5 py-3 text-xs font-semibold uppercase tracking-wide -mt-px border-t',
                  tab === t.key
                    ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white'
                    : 'border-transparent text-neutral-400'
                )}
              >
                <Icon className="h-4 w-4" /> {t.label}
              </button>
            )
          })}
      </div>

      {/* grid */}
      {shown.length > 0 ? (
        <div className="grid grid-cols-3 gap-0.5 md:gap-1.5 mt-1">
          {shown.map((p) => (
            <div key={p.id} className="group relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-900">
              <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover transition group-hover:opacity-90" />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-sm text-neutral-400">
          {tab === 'saved' ? 'No saved posts yet.' : 'No posts yet.'}
        </div>
      )}
    </div>
  )
}
