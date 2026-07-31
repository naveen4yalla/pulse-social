export interface User {
  id: string
  username: string
  name: string
  avatar: string
  bio: string
  followers: number
  following: number
  verified?: boolean
}

export interface Comment {
  id: string
  userId: string
  text: string
  createdAt: number
  likes: number
}

export interface Post {
  id: string
  userId: string
  image: string
  caption: string
  location?: string
  likedBy: number
  liked: boolean
  saved: boolean
  comments: Comment[]
  createdAt: number
}

export interface Story {
  id: string
  userId: string
  images: string[]
  seen: boolean
}

export interface Message {
  id: string
  fromMe: boolean
  text: string
  createdAt: number
}

export interface Conversation {
  id: string
  userId: string
  messages: Message[]
  unread: number
}

export type NotificationType = 'like' | 'follow' | 'comment' | 'mention'

export interface AppNotification {
  id: string
  type: NotificationType
  userId: string
  postImage?: string
  text: string
  createdAt: number
  read: boolean
}
