import { Link } from 'react-router-dom'
import { Heart, MessageCircle, Send, Bookmark, Music2, Play } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { userById } from '../data/mock'
import { formatCount } from '../lib/utils'
import Avatar from '../components/Avatar'
import { VerifiedBadge } from '../components/PostCard'

export default function Reels() {
  const { posts, toggleLike, toggleSave } = useApp()
  const media = posts.slice(0, 8)

  return (
    <div className="mx-auto max-w-[460px] px-0 md:px-4 py-0 md:py-6">
      <div className="space-y-1 md:space-y-4">
        {media.map((p) => {
          const u = userById(p.userId)
          return (
            <div
              key={p.id}
              className="relative aspect-[9/16] w-full overflow-hidden bg-black md:rounded-2xl"
            >
              <img src={p.image} alt="" className="h-full w-full object-cover opacity-95" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

              <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium text-white">
                <Play className="h-3.5 w-3.5" fill="white" /> Reel
              </div>

              {/* right rail actions */}
              <div className="absolute bottom-24 right-3 flex flex-col items-center gap-5 text-white">
                <button onClick={() => toggleLike(p.id)} className="flex flex-col items-center gap-1">
                  <Heart className="h-7 w-7" fill={p.liked ? '#f43f5e' : 'none'} stroke={p.liked ? '#f43f5e' : 'white'} strokeWidth={1.8} />
                  <span className="text-xs font-semibold">{formatCount(p.likedBy)}</span>
                </button>
                <button className="flex flex-col items-center gap-1">
                  <MessageCircle className="h-7 w-7" strokeWidth={1.8} />
                  <span className="text-xs font-semibold">{p.comments.length}</span>
                </button>
                <button className="flex flex-col items-center gap-1">
                  <Send className="h-7 w-7" strokeWidth={1.8} />
                </button>
                <button onClick={() => toggleSave(p.id)}>
                  <Bookmark className="h-7 w-7" fill={p.saved ? 'white' : 'none'} strokeWidth={1.8} />
                </button>
                <Avatar src={u.avatar} alt={u.name} size={30} className="ring-2 ring-white/80" />
              </div>

              {/* bottom info */}
              <div className="absolute bottom-4 left-4 right-16 text-white">
                <Link to={`/u/${u.username}`} className="flex items-center gap-2">
                  <Avatar src={u.avatar} alt={u.name} size={34} className="ring-2 ring-white/70" />
                  <span className="flex items-center gap-1 text-sm font-semibold">
                    {u.username}
                    {u.verified && <VerifiedBadge />}
                  </span>
                </Link>
                <p className="mt-2 line-clamp-2 text-sm">{p.caption}</p>
                <div className="mt-2 flex items-center gap-1.5 text-xs">
                  <Music2 className="h-3.5 w-3.5" /> Original audio · {u.username}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
