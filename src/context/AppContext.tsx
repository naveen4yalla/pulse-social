import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Post, Conversation, Message, AppNotification } from '../types'
import {
  posts as seedPosts,
  conversations as seedConversations,
  notifications as seedNotifications,
  cannedReplies,
  defaultReplies,
  CURRENT_USER_ID,
} from '../data/mock'

interface AppState {
  posts: Post[]
  conversations: Conversation[]
  notifications: AppNotification[]
  following: Set<string>
  dark: boolean
  toggleDark: () => void
  toggleLike: (postId: string) => void
  toggleSave: (postId: string) => void
  addComment: (postId: string, text: string) => void
  createPost: (image: string, caption: string, location?: string) => void
  toggleFollow: (userId: string) => void
  sendMessage: (conversationId: string, text: string) => void
  markConversationRead: (conversationId: string) => void
  typing: Record<string, boolean>
}

const AppContext = createContext<AppState | null>(null)

let idCounter = 1000
const nextId = (prefix: string) => `${prefix}_${idCounter++}`

export function AppProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(seedPosts)
  const [conversations, setConversations] = useState<Conversation[]>(seedConversations)
  const [notifications] = useState<AppNotification[]>(seedNotifications)
  const [following, setFollowing] = useState<Set<string>>(new Set(['u_maya', 'u_leo', 'u_sofia', 'u_nadia']))
  const [typing, setTyping] = useState<Record<string, boolean>>({})
  const [dark, setDark] = useState<boolean>(() => {
    const stored = localStorage.getItem('pulse-theme')
    if (stored) return stored === 'dark'
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? true
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('pulse-theme', dark ? 'dark' : 'light')
  }, [dark])

  const toggleDark = useCallback(() => setDark((d) => !d), [])

  const toggleLike = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, liked: !p.liked, likedBy: p.likedBy + (p.liked ? -1 : 1) }
          : p
      )
    )
  }, [])

  const toggleSave = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, saved: !p.saved } : p))
    )
  }, [])

  const addComment = useCallback((postId: string, text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                { id: nextId('c'), userId: CURRENT_USER_ID, text: trimmed, createdAt: Date.now(), likes: 0 },
              ],
            }
          : p
      )
    )
  }, [])

  const createPost = useCallback((image: string, caption: string, location?: string) => {
    const post: Post = {
      id: nextId('p'),
      userId: CURRENT_USER_ID,
      image: image.trim() || `https://picsum.photos/seed/pulse-new-${Date.now()}/900/900`,
      caption: caption.trim(),
      location: location?.trim() || undefined,
      likedBy: 0,
      liked: false,
      saved: false,
      comments: [],
      createdAt: Date.now(),
    }
    setPosts((prev) => [post, ...prev])
  }, [])

  const toggleFollow = useCallback((userId: string) => {
    setFollowing((prev) => {
      const next = new Set(prev)
      if (next.has(userId)) next.delete(userId)
      else next.add(userId)
      return next
    })
  }, [])

  const markConversationRead = useCallback((conversationId: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === conversationId ? { ...c, unread: 0 } : c))
    )
  }, [])

  const sendMessage = useCallback((conversationId: string, text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const outgoing: Message = { id: nextId('m'), fromMe: true, text: trimmed, createdAt: Date.now() }
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId ? { ...c, messages: [...c.messages, outgoing], unread: 0 } : c
      )
    )

    const convo = conversations.find((c) => c.id === conversationId)
    const userId = convo?.userId ?? ''

    // simulate typing + reply
    setTyping((t) => ({ ...t, [conversationId]: true }))
    const replyDelay = 1400 + Math.random() * 1600
    window.setTimeout(() => {
      const pool = cannedReplies[userId] ?? defaultReplies
      const reply = pool[Math.floor(Math.random() * pool.length)]
      setTyping((t) => ({ ...t, [conversationId]: false }))
      setConversations((prev) =>
        prev.map((c) =>
          c.id === conversationId
            ? {
                ...c,
                messages: [
                  ...c.messages,
                  { id: nextId('m'), fromMe: false, text: reply, createdAt: Date.now() },
                ],
              }
            : c
        )
      )
    }, replyDelay)
  }, [conversations])

  const value = useMemo<AppState>(
    () => ({
      posts,
      conversations,
      notifications,
      following,
      dark,
      toggleDark,
      toggleLike,
      toggleSave,
      addComment,
      createPost,
      toggleFollow,
      sendMessage,
      markConversationRead,
      typing,
    }),
    [posts, conversations, notifications, following, dark, typing, toggleDark, toggleLike, toggleSave, addComment, createPost, toggleFollow, sendMessage, markConversationRead]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppState {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
