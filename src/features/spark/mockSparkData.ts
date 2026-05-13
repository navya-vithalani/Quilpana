// ============================================================
// mockSparkData.ts
// All mock data for the Spark feature.
// TODO: Replace each export with real API calls when backend is ready.
// ============================================================

export interface Spark {
  id: string;
  title: string;
  description: string;
  author: string;
  github?: string;
  parentSparkId?: string;
  lookingFor?: string[];
  upvotes: number;
  createdAt: string;
}

export interface Creator {
  id: string;
  username: string;
  avatar: string;
  firstUploadDate: string;
  games: {
    id: string;
    title: string;
    thumbnail: string;
    url: string;
  }[];
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  completions: number;
}

export interface UserRank {
  id: string;
  username: string;
  avatar: string;
  points: number;
  credits: number;
}

// -------------------------------------------------------
// SPARKS
// TODO: GET /api/sparks — paginated, sorted by upvotes
// -------------------------------------------------------
export const mockSparks: Spark[] = [
  {
    id: "SPK-001",
    title: "Gravity Puzzle with Reversible Time",
    description:
      "A puzzle game where you can rewind gravity independently from object positions. Imagine placing blocks mid-fall then rewinding only gravity to float them.",
    author: "mira_builds",
    github: "https://github.com/example/gravity-puzzle",
    lookingFor: ["physics logic", "UI polish"],
    upvotes: 42,
    createdAt: "2025-07-01",
  },
  {
    id: "SPK-002",
    title: "Sound-Reactive Terrain Generator",
    description:
      "Procedural terrain that deforms in real time based on microphone input. Whisper to create valleys, shout to make mountains. No music required.",
    author: "neon_drift",
    lookingFor: ["sound design", "animation help"],
    upvotes: 37,
    createdAt: "2025-07-03",
  },
  {
    id: "SPK-003",
    title: "One-Pixel Platformer",
    description:
      "Every element — player, platforms, enemies — is exactly one pixel. The challenge is designing readable gameplay at absolute minimum fidelity.",
    author: "pixel_theorist",
    parentSparkId: "SPK-001",
    lookingFor: ["game design", "UI polish"],
    upvotes: 29,
    createdAt: "2025-07-04",
  },
  {
    id: "SPK-004",
    title: "Collaborative Drawing → Playable Level",
    description:
      "Users draw a level together on a shared canvas. After 60 seconds, the drawing becomes a playable platformer. Lines become platforms, red becomes lava.",
    author: "collab_lab",
    github: "https://github.com/example/draw-level",
    lookingFor: ["animation help", "AI help"],
    upvotes: 55,
    createdAt: "2025-07-05",
  },
  {
    id: "SPK-005",
    title: "Emotion-Driven Enemy Behavior",
    description:
      "Enemies have moods — curious, afraid, bored, angry — and behave accordingly. Mood shifts based on player actions, not just proximity.",
    author: "mira_builds",
    lookingFor: ["AI help", "game design"],
    upvotes: 31,
    createdAt: "2025-07-06",
  },
  {
    id: "SPK-006",
    title: "Invisible Ink Puzzle Game",
    description:
      "All platforms are invisible until the player hovers near them. Memory and spatial reasoning are the core mechanics, not reflex.",
    author: "ghost_dev",
    parentSparkId: "SPK-003",
    lookingFor: ["UI polish"],
    upvotes: 18,
    createdAt: "2025-07-07",
  },
  {
    id: "SPK-007",
    title: "Multiplayer Haiku Generator",
    description:
      "Two players each control a cursor over a word grid. Words they overlap together get added to a haiku. The game ends when the haiku is complete.",
    author: "wordsmithy",
    github: "https://github.com/example/haiku-game",
    lookingFor: ["animation help", "sound design"],
    upvotes: 22,
    createdAt: "2025-07-08",
  },
  {
    id: "SPK-008",
    title: "Shadow Puppet Physics Sandbox",
    description:
      "Use a virtual light source and physical objects to cast shadows. Shadows are actual collideable geometry. Build contraptions with light.",
    author: "neon_drift",
    lookingFor: ["physics logic", "UI polish"],
    upvotes: 48,
    createdAt: "2025-07-09",
  },
  {
    id: "SPK-009",
    title: "Reverse Roguelike — Design the Dungeon",
    description:
      "Instead of running through dungeons, you design one. An AI character attempts to beat it. You win when they can't.",
    author: "dungeon_arch",
    parentSparkId: "SPK-004",
    lookingFor: ["AI help", "game design"],
    upvotes: 61,
    createdAt: "2025-07-10",
  },
  {
    id: "SPK-010",
    title: "Breathing Rhythm Game",
    description:
      "The game pace, music, and visuals slow and speed up based on your breathing pattern detected via webcam. Inhale to slow time, exhale to speed up.",
    author: "biofeedback_labs",
    lookingFor: ["sound design", "animation help"],
    upvotes: 39,
    createdAt: "2025-07-11",
  },
  {
    id: "SPK-011",
    title: "Text Adventure Inside a Spreadsheet",
    description:
      "A text RPG implemented entirely inside a spreadsheet UI. Cells are rooms, formulas are game logic. No canvas, just grid.",
    author: "spreadsheet_wizard",
    github: "https://github.com/example/sheet-rpg",
    lookingFor: ["game design"],
    upvotes: 27,
    createdAt: "2025-07-12",
  },
  {
    id: "SPK-012",
    title: "Glitch Art Generator with Exportable PNGs",
    description:
      "Upload an image, apply various glitch algorithms in real time, export as art. Sliders for each glitch type. Feels like a lo-fi Photoshop.",
    author: "pixel_theorist",
    lookingFor: ["UI polish", "animation help"],
    upvotes: 33,
    createdAt: "2025-07-13",
  },
];

// -------------------------------------------------------
// CREATORS
// TODO: GET /api/creators/new — sorted by join date
// -------------------------------------------------------
export const mockCreators: Creator[] = [
  {
    id: "c-001",
    username: "mira_builds",
    avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=mira",
    firstUploadDate: "Jul 1, 2025",
    games: [
      {
        id: "g-001",
        title: "Gravity Flip",
        thumbnail: "https://picsum.photos/seed/gravflip/48/48",
        url: "/games/gravity-flip",
      },
      {
        id: "g-002",
        title: "Neon Runner",
        thumbnail: "https://picsum.photos/seed/neonrun/48/48",
        url: "/games/neon-runner",
      },
    ],
  },
  {
    id: "c-002",
    username: "neon_drift",
    avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=neon",
    firstUploadDate: "Jun 28, 2025",
    games: [
      {
        id: "g-003",
        title: "Sound Maze",
        thumbnail: "https://picsum.photos/seed/soundmaze/48/48",
        url: "/games/sound-maze",
      },
    ],
  },
  {
    id: "c-003",
    username: "ghost_dev",
    avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=ghost",
    firstUploadDate: "Jul 3, 2025",
    games: [
      {
        id: "g-004",
        title: "Invisible Ink",
        thumbnail: "https://picsum.photos/seed/invisink/48/48",
        url: "/games/invisible-ink",
      },
    ],
  },
  {
    id: "c-004",
    username: "wordsmithy",
    avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=words",
    firstUploadDate: "Jul 5, 2025",
    games: [
      {
        id: "g-005",
        title: "Haiku Wars",
        thumbnail: "https://picsum.photos/seed/haiku/48/48",
        url: "/games/haiku-wars",
      },
      {
        id: "g-006",
        title: "Word Drop",
        thumbnail: "https://picsum.photos/seed/worddrop/48/48",
        url: "/games/word-drop",
      },
    ],
  },
  {
    id: "c-005",
    username: "dungeon_arch",
    avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=dungeon",
    firstUploadDate: "Jul 7, 2025",
    games: [
      {
        id: "g-007",
        title: "Build-A-Dungeon",
        thumbnail: "https://picsum.photos/seed/dungeon/48/48",
        url: "/games/build-a-dungeon",
      },
    ],
  },
  {
    id: "c-006",
    username: "biofeedback_labs",
    avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=bio",
    firstUploadDate: "Jul 9, 2025",
    games: [
      {
        id: "g-008",
        title: "Breathe",
        thumbnail: "https://picsum.photos/seed/breathe/48/48",
        url: "/games/breathe",
      },
    ],
  },
];

// -------------------------------------------------------
// QUESTS
// TODO: GET /api/quests — active quests from admin panel
// -------------------------------------------------------
export const mockQuests: Quest[] = [
  {
    id: "q-001",
    title: "Circles Only",
    description:
      "Build a game using only circular shapes. No rectangles, no triangles. Every element must be a circle or arc.",
    completions: 14,
  },
  {
    id: "q-002",
    title: "Chaotic Controls",
    description:
      "Make a game where the controls change every 10 seconds. The player must adapt constantly.",
    completions: 8,
  },
  {
    id: "q-003",
    title: "One Button",
    description:
      "Design a complete game that uses only a single input — one key, one click, one tap.",
    completions: 31,
  },
  {
    id: "q-004",
    title: "No Sound At All",
    description:
      "Build a game with zero audio. Communicate everything — danger, reward, mood — visually only.",
    completions: 6,
  },
  {
    id: "q-005",
    title: "60-Second Story",
    description:
      "Tell a complete narrative arc in exactly 60 seconds of gameplay. Beginning, middle, end.",
    completions: 19,
  },
  {
    id: "q-006",
    title: "Monochrome World",
    description:
      "Design a game using only one hue. Tints and shades allowed, but zero hue variation.",
    completions: 11,
  },
  {
    id: "q-007",
    title: "Gravity is Optional",
    description:
      "Build something where gravity can be toggled, reversed, or removed entirely by the player.",
    completions: 23,
  },
];

// -------------------------------------------------------
// RECOGNITION — exactly 20 users
// TODO: GET /api/recognition — sorted by points desc
// Profiles are NOT clickable by design (quiet recognition)
// -------------------------------------------------------
export const mockUsers: UserRank[] = [
  { id: "u-01", username: "mira_builds", avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=mira", points: 4820, credits: 192 },
  { id: "u-02", username: "collab_lab", avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=collab", points: 4310, credits: 174 },
  { id: "u-03", username: "neon_drift", avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=neon", points: 3990, credits: 161 },
  { id: "u-04", username: "dungeon_arch", avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=dungeon", points: 3540, credits: 143 },
  { id: "u-05", username: "pixel_theorist", avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=pixel", points: 3120, credits: 128 },
  { id: "u-06", username: "ghost_dev", avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=ghost", points: 2870, credits: 115 },
  { id: "u-07", username: "biofeedback_labs", avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=bio", points: 2650, credits: 107 },
  { id: "u-08", username: "wordsmithy", avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=words", points: 2410, credits: 98 },
  { id: "u-09", username: "spreadsheet_wizard", avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=spreadsheet", points: 2180, credits: 89 },
  { id: "u-10", username: "loop_crafter", avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=loop", points: 1990, credits: 82 },
  { id: "u-11", username: "echo_frame", avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=echo", points: 1780, credits: 73 },
  { id: "u-12", username: "terrain_gen", avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=terrain", points: 1640, credits: 67 },
  { id: "u-13", username: "soft_signal", avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=soft", points: 1510, credits: 62 },
  { id: "u-14", username: "analog_kid", avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=analog", points: 1390, credits: 57 },
  { id: "u-15", username: "midnight_build", avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=midnight", points: 1240, credits: 51 },
  { id: "u-16", username: "ink_machine", avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=ink", points: 1110, credits: 46 },
  { id: "u-17", username: "wave_runner", avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=wave", points: 980, credits: 41 },
  { id: "u-18", username: "dusk_protocol", avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=dusk", points: 840, credits: 35 },
  { id: "u-19", username: "quiet_flux", avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=quiet", points: 710, credits: 30 },
  { id: "u-20", username: "void_sketch", avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=void", points: 580, credits: 25 },
];