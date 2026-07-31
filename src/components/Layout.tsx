import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  Home,
  Search,
  Clapperboard,
  MessageCircle,
  Heart,
  PlusSquare,
  Menu,
  Moon,
  Sun,
  Compass,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { userById, CURRENT_USER_ID } from '../data/mock'
import Avatar from './Avatar'
import CreatePostModal from './CreatePostModal'
import { cn } from '../lib/utils'

const me = () => userById(CURRENT_USER_ID)

interface NavItemDef {
  to: string
  label: string
  icon: typeof Home
  badge?: number
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { conversations, notifications, dark, toggleDark } = useApp()
  const [createOpen, setCreateOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const unreadDMs = conversations.reduce((n, c) => n + (c.unread > 0 ? 1 : 0), 0)
  const unreadNotifs = notifications.filter((n) => !n.read).length

  const navItems: NavItemDef[] = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/explore', label: 'Explore', icon: Compass },
    { to: '/reels', label: 'Media', icon: Clapperboard },
    { to: '/messages', label: 'Messages', icon: MessageCircle, badge: unreadDMs },
    { to: '/notifications', label: 'Notifications', icon: Heart, badge: unreadNotifs },
  ]

  const isMessages = location.pathname.startsWith('/messages')

  return (
    <div className="min-h-full bg-neutral-50 dark:bg-neutral-950">
      {/* Desktop left nav */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 z-30 w-[76px] xl:w-64 flex-col border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-3 py-6">
        <NavLink to="/" className="mb-8 px-2 flex items-center gap-2">
          <span className="brand-gradient inline-flex h-9 w-9 items-center justify-center rounded-xl text-white font-extrabold">
            P
          </span>
          <span className="hidden xl:inline text-2xl font-extrabold tracking-tight brand-text">
            Pulse
          </span>
        </NavLink>

        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <NavItem key={item.to} item={item} />
          ))}
          <button
            onClick={() => setCreateOpen(true)}
            className="group flex items-center gap-4 rounded-xl px-3 py-3 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            <PlusSquare className="h-6 w-6 shrink-0" strokeWidth={1.9} />
            <span className="hidden xl:inline text-[15px] font-medium">Create</span>
          </button>
          <NavLink
            to={`/u/${me().username}`}
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-4 rounded-xl px-3 py-2.5 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900',
                isActive && 'font-semibold'
              )
            }
          >
            <Avatar src={me().avatar} alt={me().name} size={26} />
            <span className="hidden xl:inline text-[15px] font-medium">Profile</span>
          </NavLink>
        </nav>

        <button
          onClick={toggleDark}
          className="mt-2 flex items-center gap-4 rounded-xl px-3 py-3 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
        >
          {dark ? <Sun className="h-6 w-6 shrink-0" strokeWidth={1.9} /> : <Moon className="h-6 w-6 shrink-0" strokeWidth={1.9} />}
          <span className="hidden xl:inline text-[15px] font-medium">{dark ? 'Light mode' : 'Dark mode'}</span>
        </button>
        <div className="mt-1 hidden xl:flex items-center gap-4 rounded-xl px-3 py-2 text-neutral-500">
          <Menu className="h-5 w-5" strokeWidth={1.9} />
          <span className="text-[13px]">More</span>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden sticky top-0 z-30 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/90 backdrop-blur px-4 h-14">
        <NavLink to="/" className="text-2xl font-extrabold tracking-tight brand-text">
          Pulse
        </NavLink>
        <div className="flex items-center gap-1">
          <button
            onClick={toggleDark}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-6 w-6" strokeWidth={1.9} /> : <Moon className="h-6 w-6" strokeWidth={1.9} />}
          </button>
          <button
            onClick={() => navigate('/messages')}
            className="relative p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900"
            aria-label="Messages"
          >
            <MessageCircle className="h-6 w-6" strokeWidth={1.9} />
            {unreadDMs > 0 && (
              <span className="absolute top-1 right-1 h-4 min-w-4 px-1 rounded-full brand-gradient text-[10px] font-bold text-white flex items-center justify-center">
                {unreadDMs}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main
        className={cn(
          'md:pl-[76px] xl:pl-64 overflow-x-hidden',
          isMessages ? '' : 'pb-20 md:pb-0'
        )}
      >
        {children}
      </main>

      {/* Mobile bottom nav */}
      {!isMessages && (
        <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 flex items-center justify-around border-t border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur h-16 px-2">
          <MobileTab to="/" icon={Home} label="Home" />
          <MobileTab to="/explore" icon={Search} label="Explore" />
          <button
            onClick={() => setCreateOpen(true)}
            className="flex flex-col items-center justify-center text-neutral-700 dark:text-neutral-300"
            aria-label="Create"
          >
            <PlusSquare className="h-7 w-7" strokeWidth={1.9} />
          </button>
          <MobileTab to="/notifications" icon={Heart} label="Activity" badge={unreadNotifs} />
          <MobileTab to={`/u/${me().username}`} avatar={me().avatar} label="Profile" />
        </nav>
      )}

      <CreatePostModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  )
}

function NavItem({ item }: { item: NavItemDef }) {
  const Icon = item.icon
  return (
    <NavLink
      to={item.to}
      end={item.to === '/'}
      className={({ isActive }) =>
        cn(
          'group relative flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900',
          isActive ? 'font-semibold' : 'font-medium'
        )
      }
    >
      {({ isActive }) => (
        <>
          <span className="relative shrink-0">
            <Icon className="h-6 w-6" strokeWidth={isActive ? 2.4 : 1.9} />
            {!!item.badge && item.badge > 0 && (
              <span className="absolute -top-1.5 -right-1.5 h-4 min-w-4 px-1 rounded-full brand-gradient text-[10px] font-bold text-white flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </span>
          <span className="hidden xl:inline text-[15px]">{item.label}</span>
        </>
      )}
    </NavLink>
  )
}

function MobileTab({
  to,
  icon: Icon,
  avatar,
  label,
  badge,
}: {
  to: string
  icon?: typeof Home
  avatar?: string
  label: string
  badge?: number
}) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      aria-label={label}
      className={({ isActive }) =>
        cn(
          'relative flex flex-col items-center justify-center',
          isActive ? 'text-neutral-900 dark:text-white' : 'text-neutral-500'
        )
      }
    >
      {({ isActive }) =>
        avatar ? (
          <span className={cn('rounded-full', isActive && 'ring-2 ring-neutral-900 dark:ring-white')}>
            <Avatar src={avatar} alt={label} size={26} />
          </span>
        ) : (
          <span className="relative">
            {Icon && <Icon className="h-7 w-7" strokeWidth={isActive ? 2.4 : 1.9} fill={isActive && Icon === Home ? 'currentColor' : 'none'} />}
            {!!badge && badge > 0 && (
              <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full brand-gradient text-[10px] font-bold text-white flex items-center justify-center">
                {badge}
              </span>
            )}
          </span>
        )
      }
    </NavLink>
  )
}
