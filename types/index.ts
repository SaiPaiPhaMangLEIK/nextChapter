// ─── Book ────────────────────────────────────────────────────────────────────

export type ReadingStatus = "want_to_read" | "reading" | "finished" | "paused" | "dnf";

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  isbn?: string;
  description?: string;
  genre: string[];
  pageCount?: number;
  publishedYear?: number;
  rating?: number;
  status: ReadingStatus;
  progress?: ReadingProgress;
  notes?: string;
  addedAt: string;
  startedAt?: string;
  finishedAt?: string;
  tags?: string[];
}

export interface ReadingProgress {
  currentPage: number;
  totalPages: number;
  currentChapter?: number;
  totalChapters?: number;
  percentage: number;
  lastUpdated: string;
}

// ─── Reading Session ─────────────────────────────────────────────────────────

export interface ReadingSession {
  id: string;
  bookId: string;
  date: string;
  pagesRead: number;
  duration: number; // minutes
  notes?: string;
}

// ─── User ────────────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  clerkId: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  readingGoal?: ReadingGoal;
  stats: ReadingStats;
  preferences: UserPreferences;
  joinedAt: string;
}

export interface ReadingGoal {
  booksPerYear: number;
  pagesPerDay?: number;
  currentYear: number;
  booksCompleted: number;
}

export interface ReadingStats {
  totalBooksRead: number;
  totalPagesRead: number;
  totalReadingTime: number; // minutes
  currentStreak: number; // days
  longestStreak: number;
  averageRating: number;
  favoriteGenre?: string;
  booksThisYear: number;
  booksThisMonth: number;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  notifications: boolean;
  weeklyDigest: boolean;
  aiRecommendations: boolean;
}

// ─── Reading Map ─────────────────────────────────────────────────────────────

export interface MapNode {
  id: string;
  bookId: string;
  book: Book;
  x: number;
  y: number;
  connections: string[]; // bookIds
}

export interface MapConnection {
  id: string;
  sourceBookId: string;
  targetBookId: string;
  type: "sequel" | "similar_theme" | "same_author" | "recommended_after" | "inspired_by";
  strength: number; // 1-5
}

// ─── AI ──────────────────────────────────────────────────────────────────────

export interface AIRecommendation {
  id: string;
  book: Book;
  reason: string;
  confidence: number;
  basedOn: string[]; // bookIds
}

export interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface AskThisBookSession {
  id: string;
  bookId: string;
  messages: AIMessage[];
  createdAt: string;
}

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  activeIcon: string;
}
