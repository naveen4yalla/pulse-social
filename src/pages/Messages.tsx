import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Phone,
  Video,
  Info,
  Heart,
  Image as ImageIcon,
  Smile,
  Send,
  Edit,
  Search,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { userById, CURRENT_USER_ID } from '../data/mock'
import Avatar from '../components/Avatar'
import { VerifiedBadge } from '../components/PostCard'
import { timeAgo, clockTime, cn } from '../lib/utils'

export default function Messages() {
  const { conversations, sendMessage, markConversationRead, typing } = useApp()
  const [activeId, setActiveId] = useState<string | null>(conversations[0]?.id ?? null)
  const [draft, setDraft] = useState('')
  const [query, setQuery] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const active = conversations.find((c) => c.id === activeId) ?? null
  const activeUser = active ? userById(active.userId) : null
  const isTyping = active ? typing[active.id] : false

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return conversations
    return conversations.filter((c) => {
      const u = userById(c.userId)
      return u.username.toLowerCase().includes(q) || u.name.toLowerCase().includes(q)
    })
  }, [conversations, query])

  useEffect(() => {
    if (activeId) markConversationRead(activeId)
  }, [activeId, markConversationRead])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [active?.messages.length, isTyping])

  const send = () => {
    if (!draft.trim() || !active) return
    sendMessage(active.id, draft)
    setDraft('')
  }

  const me = userById(CURRENT_USER_ID)

  return (
    <div className="flex h-[calc(100vh-3.5rem)] md:h-screen w-full overflow-hidden bg-white dark:bg-neutral-950">
      {/* conversation list */}
      <div
        className={cn(
          'flex w-full md:w-80 xl:w-96 shrink-0 flex-col border-r border-neutral-200 dark:border-neutral-800',
          active && 'hidden md:flex'
        )}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-100 dark:border-neutral-900">
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-bold">{me.username}</span>
          </div>
          <Edit className="h-6 w-6" strokeWidth={1.8} />
        </div>

        <div className="px-3 py-2">
          <div className="flex items-center gap-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 px-3 py-2">
            <Search className="h-4 w-4 text-neutral-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-2">
          <span className="text-sm font-semibold">Messages</span>
          <span className="text-sm text-neutral-400">Requests</span>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.map((c) => {
            const u = userById(c.userId)
            const last = c.messages[c.messages.length - 1]
            const isActive = c.id === activeId
            const preview = typing[c.id]
              ? 'typing…'
              : `${last.fromMe ? 'You: ' : ''}${last.text}`
            return (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={cn(
                  'flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors',
                  isActive ? 'bg-neutral-100 dark:bg-neutral-900' : 'hover:bg-neutral-50 dark:hover:bg-neutral-900/50'
                )}
              >
                <Avatar src={u.avatar} alt={u.name} size={54} ring={c.unread > 0} seen={c.unread === 0} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1 text-sm font-semibold">
                    <span className="truncate">{u.username}</span>
                    {u.verified && <VerifiedBadge />}
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <span
                      className={cn(
                        'truncate',
                        c.unread > 0 ? 'font-semibold text-neutral-900 dark:text-white' : 'text-neutral-500'
                      )}
                    >
                      {preview}
                    </span>
                    <span className="text-neutral-400">· {timeAgo(last.createdAt)}</span>
                  </div>
                </div>
                {c.unread > 0 && <span className="h-2.5 w-2.5 shrink-0 rounded-full brand-gradient" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* chat thread */}
      {active && activeUser ? (
        <div className="flex flex-1 flex-col min-w-0">
          {/* header */}
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 px-3 md:px-5 py-2.5">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setActiveId(null)}
                className="md:hidden p-1"
                aria-label="Back"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <Avatar src={activeUser.avatar} alt={activeUser.name} size={40} />
              <div className="leading-tight min-w-0">
                <Link to={`/u/${activeUser.username}`} className="flex items-center gap-1 text-sm font-semibold truncate">
                  {activeUser.username}
                  {activeUser.verified && <VerifiedBadge />}
                </Link>
                <span className="text-xs text-neutral-400">
                  {isTyping ? 'typing…' : 'Active now'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-neutral-700 dark:text-neutral-200">
              <button className="p-2 hover:text-brand-500" aria-label="Call"><Phone className="h-6 w-6" strokeWidth={1.8} /></button>
              <button className="p-2 hover:text-brand-500" aria-label="Video"><Video className="h-6 w-6" strokeWidth={1.8} /></button>
              <button className="p-2 hover:text-brand-500" aria-label="Info"><Info className="h-6 w-6" strokeWidth={1.8} /></button>
            </div>
          </div>

          {/* messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 md:px-5 py-4 space-y-1">
            <div className="flex flex-col items-center gap-2 py-6">
              <Avatar src={activeUser.avatar} alt={activeUser.name} size={80} />
              <div className="flex items-center gap-1 text-base font-semibold">
                {activeUser.name}
                {activeUser.verified && <VerifiedBadge />}
              </div>
              <div className="text-xs text-neutral-400">{activeUser.username} · Pulse</div>
              <Link
                to={`/u/${activeUser.username}`}
                className="mt-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 px-4 py-1.5 text-xs font-semibold"
              >
                View profile
              </Link>
            </div>

            {active.messages.map((m, i) => {
              const prev = active.messages[i - 1]
              const showAvatar = !m.fromMe && (!prev || prev.fromMe)
              const next = active.messages[i + 1]
              const isLastInGroup = !next || next.fromMe !== m.fromMe
              return (
                <div
                  key={m.id}
                  className={cn('flex items-end gap-2', m.fromMe ? 'justify-end' : 'justify-start')}
                >
                  {!m.fromMe && (
                    <span className="w-7 shrink-0">
                      {showAvatar && isLastInGroup ? (
                        <Avatar src={activeUser.avatar} alt={activeUser.name} size={28} />
                      ) : isLastInGroup ? (
                        <Avatar src={activeUser.avatar} alt={activeUser.name} size={28} />
                      ) : null}
                    </span>
                  )}
                  <div
                    className={cn(
                      'max-w-[75%] w-fit break-words whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm leading-snug',
                      m.fromMe
                        ? 'brand-gradient text-white rounded-br-md'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-bl-md'
                    )}
                    title={clockTime(m.createdAt)}
                  >
                    {m.text}
                  </div>
                </div>
              )
            })}

            {isTyping && (
              <div className="flex items-end gap-2">
                <Avatar src={activeUser.avatar} alt={activeUser.name} size={28} />
                <div className="rounded-3xl rounded-bl-md bg-neutral-100 dark:bg-neutral-800 px-4 py-3">
                  <div className="flex items-center gap-1">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-2 w-2 rounded-full bg-neutral-400"
                        style={{ animation: `typing-dot 1.2s infinite`, animationDelay: `${d * 0.18}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* composer */}
          <div className="border-t border-neutral-200 dark:border-neutral-800 px-3 md:px-5 py-3">
            <div className="flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-700 px-3 py-1.5">
              <button className="p-1 text-neutral-500" aria-label="Emoji"><Smile className="h-6 w-6" strokeWidth={1.8} /></button>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Message…"
                className="flex-1 bg-transparent text-sm outline-none py-1.5"
              />
              {draft.trim() ? (
                <button onClick={send} className="p-1 text-brand-500" aria-label="Send">
                  <Send className="h-6 w-6" strokeWidth={2} />
                </button>
              ) : (
                <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-300">
                  <button className="p-1" aria-label="Image"><ImageIcon className="h-6 w-6" strokeWidth={1.8} /></button>
                  <button className="p-1" aria-label="Like"><Heart className="h-6 w-6" strokeWidth={1.8} /></button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 flex-col items-center justify-center text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-neutral-900 dark:border-white">
            <Send className="h-11 w-11" strokeWidth={1.4} />
          </div>
          <h2 className="mt-4 text-xl font-light">Your messages</h2>
          <p className="mt-1 text-sm text-neutral-500">Select a conversation to start chatting.</p>
        </div>
      )}
    </div>
  )
}
