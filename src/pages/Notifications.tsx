import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { userById } from '../data/mock'
import { timeAgo, cn } from '../lib/utils'
import Avatar from '../components/Avatar'
import { VerifiedBadge } from '../components/PostCard'

function groupLabel(ts: number): string {
  const diff = Date.now() - ts
  if (diff < 24 * 3600_000) return 'Today'
  if (diff < 7 * 24 * 3600_000) return 'This week'
  return 'Earlier'
}

export default function Notifications() {
  const { notifications, following, toggleFollow } = useApp()

  const groups: Record<string, typeof notifications> = {}
  for (const n of notifications) {
    const g = groupLabel(n.createdAt)
    ;(groups[g] ??= []).push(n)
  }
  const order = ['Today', 'This week', 'Earlier']

  return (
    <div className="mx-auto max-w-xl px-2 md:px-4 py-4 md:py-6">
      <h1 className="px-2 mb-4 text-xl font-bold">Notifications</h1>

      {order
        .filter((g) => groups[g]?.length)
        .map((g) => (
          <div key={g} className="mb-4">
            <h2 className="px-2 mb-1 text-sm font-semibold text-neutral-500">{g}</h2>
            <div className="space-y-0.5">
              {groups[g].map((n) => {
                const u = userById(n.userId)
                const isFollowing = following.has(u.id)
                return (
                  <div
                    key={n.id}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-2 py-2.5',
                      !n.read && 'bg-brand-50/60 dark:bg-brand-500/5'
                    )}
                  >
                    <Link to={`/u/${u.username}`}>
                      <Avatar src={u.avatar} alt={u.name} size={44} />
                    </Link>
                    <div className="min-w-0 flex-1 text-sm">
                      <Link to={`/u/${u.username}`} className="font-semibold mr-1 inline-flex items-center gap-1">
                        {u.username}
                        {u.verified && <VerifiedBadge />}
                      </Link>
                      <span className="text-neutral-700 dark:text-neutral-300">{n.text}</span>
                      <span className="ml-1.5 text-xs text-neutral-400">{timeAgo(n.createdAt)}</span>
                    </div>
                    {n.type === 'follow' ? (
                      <button
                        onClick={() => toggleFollow(u.id)}
                        className={cn(
                          'shrink-0 rounded-lg px-4 py-1.5 text-xs font-semibold',
                          isFollowing
                            ? 'bg-neutral-100 dark:bg-neutral-800'
                            : 'brand-gradient text-white'
                        )}
                      >
                        {isFollowing ? 'Following' : 'Follow'}
                      </button>
                    ) : n.postImage ? (
                      <img src={n.postImage} alt="" className="h-11 w-11 shrink-0 rounded-md object-cover" />
                    ) : null}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
    </div>
  )
}
