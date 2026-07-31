import { useState } from 'react'
import { Plus } from 'lucide-react'
import Avatar from './Avatar'
import StoryViewer from './StoryViewer'
import { stories, userById, CURRENT_USER_ID } from '../data/mock'

export default function StoryBar() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
      <div className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 py-4">
          {stories.map((story, i) => {
            const user = userById(story.userId)
            const isMe = story.userId === CURRENT_USER_ID
            return (
              <button
                key={story.id}
                onClick={() => setOpenIndex(i)}
                className="flex w-16 shrink-0 flex-col items-center gap-1.5"
              >
                <span className="relative">
                  <Avatar src={user.avatar} alt={user.name} size={60} ring seen={story.seen} />
                  {isMe && (
                    <span className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full brand-gradient border-2 border-white dark:border-neutral-950">
                      <Plus className="h-3 w-3 text-white" strokeWidth={3} />
                    </span>
                  )}
                </span>
                <span className="w-full truncate text-center text-xs text-neutral-700 dark:text-neutral-300">
                  {isMe ? 'Your story' : user.username}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {openIndex !== null && (
        <StoryViewer
          startIndex={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  )
}
