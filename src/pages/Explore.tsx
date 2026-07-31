import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Heart, MessageCircle } from 'lucide-react'
import { exploreImages, users, CURRENT_USER_ID } from '../data/mock'
import { formatCount, cn } from '../lib/utils'
import Avatar from '../components/Avatar'
import { VerifiedBadge } from '../components/PostCard'

export default function Explore() {
  const [query, setQuery] = useState('')

  const matchedUsers = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return users.filter(
      (u) =>
        u.id !== CURRENT_USER_ID &&
        (u.username.toLowerCase().includes(q) || u.name.toLowerCase().includes(q))
    )
  }, [query])

  return (
    <div className="mx-auto max-w-4xl px-1 md:px-4 py-4 md:py-6">
      <div className="px-3 md:px-0 mb-4">
        <div className="flex items-center gap-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 px-3.5 py-2.5">
          <Search className="h-4.5 w-4.5 text-neutral-400" style={{ width: 18, height: 18 }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search people…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
          />
        </div>
      </div>

      {query.trim() ? (
        <div className="px-3 md:px-0">
          <h2 className="mb-3 text-sm font-semibold text-neutral-500">
            {matchedUsers.length ? 'People' : 'No results'}
          </h2>
          <div className="space-y-1">
            {matchedUsers.map((u) => (
              <Link
                key={u.id}
                to={`/u/${u.username}`}
                className="flex items-center gap-3 rounded-xl p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900"
              >
                <Avatar src={u.avatar} alt={u.name} size={44} />
                <div className="leading-tight">
                  <div className="flex items-center gap-1 text-sm font-semibold">
                    {u.username}
                    {u.verified && <VerifiedBadge />}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {u.name} · {formatCount(u.followers)} followers
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-0.5 md:gap-2">
          {exploreImages.map((item, i) => (
            <Link
              key={item.id}
              to="/"
              className={cn(
                'group relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-900 md:rounded-xl',
                // occasional tall tile for masonry feel
                i % 7 === 3 && 'row-span-2 aspect-[1/2]'
              )}
            >
              <img
                src={item.image}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 hidden items-center justify-center gap-5 bg-black/40 text-white opacity-0 transition group-hover:flex group-hover:opacity-100">
                <span className="flex items-center gap-1.5 text-sm font-semibold">
                  <Heart className="h-5 w-5" fill="white" /> {formatCount(item.likes)}
                </span>
                <span className="flex items-center gap-1.5 text-sm font-semibold">
                  <MessageCircle className="h-5 w-5" fill="white" /> {item.comments}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
