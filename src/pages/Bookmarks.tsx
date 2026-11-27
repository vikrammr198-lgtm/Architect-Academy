import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { allTopics } from '../data/topics';
import { Bookmark, ArrowRight, Trash2, Clock } from 'lucide-react';

export const Bookmarks: React.FC = () => {
  const { progress, toggleTopicBookmark } = useStore();

  const bookmarkedTopicObjs = progress.bookmarkedTopics.map((id) => allTopics[id]).filter(Boolean);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Bookmark className="w-6 h-6 text-cyan-500 fill-current" />
            <span>Saved Bookmarks</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Reference concepts you have saved for upcoming interviews or review sessions.
          </p>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-cyan-700 dark:text-cyan-300">
          {bookmarkedTopicObjs.length} Saved
        </span>
      </div>

      {bookmarkedTopicObjs.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <Bookmark className="w-10 h-10 text-slate-400 dark:text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No bookmarked topics yet</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Click the "Bookmark" button in the header of any topic learning page to keep it handy for quick review.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 text-white font-bold text-xs hover:bg-cyan-500 transition-colors mt-2"
          >
            <span>Explore Topics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookmarkedTopicObjs.map((topic) => (
            <div
              key={topic.id}
              className="p-5 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold uppercase border ${
                      topic.module === 'system-design'
                        ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-500/30'
                        : 'bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-500/30'
                    }`}
                  >
                    {topic.module === 'system-design' ? 'System Design' : 'Networking'}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleTopicBookmark(topic.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <Link to={`/topic/${topic.id}`} className="block">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors leading-snug">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {topic.summary}
                  </p>
                </Link>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{topic.readTime}</span>
                </div>

                <Link
                  to={`/topic/${topic.id}`}
                  className="font-semibold text-cyan-600 dark:text-cyan-400 flex items-center gap-1 hover:translate-x-1 transition-transform"
                >
                  <span>Open Topic</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
