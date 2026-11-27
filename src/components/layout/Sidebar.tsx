import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { systemDesignCategories, networkingCategories } from '../../data/categories';
import {
  LayoutDashboard,
  Layers,
  Network,
  BookOpen,
  Bookmark,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  X,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    isSidebarOpen,
    setSidebarOpen,
    currentModule,
    setCurrentModule,
    progress,
    isTopicCompleted,
  } = useStore();
  const navigate = useNavigate();

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'sd-fundamentals': true,
    'sd-load-balancing': true,
    'net-osi-model': true,
    'net-fundamentals': true,
  });

  const toggleCategory = (catId: string) => {
    setExpandedCategories((prev) => ({ ...prev, [catId]: !prev[catId] }));
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  // Keep mobile drawer closed automatically on narrow initial viewports or resize crossings
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarOpen]);

  const categories = currentModule === 'system-design' ? systemDesignCategories : networkingCategories;

  return (
    <>
      {/* Mobile backdrop */}
      {isSidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      {/* Collapsible Sidebar Drawer (works on both Mobile and Desktop!) */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-72 sm:w-80 bg-white dark:bg-dark-900 border-r border-slate-200 dark:border-slate-800/90 flex flex-col transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Navigation Quick Links (All 6 Primary Links) */}
        <div className="p-3 border-b border-slate-200 dark:border-slate-800/80 space-y-1.5">
          <div className="flex items-center justify-between lg:hidden pb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 px-1">Navigation</span>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <NavLink
            to="/"
            end
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                isActive
                  ? 'bg-cyan-50 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`
            }
          >
            <LayoutDashboard className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Dashboard</span>
          </NavLink>

          <div className="grid grid-cols-3 gap-1 pt-0.5">
            <NavLink
              to="/progress"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-[11px] transition-colors ${
                  isActive
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                }`
              }
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Progress</span>
            </NavLink>

            <NavLink
              to="/bookmarks"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-[11px] transition-colors ${
                  isActive
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                }`
              }
            >
              <Bookmark className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Saved</span>
            </NavLink>

            <NavLink
              to="/glossary"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-[11px] transition-colors ${
                  isActive
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                }`
              }
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Glossary</span>
            </NavLink>
          </div>
        </div>

        {/* Module Switcher Tabs inside Sidebar */}
        <div className="p-3 pb-1">
          <div className="flex rounded-xl bg-slate-100 dark:bg-dark-950 p-1 border border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => {
                setCurrentModule('system-design');
                navigate('/system-design');
              }}
              className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                currentModule === 'system-design'
                  ? 'bg-white dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>System Design</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentModule('networking');
                navigate('/networking');
              }}
              className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                currentModule === 'networking'
                  ? 'bg-white dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Network className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
              <span>Networking</span>
            </button>
          </div>
        </div>

        {/* Categories & Topics Accordion List */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
          {categories.map((category) => {
            const isExpanded = expandedCategories[category.id] ?? false;
            const completedInCat = category.topics.filter((t) => isTopicCompleted(t.id)).length;

            return (
              <div
                key={category.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-dark-950/60 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between p-2.5 text-left hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      {category.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-transparent shrink-0">
                    {completedInCat}/{category.topics.length}
                  </span>
                </button>

                {isExpanded && (
                  <div className="border-t border-slate-200 dark:border-slate-800/60 bg-white dark:bg-dark-900/40 p-1.5 space-y-0.5">
                    {category.topics.map((topic) => {
                      const completed = isTopicCompleted(topic.id);

                      return (
                        <NavLink
                          key={topic.id}
                          to={`/topic/${topic.id}`}
                          onClick={handleLinkClick}
                          className={({ isActive }) =>
                            `flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors group ${
                              isActive
                                ? 'bg-cyan-50 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-200 font-semibold border border-cyan-200 dark:border-cyan-500/30'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                            }`
                          }
                        >
                          <div className="flex items-center gap-2 min-w-0 pr-1">
                            <div
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                completed ? 'bg-emerald-500' : 'bg-slate-400 dark:bg-slate-600'
                              }`}
                            />
                            <span className="truncate">{topic.title}</span>
                          </div>
                          {completed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sidebar Footer Stats */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-dark-950/80 text-xs text-slate-600 dark:text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>{progress.completedTopics.length} Completed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5 text-cyan-500" />
            <span>{progress.bookmarkedTopics.length} Saved</span>
          </div>
        </div>
      </aside>
    </>
  );
};
