// src/features/profile/mockProfileData.ts

// TODO: Replace all mock data with API calls to backend
// TODO: Add proper TypeScript interfaces matching backend schema

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  status: string;
  tags: string[];
  points: number;
  credits: number;
  followers: number;
  following: number;
  isCreator: boolean; // TODO: Derive from backend role/subscription
  joinedDate: string;
  currentFocus: string;
  currentFocusSubtitle: string;
  creatorFocus: string;
  creatorFocusSubtitle: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  unlockCondition: string;
  icon: string;
  color: string;
  unlocked: boolean;
  unlockedDate?: string;
}

export interface Game {
  id: string;
  title: string;
  thumbnail: string;
  genre: string;
  plays: number;
  rating: number;
  creator: string;
  creatorAvatar: string;
  tags: string[];
}

export interface StatModalItem {
  image: string;
  title: string;
  subtitle?: string;
  pills: { label: string; variant: "primary" | "secondary" | "accent" | "neutral" }[];
}

// ─────────────────────────────────────────────
// MOCK USER
// ─────────────────────────────────────────────

export const MOCK_CURRENT_USER: UserProfile = {
  id: "user_quilpana_001",
  username: "navya.creates",
  displayName: "Navya",
  avatar: "/Images/Profile.png",
  bio: "Designing worlds at the intersection of play and meaning. Always chasing that one mechanic that makes someone feel something.",
  status: "In the zone ✦",
  tags: ["Game Design", "UI", "Storytelling", "Psychology", "Animation", "Audio", "Physics", "Worldbuilding", "Systems", "Narrative"],
  points: 4820,
  credits: 1340,
  followers: 284,
  following: 91,
  isCreator: true, // TODO: Link to backend role
  joinedDate: "March 2024",
  currentFocus: "Finishing a puzzle game about memory and forgetting — each level erases something the player loved.",
  currentFocusSubtitle: "Current Obsession",
  creatorFocus: "Exploring mechanics where the player's choices slowly reshape the visual language of the world.",
  creatorFocusSubtitle: "Design Philosophy",
};

export const MOCK_OTHER_USER: UserProfile = {
  id: "user_quilpana_002",
  username: "arjun.plays",
  displayName: "Arjun",
  avatar: "/Images/PlayerMode.png",
  bio: "Explorer of digital worlds. Finding wonder in unexpected mechanics.",
  status: "Playing something new 🎮",
  tags: ["Exploration", "Narrative", "Puzzle", "Chill Games", "Indie"],
  points: 2210,
  credits: 0,
  followers: 0,
  following: 0,
  isCreator: false,
  joinedDate: "June 2024",
  currentFocus: "Deep in a mystery game that refuses to explain itself. I love it.",
  currentFocusSubtitle: "Currently Absorbed In",
  creatorFocus: "",
  creatorFocusSubtitle: "",
};

// ─────────────────────────────────────────────
// BADGES
// ─────────────────────────────────────────────

export const MOCK_BADGES: Badge[] = [
  {
    id: "b1",
    title: "First Spark",
    description: "Posted your first idea on the spark feed.",
    unlockCondition: "Post 1 idea",
    icon: "✦",
    color: "#a97ae6",
    unlocked: true,
    unlockedDate: "March 2024",
  },
  {
    id: "b2",
    title: "Game Maker",
    description: "Published your first game to Quilpana.",
    unlockCondition: "Publish 1 game",
    icon: "🎮",
    color: "#8eb7e5",
    unlocked: true,
    unlockedDate: "April 2024",
  },
  {
    id: "b3",
    title: "Resonant",
    description: "Received 100 upvotes across all your games.",
    unlockCondition: "100 total upvotes",
    icon: "◈",
    color: "#E6C26A",
    unlocked: true,
    unlockedDate: "May 2024",
  },
  {
    id: "b4",
    title: "The Connector",
    description: "Gave meaningful feedback to 50 different creators.",
    unlockCondition: "50 feedback given",
    icon: "⟐",
    color: "#ef92b0",
    unlocked: true,
    unlockedDate: "May 2024",
  },
  {
    id: "b5",
    title: "Devoted",
    description: "Logged in 30 days in a row.",
    unlockCondition: "30 day streak",
    icon: "⬡",
    color: "#5fbdcd",
    unlocked: false,
  },
  {
    id: "b6",
    title: "World Builder",
    description: "Published 5 games with more than 500 plays each.",
    unlockCondition: "5 games × 500 plays",
    icon: "⊕",
    color: "#c084fc",
    unlocked: false,
  },
  {
    id: "b7",
    title: "Curator",
    description: "Added 20 games to your favorites list.",
    unlockCondition: "20 favorited games",
    icon: "❋",
    color: "#86efac",
    unlocked: false,
  },
  {
    id: "b8",
    title: "Legend",
    description: "Reached 10,000 points on Quilpana.",
    unlockCondition: "10,000 points",
    icon: "★",
    color: "#fbbf24",
    unlocked: false,
  },
];

// ─────────────────────────────────────────────
// FAVORITE GAMES (Player Mode)
// ─────────────────────────────────────────────

export const MOCK_FAVORITE_GAMES: Game[] = [
  {
    id: "g1",
    title: "Echoes of Drift",
    thumbnail: "/Images/Creatormode.png",
    genre: "Atmospheric Puzzle",
    plays: 4200,
    rating: 4.8,
    creator: "zara.builds",
    creatorAvatar: "/Images/Profile.png",
    tags: ["Atmospheric", "Puzzle"],
  },
  {
    id: "g2",
    title: "CogniPop",
    thumbnail: "/Images/PlayerMode.png",
    genre: "Cognitive",
    plays: 8900,
    rating: 4.6,
    creator: "rishi.dev",
    creatorAvatar: "/Images/Creatormode.png",
    tags: ["Brain", "Fast"],
  },
  {
    id: "g3",
    title: "Void Garden",
    thumbnail: "/Images/Creatormode.png",
    genre: "Exploration",
    plays: 3100,
    rating: 4.9,
    creator: "luna.art",
    creatorAvatar: "/Images/PlayerMode.png",
    tags: ["Exploration", "Chill"],
  },
  {
    id: "g4",
    title: "Fracture",
    thumbnail: "/Images/PlayerMode.png",
    genre: "Action Puzzle",
    plays: 5500,
    rating: 4.5,
    creator: "kai.logic",
    creatorAvatar: "/Images/Profile.png",
    tags: ["Puzzle", "Action"],
  },
  {
    id: "g5",
    title: "Lumen",
    thumbnail: "/Images/Creatormode.png",
    genre: "Narrative",
    plays: 2200,
    rating: 4.7,
    creator: "priya.writes",
    creatorAvatar: "/Images/Creatormode.png",
    tags: ["Story", "Emotional"],
  },
];

// ─────────────────────────────────────────────
// CREATED GAMES (Creator Mode)
// ─────────────────────────────────────────────

export const MOCK_CREATED_GAMES: Game[] = [
  {
    id: "cg1",
    title: "Mnemosyne",
    thumbnail: "/Images/Creatormode.png",
    genre: "Memory Puzzle",
    plays: 6800,
    rating: 4.8,
    creator: "navya.creates",
    creatorAvatar: "/Images/Profile.png",
    tags: ["Memory", "Emotional"],
  },
  {
    id: "cg2",
    title: "Signal/Noise",
    thumbnail: "/Images/PlayerMode.png",
    genre: "Experimental",
    plays: 3200,
    rating: 4.5,
    creator: "navya.creates",
    creatorAvatar: "/Images/Profile.png",
    tags: ["Experimental", "Audio"],
  },
  {
    id: "cg3",
    title: "The Weight of Light",
    thumbnail: "/Images/Creatormode.png",
    genre: "Atmospheric",
    plays: 4900,
    rating: 4.9,
    creator: "navya.creates",
    creatorAvatar: "/Images/Profile.png",
    tags: ["Atmospheric", "Narrative"],
  },
];

// ─────────────────────────────────────────────
// PLAYER STATS MODAL DATA
// ─────────────────────────────────────────────

export const MOCK_PLAYER_STATS = {
  ideasPosted: {
    count: 23,
    items: [
      { image: "/Images/Profile.png", title: "A game where sound is the only UI", subtitle: "Posted Mar 2024", pills: [{ label: "48 upvotes", variant: "primary" as const }, { label: "Audio", variant: "secondary" as const }] },
      { image: "/Images/Creatormode.png", title: "What if losing gave you power?", subtitle: "Posted Apr 2024", pills: [{ label: "91 upvotes", variant: "primary" as const }, { label: "Mechanics", variant: "accent" as const }] },
      { image: "/Images/PlayerMode.png", title: "Maps that breathe and change", subtitle: "Posted Apr 2024", pills: [{ label: "37 upvotes", variant: "primary" as const }, { label: "World", variant: "secondary" as const }] },
      { image: "/Images/Profile.png", title: "Puzzles that remember your playstyle", subtitle: "Posted May 2024", pills: [{ label: "62 upvotes", variant: "primary" as const }, { label: "AI", variant: "accent" as const }] },
    ],
  },
  gamesPlayed: {
    count: 147,
    items: [
      { image: "/Images/Creatormode.png", title: "Echoes of Drift", subtitle: "by zara.builds", pills: [{ label: "4.8 ★", variant: "accent" as const }, { label: "Puzzle", variant: "secondary" as const }] },
      { image: "/Images/PlayerMode.png", title: "CogniPop", subtitle: "by rishi.dev", pills: [{ label: "4.6 ★", variant: "accent" as const }, { label: "Cognitive", variant: "primary" as const }] },
      { image: "/Images/Creatormode.png", title: "Void Garden", subtitle: "by luna.art", pills: [{ label: "4.9 ★", variant: "accent" as const }, { label: "Chill", variant: "secondary" as const }] },
      { image: "/Images/Profile.png", title: "Fracture", subtitle: "by kai.logic", pills: [{ label: "4.5 ★", variant: "accent" as const }, { label: "Action", variant: "primary" as const }] },
    ],
  },
  upvotesGiven: {
    count: 312,
    items: [
      { image: "/Images/Creatormode.png", title: "Echoes of Drift", subtitle: "by zara.builds", pills: [{ label: "Upvoted May 2024", variant: "primary" as const }, { label: "Puzzle", variant: "secondary" as const }] },
      { image: "/Images/PlayerMode.png", title: "Lumen", subtitle: "by priya.writes", pills: [{ label: "Upvoted Apr 2024", variant: "primary" as const }, { label: "Narrative", variant: "secondary" as const }] },
      { image: "/Images/Creatormode.png", title: "CogniPop", subtitle: "by rishi.dev", pills: [{ label: "Upvoted Mar 2024", variant: "primary" as const }, { label: "Cognitive", variant: "secondary" as const }] },
    ],
  },
  sparkedIdeas: {
    count: 18,
    items: [
      { image: "/Images/Profile.png", title: "A puzzle game about grief stages", subtitle: "Sparked from: zara.builds", pills: [{ label: "Narrative", variant: "secondary" as const }, { label: "Emotional", variant: "primary" as const }] },
      { image: "/Images/PlayerMode.png", title: "Terrain that adapts to music", subtitle: "Sparked from: luna.art", pills: [{ label: "Audio", variant: "accent" as const }, { label: "World", variant: "secondary" as const }] },
    ],
  },
};

// ─────────────────────────────────────────────
// CREATOR STATS MODAL DATA
// ─────────────────────────────────────────────

export const MOCK_CREATOR_STATS = {
  totalPlays: {
    count: 14900,
    items: [
      { image: "/Images/Creatormode.png", title: "Mnemosyne", subtitle: "Memory Puzzle", pills: [{ label: "6,800 plays", variant: "primary" as const }, { label: "4.8 ★", variant: "accent" as const }] },
      { image: "/Images/PlayerMode.png", title: "Signal/Noise", subtitle: "Experimental", pills: [{ label: "3,200 plays", variant: "primary" as const }, { label: "4.5 ★", variant: "accent" as const }] },
      { image: "/Images/Creatormode.png", title: "The Weight of Light", subtitle: "Atmospheric", pills: [{ label: "4,900 plays", variant: "primary" as const }, { label: "4.9 ★", variant: "accent" as const }] },
    ],
  },
  totalUpvotes: {
    count: 1284,
    items: [
      { image: "/Images/Creatormode.png", title: "Mnemosyne", subtitle: "navya.creates", pills: [{ label: "741 upvotes", variant: "primary" as const }, { label: "Memory Puzzle", variant: "secondary" as const }] },
      { image: "/Images/PlayerMode.png", title: "Signal/Noise", subtitle: "navya.creates", pills: [{ label: "289 upvotes", variant: "primary" as const }, { label: "Experimental", variant: "secondary" as const }] },
      { image: "/Images/Creatormode.png", title: "The Weight of Light", subtitle: "navya.creates", pills: [{ label: "254 upvotes", variant: "primary" as const }, { label: "Atmospheric", variant: "secondary" as const }] },
    ],
  },
  totalFeedback: {
    count: 89,
    items: [
      { image: "/Images/Profile.png", title: "zara.builds", subtitle: "on Mnemosyne", pills: [{ label: "Positive", variant: "primary" as const }, { label: "Puzzle", variant: "secondary" as const }] },
      { image: "/Images/PlayerMode.png", title: "kai.logic", subtitle: "on Signal/Noise", pills: [{ label: "Neutral", variant: "neutral" as const }, { label: "Audio", variant: "accent" as const }] },
      { image: "/Images/Creatormode.png", title: "priya.writes", subtitle: "on Weight of Light", pills: [{ label: "Positive", variant: "primary" as const }, { label: "Narrative", variant: "secondary" as const }] },
    ],
  },
};

