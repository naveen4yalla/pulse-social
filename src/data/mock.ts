import type {
  User,
  Post,
  Story,
  Conversation,
  AppNotification,
} from '../types'

const MIN = 60 * 1000
const HOUR = 60 * MIN
const DAY = 24 * HOUR
const now = Date.now()

export const CURRENT_USER_ID = 'u_me'

export const users: User[] = [
  {
    id: 'u_me',
    username: 'naveen',
    name: 'Naveen Yalla',
    avatar: 'https://i.pravatar.cc/150?img=12',
    bio: 'Building things on the web ✦ coffee-driven developer ✦ Hyderabad → SF',
    followers: 1842,
    following: 312,
    verified: true,
  },
  {
    id: 'u_maya',
    username: 'maya.codes',
    name: 'Maya Fernandes',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'Frontend engineer. Design systems nerd. Making pixels behave.',
    followers: 24300,
    following: 489,
    verified: true,
  },
  {
    id: 'u_leo',
    username: 'leo.trails',
    name: 'Leo Marchetti',
    avatar: 'https://i.pravatar.cc/150?img=33',
    bio: 'Chasing sunrises and mountain passes 🏔️ Landscape photographer.',
    followers: 58900,
    following: 210,
    verified: true,
  },
  {
    id: 'u_aisha',
    username: 'aisha.eats',
    name: 'Aisha Rahman',
    avatar: 'https://i.pravatar.cc/150?img=45',
    bio: 'Home cook • recipe developer • your next craving lives here 🍜',
    followers: 91200,
    following: 640,
  },
  {
    id: 'u_kenji',
    username: 'kenji.builds',
    name: 'Kenji Tanaka',
    avatar: 'https://i.pravatar.cc/150?img=68',
    bio: 'Product designer at a tiny startup. Woodworking on weekends.',
    followers: 7830,
    following: 421,
  },
  {
    id: 'u_sofia',
    username: 'sofia.moves',
    name: 'Sofia Alvarez',
    avatar: 'https://i.pravatar.cc/150?img=47',
    bio: 'Dancer & movement coach 💃 Teaching bodies to feel music.',
    followers: 132000,
    following: 380,
    verified: true,
  },
  {
    id: 'u_theo',
    username: 'theo.reads',
    name: 'Theo Nkemelu',
    avatar: 'https://i.pravatar.cc/150?img=59',
    bio: 'Bookstagram • sci-fi hoarder • 200 books behind on my TBR.',
    followers: 15400,
    following: 902,
  },
  {
    id: 'u_priya',
    username: 'priya.paints',
    name: 'Priya Nair',
    avatar: 'https://i.pravatar.cc/150?img=41',
    bio: 'Watercolor + ink. Selling originals in the shop 🎨',
    followers: 43700,
    following: 156,
  },
  {
    id: 'u_marco',
    username: 'marco.rides',
    name: 'Marco Silva',
    avatar: 'https://i.pravatar.cc/150?img=52',
    bio: 'Cyclist. 200km on Sundays. Espresso in between.',
    followers: 9200,
    following: 340,
  },
  {
    id: 'u_nadia',
    username: 'nadia.lens',
    name: 'Nadia Petrova',
    avatar: 'https://i.pravatar.cc/150?img=24',
    bio: 'Street photography, mostly at golden hour. Film > digital, fight me.',
    followers: 26800,
    following: 512,
    verified: true,
  },
]

export const userById = (id: string): User =>
  users.find((u) => u.id === id) ?? users[0]
export const userByUsername = (username: string): User | undefined =>
  users.find((u) => u.username === username)

const img = (seed: string) => `https://picsum.photos/seed/${seed}/900/900`

export const posts: Post[] = [
  {
    id: 'p1',
    userId: 'u_leo',
    image: img('pulse-alps'),
    caption:
      'Woke up at 4am for this one. The valley was completely silent — just wind and the first light hitting the ridge. Worth every shivering minute. 🏔️',
    location: 'Dolomites, Italy',
    likedBy: 8421,
    liked: false,
    saved: false,
    createdAt: now - 42 * MIN,
    comments: [
      { id: 'c1', userId: 'u_nadia', text: 'That light is unreal 😍', createdAt: now - 30 * MIN, likes: 42 },
      { id: 'c2', userId: 'u_marco', text: 'Adding this to my ride bucket list', createdAt: now - 22 * MIN, likes: 8 },
      { id: 'c3', userId: 'u_me', text: 'okay this is my new wallpaper', createdAt: now - 10 * MIN, likes: 3 },
    ],
  },
  {
    id: 'p2',
    userId: 'u_aisha',
    image: img('pulse-ramen'),
    caption:
      '20-minute weeknight ramen that tastes like it simmered all day. Miso, garlic, a soft egg, and way too much chili oil. Full recipe in comments 🍜',
    location: 'Home kitchen',
    likedBy: 12903,
    liked: true,
    saved: true,
    createdAt: now - 2 * HOUR,
    comments: [
      { id: 'c4', userId: 'u_kenji', text: 'made this last night, 10/10', createdAt: now - 1 * HOUR, likes: 61 },
      { id: 'c5', userId: 'u_sofia', text: 'the egg. THE EGG.', createdAt: now - 55 * MIN, likes: 24 },
    ],
  },
  {
    id: 'p3',
    userId: 'u_maya',
    image: img('pulse-desk'),
    caption:
      'Shipped the new design system today after three months of late nights. 240 components, one source of truth, zero rogue hex codes. Sleeping for a week now. 💤',
    location: 'San Francisco, CA',
    likedBy: 5340,
    liked: false,
    saved: false,
    createdAt: now - 5 * HOUR,
    comments: [
      { id: 'c6', userId: 'u_me', text: 'the tokens page alone must be a novel', createdAt: now - 4 * HOUR, likes: 12 },
      { id: 'c7', userId: 'u_theo', text: 'zero rogue hex codes is a dream I will never live', createdAt: now - 3 * HOUR, likes: 33 },
    ],
  },
  {
    id: 'p4',
    userId: 'u_sofia',
    image: img('pulse-dance'),
    caption:
      'New choreography drop 🎶 Six weeks of building this piece with the crew. Swipe to feel the drop. Rehearsal footage soon.',
    location: 'Studio 4',
    likedBy: 40211,
    liked: true,
    saved: false,
    createdAt: now - 7 * HOUR,
    comments: [
      { id: 'c8', userId: 'u_priya', text: 'the control at 0:14 😮‍💨', createdAt: now - 6 * HOUR, likes: 88 },
    ],
  },
  {
    id: 'p5',
    userId: 'u_nadia',
    image: img('pulse-street'),
    caption:
      'Golden hour in the old quarter. Stood on this corner for 40 minutes waiting for someone to walk through the light. She did. 🎞️ Portra 400.',
    location: 'Lisbon, Portugal',
    likedBy: 9876,
    liked: false,
    saved: true,
    createdAt: now - 11 * HOUR,
    comments: [
      { id: 'c9', userId: 'u_leo', text: 'patience pays. gorgeous frame.', createdAt: now - 10 * HOUR, likes: 51 },
      { id: 'c10', userId: 'u_maya', text: 'the grain 🤌', createdAt: now - 9 * HOUR, likes: 19 },
    ],
  },
  {
    id: 'p6',
    userId: 'u_kenji',
    image: img('pulse-wood'),
    caption:
      'Finished the walnut side table this weekend. Hand-cut dovetails, no screws, three coats of oil. My hands are destroyed and I could not be happier.',
    location: 'Garage workshop',
    likedBy: 3120,
    liked: false,
    saved: false,
    createdAt: now - 14 * HOUR,
    comments: [
      { id: 'c11', userId: 'u_aisha', text: 'those joints are so clean!', createdAt: now - 13 * HOUR, likes: 14 },
    ],
  },
  {
    id: 'p7',
    userId: 'u_priya',
    image: img('pulse-paint'),
    caption:
      'Loose watercolor study of the harbor this morning. Let the pigment do most of the work and tried not to overthink it. Original is in the shop 🎨',
    location: 'Kochi, India',
    likedBy: 6740,
    liked: true,
    saved: false,
    createdAt: now - 20 * HOUR,
    comments: [
      { id: 'c12', userId: 'u_nadia', text: 'the restraint here is everything', createdAt: now - 19 * HOUR, likes: 27 },
    ],
  },
  {
    id: 'p8',
    userId: 'u_marco',
    image: img('pulse-bike'),
    caption:
      '212km today with 3,400m of climbing. Legs are jelly, soul is full. Coffee stop at the top was elite. ☕🚴',
    location: 'Col de la Madone',
    likedBy: 2210,
    liked: false,
    saved: false,
    createdAt: now - 26 * HOUR,
    comments: [
      { id: 'c13', userId: 'u_me', text: '3400m is unhinged, respect', createdAt: now - 25 * HOUR, likes: 6 },
    ],
  },
  {
    id: 'p9',
    userId: 'u_theo',
    image: img('pulse-books'),
    caption:
      'This month\'s stack. Reread Dune before the sequel, finally starting the Broken Earth trilogy. What should be next? 📚',
    location: 'The reading nook',
    likedBy: 4530,
    liked: false,
    saved: true,
    createdAt: now - 30 * HOUR,
    comments: [
      { id: 'c14', userId: 'u_maya', text: 'Broken Earth will wreck you in the best way', createdAt: now - 29 * HOUR, likes: 40 },
    ],
  },
  {
    id: 'p10',
    userId: 'u_leo',
    image: img('pulse-lake'),
    caption:
      'Mirror lake, zero wind, one very cold swim afterward. Some places make you forget your phone exists. Almost.',
    location: 'Banff, Canada',
    likedBy: 15600,
    liked: false,
    saved: false,
    createdAt: now - 2 * DAY,
    comments: [
      { id: 'c15', userId: 'u_sofia', text: 'the reflection is flawless', createdAt: now - 2 * DAY + HOUR, likes: 30 },
    ],
  },
  {
    id: 'p11',
    userId: 'u_aisha',
    image: img('pulse-brunch'),
    caption:
      'Sunday brunch situation: burnt honey butter, sourdough from Thursday\'s bake, and eggs that took three tries. Third time was the charm 🍳',
    location: 'Home kitchen',
    likedBy: 8890,
    liked: true,
    saved: false,
    createdAt: now - 2 * DAY - 3 * HOUR,
    comments: [
      { id: 'c16', userId: 'u_kenji', text: 'burnt honey butter is a life choice I need to make', createdAt: now - 2 * DAY - 2 * HOUR, likes: 22 },
    ],
  },
  {
    id: 'p12',
    userId: 'u_maya',
    image: img('pulse-code'),
    caption:
      'Debugging session that started as "quick fix" at 2pm and ended at midnight. The bug was a single missing await. It is always a single missing await.',
    location: 'San Francisco, CA',
    likedBy: 7210,
    liked: false,
    saved: false,
    createdAt: now - 3 * DAY,
    comments: [
      { id: 'c17', userId: 'u_me', text: 'i felt this in my soul', createdAt: now - 3 * DAY + HOUR, likes: 55 },
    ],
  },
  {
    id: 'p13',
    userId: 'u_nadia',
    image: img('pulse-neon'),
    caption:
      'Rainy neon night. The reflections did all the work, I just held the camera steady. 🌧️',
    location: 'Tokyo, Japan',
    likedBy: 19800,
    liked: true,
    saved: true,
    createdAt: now - 3 * DAY - 5 * HOUR,
    comments: [
      { id: 'c18', userId: 'u_leo', text: 'cinematic. frame it.', createdAt: now - 3 * DAY - 4 * HOUR, likes: 44 },
    ],
  },
  {
    id: 'p14',
    userId: 'u_sofia',
    image: img('pulse-studio'),
    caption:
      'Empty studio before class. This quiet moment is my favorite part of the day — just me, the mirror, and the possibility of it. ✨',
    location: 'Studio 4',
    likedBy: 22100,
    liked: false,
    saved: false,
    createdAt: now - 4 * DAY,
    comments: [
      { id: 'c19', userId: 'u_priya', text: 'the light in here is a painting', createdAt: now - 4 * DAY + HOUR, likes: 18 },
    ],
  },
  {
    id: 'p15',
    userId: 'u_kenji',
    image: img('pulse-sketch'),
    caption:
      'Concept sketches for a lamp I might actually build. Somewhere between "midcentury" and "I have no idea what I\'m doing". Feedback welcome.',
    location: 'Garage workshop',
    likedBy: 1980,
    liked: false,
    saved: false,
    createdAt: now - 4 * DAY - 6 * HOUR,
    comments: [
      { id: 'c20', userId: 'u_maya', text: 'the third one. build the third one.', createdAt: now - 4 * DAY - 5 * HOUR, likes: 12 },
    ],
  },
  {
    id: 'p16',
    userId: 'u_priya',
    image: img('pulse-ink'),
    caption:
      'Ink and a limited palette kind of evening. Sometimes fewer colors force better decisions.',
    location: 'Home studio',
    likedBy: 5410,
    liked: false,
    saved: false,
    createdAt: now - 5 * DAY,
    comments: [
      { id: 'c21', userId: 'u_theo', text: 'this belongs on a book cover', createdAt: now - 5 * DAY + HOUR, likes: 21 },
    ],
  },
]

export const stories: Story[] = [
  { id: 's_me', userId: 'u_me', images: [img('story-me-1'), img('story-me-2')], seen: false },
  { id: 's1', userId: 'u_maya', images: [img('story-maya-1'), img('story-maya-2'), img('story-maya-3')], seen: false },
  { id: 's2', userId: 'u_leo', images: [img('story-leo-1'), img('story-leo-2')], seen: false },
  { id: 's3', userId: 'u_aisha', images: [img('story-aisha-1')], seen: false },
  { id: 's4', userId: 'u_sofia', images: [img('story-sofia-1'), img('story-sofia-2')], seen: true },
  { id: 's5', userId: 'u_nadia', images: [img('story-nadia-1'), img('story-nadia-2')], seen: false },
  { id: 's6', userId: 'u_kenji', images: [img('story-kenji-1')], seen: true },
  { id: 's7', userId: 'u_theo', images: [img('story-theo-1')], seen: false },
  { id: 's8', userId: 'u_priya', images: [img('story-priya-1'), img('story-priya-2')], seen: false },
]

export const conversations: Conversation[] = [
  {
    id: 'conv_maya',
    userId: 'u_maya',
    unread: 2,
    messages: [
      { id: 'm1', fromMe: false, text: 'hey! did you get a chance to look at the design tokens PR?', createdAt: now - 3 * HOUR },
      { id: 'm2', fromMe: true, text: 'yeah just went through it, looks super clean 👏', createdAt: now - 3 * HOUR + 4 * MIN },
      { id: 'm3', fromMe: true, text: 'one thing — should we rename the spacing scale before it ships everywhere?', createdAt: now - 3 * HOUR + 5 * MIN },
      { id: 'm4', fromMe: false, text: 'ugh yes. renaming 240 usages later is not the vibe 😅', createdAt: now - 2 * HOUR - 40 * MIN },
      { id: 'm5', fromMe: false, text: 'can you hop on a quick call at 4?', createdAt: now - 12 * MIN },
    ],
  },
  {
    id: 'conv_leo',
    userId: 'u_leo',
    unread: 0,
    messages: [
      { id: 'm6', fromMe: false, text: 'that shot you liked — shot it on the 24mm at f/8', createdAt: now - DAY },
      { id: 'm7', fromMe: true, text: 'knew it was wide. the depth is insane', createdAt: now - DAY + 10 * MIN },
      { id: 'm8', fromMe: false, text: 'come out to the Dolomites next spring, I\'ll show you the spots', createdAt: now - DAY + 20 * MIN },
      { id: 'm9', fromMe: true, text: 'do not tempt me, I will actually book it', createdAt: now - DAY + 25 * MIN },
    ],
  },
  {
    id: 'conv_aisha',
    userId: 'u_aisha',
    unread: 1,
    messages: [
      { id: 'm10', fromMe: true, text: 'the ramen recipe changed my life, not exaggerating', createdAt: now - 6 * HOUR },
      { id: 'm11', fromMe: false, text: 'HAHA I love that. did you do the chili oil from scratch?', createdAt: now - 5 * HOUR - 50 * MIN },
      { id: 'm12', fromMe: true, text: 'obviously. burned the first batch of garlic though', createdAt: now - 5 * HOUR - 45 * MIN },
      { id: 'm13', fromMe: false, text: 'rite of passage 😂 next: gyoza, I\'ll send the fold technique', createdAt: now - 40 * MIN },
    ],
  },
  {
    id: 'conv_sofia',
    userId: 'u_sofia',
    unread: 0,
    messages: [
      { id: 'm14', fromMe: false, text: 'filming the new piece friday, want to come by the studio?', createdAt: now - 2 * DAY },
      { id: 'm15', fromMe: true, text: 'yes!! what time', createdAt: now - 2 * DAY + 15 * MIN },
      { id: 'm16', fromMe: false, text: '6pm, bring coffee and moral support ☕', createdAt: now - 2 * DAY + 20 * MIN },
    ],
  },
  {
    id: 'conv_kenji',
    userId: 'u_kenji',
    unread: 0,
    messages: [
      { id: 'm17', fromMe: true, text: 'that walnut table is unreal, are you selling?', createdAt: now - 15 * HOUR },
      { id: 'm18', fromMe: false, text: 'thinking about it! might do a small batch', createdAt: now - 14 * HOUR - 30 * MIN },
      { id: 'm19', fromMe: false, text: 'you\'d get the friends price obviously', createdAt: now - 14 * HOUR - 29 * MIN },
    ],
  },
  {
    id: 'conv_nadia',
    userId: 'u_nadia',
    unread: 0,
    messages: [
      { id: 'm20', fromMe: false, text: 'shooting film in Lisbon next month, any spot recs?', createdAt: now - 4 * DAY },
      { id: 'm21', fromMe: true, text: 'Alfama at sunrise, thank me later', createdAt: now - 4 * DAY + 30 * MIN },
    ],
  },
]

// Canned replies keyed loosely so the simulated reply feels contextual.
export const cannedReplies: Record<string, string[]> = {
  u_maya: ['sounds good! 🙌', 'haha true', 'let me check and get back to you', 'yesss exactly', 'ok 4pm works, sending invite'],
  u_leo: ['📸🔥', 'do it, seriously', 'weather looks perfect that week', 'I\'ll save you the good spot'],
  u_aisha: ['sending the recipe now 🍜', 'omg yes', 'you have to try the gyoza next', 'proud of you honestly 😂'],
  u_sofia: ['can\'t wait ✨', 'bring the good coffee!', 'you\'re the best', '6pm sharp 💃'],
  u_kenji: ['friends price, always', 'I\'ll set one aside', 'means a lot 🙏', 'give me two weeks'],
  u_nadia: ['golden hour is everything', 'noted 📝', 'you always have the best recs', 'film season begins'],
}

export const defaultReplies = ['nice!', 'haha yeah', 'totally agree', 'love that', 'omg same', 'talk soon 🙌']

export const notifications: AppNotification[] = [
  { id: 'n1', type: 'like', userId: 'u_sofia', postImage: img('pulse-desk'), text: 'liked your post.', createdAt: now - 8 * MIN, read: false },
  { id: 'n2', type: 'follow', userId: 'u_nadia', text: 'started following you.', createdAt: now - 34 * MIN, read: false },
  { id: 'n3', type: 'comment', userId: 'u_maya', postImage: img('pulse-code'), text: 'commented: "this is going straight to the docs" 📌', createdAt: now - 1 * HOUR, read: false },
  { id: 'n4', type: 'like', userId: 'u_leo', postImage: img('pulse-lake'), text: 'and 1,204 others liked your post.', createdAt: now - 3 * HOUR, read: true },
  { id: 'n5', type: 'mention', userId: 'u_aisha', postImage: img('pulse-ramen'), text: 'mentioned you in a comment.', createdAt: now - 6 * HOUR, read: true },
  { id: 'n6', type: 'follow', userId: 'u_theo', text: 'started following you.', createdAt: now - 12 * HOUR, read: true },
  { id: 'n7', type: 'like', userId: 'u_priya', postImage: img('pulse-sketch'), text: 'liked your comment.', createdAt: now - DAY, read: true },
  { id: 'n8', type: 'comment', userId: 'u_kenji', postImage: img('pulse-wood'), text: 'commented: "clean joinery 👌"', createdAt: now - DAY - 2 * HOUR, read: true },
]

// Explore grid — a broader spread of media seeds.
export const exploreImages: { id: string; image: string; likes: number; comments: number }[] = Array.from(
  { length: 21 },
  (_, i) => ({
    id: `ex${i}`,
    image: `https://picsum.photos/seed/pulse-explore-${i}/600/600`,
    likes: 400 + ((i * 733) % 9000),
    comments: 8 + ((i * 37) % 240),
  })
)
