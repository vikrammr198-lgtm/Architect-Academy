import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import {
  Menu,
  Search,
  Moon,
  Sun,
  Layers,
  Network,
  Bookmark,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentModule,
    setCurrentModule,
    toggleSidebar,
    theme,
    toggleTheme,
    setSearchOpen,
    progress,
  } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const bookmarkedCount = progress.bookmarkedTopics.length;

  const handleSelectModule = (mod: 'system-design' | 'networking') => {
    setCurrentModule(mod);
    navigate(mod === 'system-design' ? '/system-design' : '/networking');
  };

  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-dark-950/85 backdrop-blur-xl px-4 lg:px-6 flex items-center justify-between transition-colors">
      {/* Left: Hamburger & Brand */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Toggle Navigation Sidebar"
          className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
          title="Toggle Navigation Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:scale-105 transition-transform">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>ARCHITECT</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-mono text-xs px-1.5 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950 border border-cyan-200 dark:border-cyan-800/50">
                PRO
              </span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 -mt-0.5 hidden sm:block">
              System Design & Networking
            </div>
          </div>
        </Link>
      </div>

      {/* Center: Module Switcher */}
      <div className="hidden md:flex items-center p-1 rounded-xl bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => handleSelectModule('system-design')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            currentModule === 'system-design' || location.pathname === '/system-design'
              ? 'bg-white dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/40 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span>System Design</span>
        </button>

        <button
          type="button"
          onClick={() => handleSelectModule('networking')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            currentModule === 'networking' || location.pathname === '/networking'
              ? 'bg-white dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-500/40 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Network className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
          <span>Computer Networking</span>
        </button>
      </div>

      {/* Right: Search, Bookmarks, Theme */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-dark-900/90 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-colors text-xs"
        >
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">Search topics, concepts...</span>
          <kbd className="hidden lg:inline-block px-1.5 py-0.5 rounded bg-white dark:bg-dark-950 border border-slate-200 dark:border-slate-800 font-mono text-[10px] text-slate-500">
            Ctrl+K
          </kbd>
        </button>

        <Link
          to="/bookmarks"
          className="relative p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
          title="Bookmarked Topics"
        >
          <Bookmark className="w-4 h-4" />
          {bookmarkedCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-500 ring-2 ring-white dark:ring-dark-950" />
          )}
        </Link>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle Light/Dark Theme"
          className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>
      </div>
    </header>
  );
};
