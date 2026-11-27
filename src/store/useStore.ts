import { create } from 'zustand';
import { ModuleType, UserProgress } from '../types';

interface AppStore {
  // Navigation & Theme
  currentModule: ModuleType;
  setCurrentModule: (mod: ModuleType) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;

  // Learning Progress
  progress: UserProgress;
  markTopicCompleted: (topicId: string) => void;
  unmarkTopicCompleted: (topicId: string) => void;
  toggleTopicBookmark: (topicId: string) => void;
  recordTopicVisit: (topicId: string) => void;
  recordQuizScore: (topicId: string, score: number, total: number) => void;
  isTopicCompleted: (topicId: string) => boolean;
  isTopicBookmarked: (topicId: string) => boolean;
  resetProgress: () => void;

  // 3D Visualizer active selected component
  selectedComponentId: string | null;
  setSelectedComponentId: (id: string | null) => void;
}

const STORAGE_KEY = 'architect_academy_progress_v2';

const applyThemeClass = (theme: 'dark' | 'light') => {
  if (typeof document !== 'undefined') {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }
};

const getInitialProgress = (): UserProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as UserProgress;
      applyThemeClass(parsed.theme || 'dark');
      return {
        completedTopics: parsed.completedTopics || [],
        bookmarkedTopics: parsed.bookmarkedTopics || [],
        recentTopics: parsed.recentTopics || ['reverse-proxy', 'osi-model', 'load-balancing-fundamentals', 'dns-resolution'],
        quizScores: parsed.quizScores || {},
        theme: parsed.theme || 'dark',
      };
    }
  } catch (e) {
    console.error('Failed to load progress from localStorage', e);
  }
  applyThemeClass('dark');
  return {
    completedTopics: [],
    bookmarkedTopics: [],
    recentTopics: ['reverse-proxy', 'osi-model', 'load-balancing-fundamentals', 'dns-resolution'],
    quizScores: {},
    theme: 'dark',
  };
};

const saveProgressToStorage = (progress: UserProgress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
};

const initialProgress = getInitialProgress();

export const useStore = create<AppStore>((set, get) => ({
  currentModule: 'system-design',
  setCurrentModule: (mod) => set({ currentModule: mod }),
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  theme: initialProgress.theme,
  toggleTheme: () => {
    const nextTheme: 'dark' | 'light' = get().theme === 'dark' ? 'light' : 'dark';
    applyThemeClass(nextTheme);
    const updated: UserProgress = { ...get().progress, theme: nextTheme };
    saveProgressToStorage(updated);
    set({ theme: nextTheme, progress: updated });
  },
  isSearchOpen: false,
  setSearchOpen: (open) => set({ isSearchOpen: open }),

  progress: initialProgress,

  markTopicCompleted: (topicId: string) => {
    set((state) => {
      if (state.progress.completedTopics.includes(topicId)) return state;
      const completedTopics = [...state.progress.completedTopics, topicId];
      const updated = { ...state.progress, completedTopics };
      saveProgressToStorage(updated);
      return { progress: updated };
    });
  },

  unmarkTopicCompleted: (topicId: string) => {
    set((state) => {
      const completedTopics = state.progress.completedTopics.filter((id) => id !== topicId);
      const updated = { ...state.progress, completedTopics };
      saveProgressToStorage(updated);
      return { progress: updated };
    });
  },

  toggleTopicBookmark: (topicId: string) => {
    set((state) => {
      const exists = state.progress.bookmarkedTopics.includes(topicId);
      const bookmarkedTopics = exists
        ? state.progress.bookmarkedTopics.filter((id) => id !== topicId)
        : [...state.progress.bookmarkedTopics, topicId];
      const updated = { ...state.progress, bookmarkedTopics };
      saveProgressToStorage(updated);
      return { progress: updated };
    });
  },

  recordTopicVisit: (topicId: string) => {
    set((state) => {
      const filtered = state.progress.recentTopics.filter((id) => id !== topicId);
      const recentTopics = [topicId, ...filtered].slice(0, 10);
      const updated = { ...state.progress, recentTopics };
      saveProgressToStorage(updated);
      return { progress: updated };
    });
  },

  recordQuizScore: (topicId: string, score: number, total: number) => {
    set((state) => {
      const quizScores = {
        ...state.progress.quizScores,
        [topicId]: { score, total, completedAt: new Date().toISOString() },
      };
      const updated = { ...state.progress, quizScores };
      saveProgressToStorage(updated);
      return { progress: updated };
    });
  },

  isTopicCompleted: (topicId: string) => {
    return get().progress.completedTopics.includes(topicId);
  },

  isTopicBookmarked: (topicId: string) => {
    return get().progress.bookmarkedTopics.includes(topicId);
  },

  resetProgress: () => {
    const fresh: UserProgress = {
      completedTopics: [],
      bookmarkedTopics: [],
      recentTopics: [],
      quizScores: {},
      theme: get().theme,
    };
    saveProgressToStorage(fresh);
    set({ progress: fresh });
  },

  selectedComponentId: null,
  setSelectedComponentId: (id) => set({ selectedComponentId: id }),
}));
