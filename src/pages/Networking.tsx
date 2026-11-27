import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { networkingCategories } from '../data/categories';
import { useStore } from '../store/useStore';
import { Network, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export const Networking: React.FC = () => {
  const { setCurrentModule, isTopicCompleted } = useStore();

  useEffect(() => {
    setCurrentModule('networking');
  }, [setCurrentModule]);

  const totalTopics = networkingCategories.reduce((acc, c) => acc + c.topics.length, 0);
  const completedCount = networkingCategories.reduce(
    (acc, c) => acc + c.topics.filter((t) => isTopicCompleted(t.id)).length,
    0
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/30 text-violet-700 dark:text-violet-300 text-xs font-mono">
            <Network className="w-3.5 h-3.5" />
            <span>11 Categories • {totalTopics} Interactive Topics</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Computer Networking
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Explore how packets traverse the internet: from physical cables, network topologies, and the 7-layer OSI model to TCP handshakes, DNS resolution, routing, TLS cryptography, and CLI diagnostics.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 shrink-0 text-center">
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400">Module Mastery</div>
          <div className="text-2xl font-black text-violet-600 dark:text-violet-400 mt-1">
            {completedCount} / {totalTopics}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {networkingCategories.map((cat) => {
          const catDone = cat.topics.filter((t) => isTopicCompleted(t.id)).length;
          return (
            <div
              key={cat.id}
              className="p-5 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">{cat.title}</h2>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-violet-700 dark:text-violet-300">
                    {catDone}/{cat.topics.length}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{cat.description}</p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                {cat.topics.map((topic) => {
                  const done = isTopicCompleted(topic.id);
                  return (
                    <Link
                      key={topic.id}
                      to={`/topic/${topic.id}`}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-dark-950/60 hover:bg-violet-50 dark:hover:bg-violet-500/10 border border-slate-200/70 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-500/40 transition-all group"
                    >
                      <div className="flex items-center gap-2 min-w-0 pr-2">
                        {done ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-violet-500/60 shrink-0 ml-1 mr-1" />
                        )}
                        <span className="text-xs font-medium text-slate-800 dark:text-slate-200 group-hover:text-violet-700 dark:group-hover:text-violet-300 truncate">
                          {topic.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {topic.readTime}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-500 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
