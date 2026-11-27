import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { systemDesignCategories, networkingCategories } from '../data/categories';
import { allTopics } from '../data/topics';
import {
  Layers,
  Network,
  Compass,
  CheckCircle2,
  TrendingUp,
  Clock,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { setCurrentModule, progress, isTopicCompleted } = useStore();
  const navigate = useNavigate();

  const totalSdTopics = systemDesignCategories.reduce((acc, cat) => acc + cat.topics.length, 0);
  const totalNetTopics = networkingCategories.reduce((acc, cat) => acc + cat.topics.length, 0);
  const totalAllTopics = totalSdTopics + totalNetTopics;

  const completedCount = progress.completedTopics.length;
  const bookmarkedCount = progress.bookmarkedTopics.length;
  const inProgressCount = progress.recentTopics.filter((id) => allTopics[id] && !progress.completedTopics.includes(id)).length;
  const overallPercentage = totalAllTopics > 0 ? Math.round((completedCount / totalAllTopics) * 100) : 0;

  const recentTopicObjs = progress.recentTopics
    .map((id) => allTopics[id])
    .filter(Boolean)
    .slice(0, 4);

  const continueTopicId = progress.recentTopics.find((id) => Boolean(allTopics[id])) || 'reverse-proxy';
  const continueTopic = allTopics[continueTopicId] || Object.values(allTopics)[0];

  const recommendedPath = [
    { id: 'what-is-system-design', title: 'What is System Design?', type: 'System Design' },
    { id: 'osi-model', title: 'The OSI 7-Layer Model', type: 'Computer Networking' },
    { id: 'reverse-proxy', title: 'Reverse Proxy (Nginx, TLS, Routing & Caching)', type: 'System Design' },
    { id: 'load-balancing-fundamentals', title: 'Load Balancing (Round Robin & Least Connections)', type: 'System Design' },
    { id: 'tcp-three-way-handshake', title: 'TCP Three-Way Handshake', type: 'Computer Networking' },
    { id: 'caching-fundamentals', title: 'Distributed Caching & Redis', type: 'System Design' },
    { id: 'dns-resolution', title: 'DNS Architecture & Query Resolution', type: 'Computer Networking' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* SECTION A: Welcome Hero */}
      <section className="relative overflow-hidden rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white via-slate-50 to-cyan-50/40 dark:from-dark-900 dark:via-dark-950 dark:to-dark-900 shadow-xl dark:shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Interactive Visual Engineering Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Master System Design & Computer Networking with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600 dark:from-cyan-400 dark:via-blue-400 dark:to-violet-400">
              Interactive 3D
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Stop memorizing dry definitions. Inspect live request flows, rotate 3D distributed architectures, interact with real components, and prepare for technical interviews—all in one place.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            {continueTopic && (
              <button
                type="button"
                onClick={() => navigate(`/topic/${continueTopic.id}`)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5"
              >
                <span>Continue Learning: {continueTopic.title.split('(')[0].trim()}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <Link
              to="/glossary"
              className="px-4 py-3 rounded-xl bg-white dark:bg-dark-900/90 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white font-medium text-sm transition-colors"
            >
              Explore Technical Glossary
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION B: Learning Categories (2 Prominent Cards) */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Compass className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>Core Engineering Disciplines</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: System Design */}
          <div
            onClick={() => {
              setCurrentModule('system-design');
              navigate('/system-design');
            }}
            className="cursor-pointer group relative overflow-hidden rounded-2xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900/90 hover:border-cyan-400 dark:hover:border-cyan-500/50 hover:shadow-xl transition-all duration-300 shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30 group-hover:scale-110 transition-transform">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-cyan-700 dark:text-cyan-300">
                  {totalSdTopics} Topics
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                  System Design
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Learn how scalable, reliable, distributed software systems are architected and implemented. Deep dives into Load Balancing, Reverse Proxies, Caching, Sharding, CAP Theorem, and Case Studies.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>Explore All 12 System Design Categories</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: Computer Networking */}
          <div
            onClick={() => {
              setCurrentModule('networking');
              navigate('/networking');
            }}
            className="cursor-pointer group relative overflow-hidden rounded-2xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900/90 hover:border-violet-400 dark:hover:border-violet-500/50 hover:shadow-xl transition-all duration-300 shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-violet-50 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-500/30 group-hover:scale-110 transition-transform">
                  <Network className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-violet-700 dark:text-violet-300">
                  {totalNetTopics} Topics
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                  Computer Networking
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Understand how computers, servers, and applications communicate across networks and the internet. Explore the 7-Layer OSI model, TCP 3-Way Handshake, DNS resolution, Routing, and Security.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-violet-600 dark:text-violet-400 group-hover:translate-x-1 transition-transform">
              <span>Explore All 11 Networking Categories</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: Learning Statistics */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Learning Statistics</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">Total Topics</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">{totalAllTopics}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Across 23 categories</div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">Completed</div>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{completedCount}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Verified understanding</div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">In Progress</div>
            <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{inProgressCount}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Currently studying</div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">Bookmarked</div>
            <div className="text-2xl font-black text-cyan-600 dark:text-cyan-400 mt-1">{bookmarkedCount}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Saved for review</div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 col-span-2 sm:col-span-1">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">Curriculum Mastered</div>
            <div className="text-2xl font-black text-violet-600 dark:text-violet-400 mt-1">{overallPercentage}%</div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-violet-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(overallPercentage, 2)}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D & E: Recommended Learning Path & Recently Explored */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <span>Recommended Learning Path</span>
          </h2>

          <div className="space-y-2.5">
            {recommendedPath.map((item, idx) => {
              const isCompleted = isTopicCompleted(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => navigate(`/topic/${item.id}`)}
                  className="cursor-pointer p-3.5 rounded-xl bg-white dark:bg-dark-900/90 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-500/40 hover:bg-slate-50 dark:hover:bg-dark-850 flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300">
                        {item.title}
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{item.type}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completed
                      </span>
                    ) : (
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recently Explored & Quick Access */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Recently Explored</span>
          </h2>

          {recentTopicObjs.length === 0 ? (
            <div className="p-6 rounded-xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
              No recently visited topics yet. Select any concept to begin.
            </div>
          ) : (
            <div className="space-y-2">
              {recentTopicObjs.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => navigate(`/topic/${topic.id}`)}
                  className="cursor-pointer p-3 rounded-xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all flex items-center justify-between group"
                >
                  <div className="min-w-0 pr-2">
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 truncate">
                      {topic.title}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      {topic.readTime} • {topic.difficulty}
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-500 shrink-0" />
                </div>
              ))}
            </div>
          )}

          <div className="p-4 rounded-xl bg-white dark:bg-dark-900/90 border border-slate-200 dark:border-slate-800 space-y-3 mt-4">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Essential Deep Dives
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'reverse-proxy', label: 'Reverse Proxy', color: 'cyan' },
                { id: 'osi-model', label: 'OSI 7 Layers', color: 'violet' },
                { id: 'load-balancing-fundamentals', label: 'Load Balancers', color: 'cyan' },
                { id: 'caching-fundamentals', label: 'Redis Caching', color: 'cyan' },
                { id: 'database-sharding', label: 'DB Sharding', color: 'cyan' },
                { id: 'consistent-hashing', label: 'Hash Ring', color: 'cyan' },
                { id: 'cap-theorem', label: 'CAP Theorem', color: 'cyan' },
                { id: 'circuit-breaker-pattern', label: 'Circuit Breaker', color: 'cyan' },
                { id: 'tcp-three-way-handshake', label: 'TCP Handshake', color: 'violet' },
                { id: 'dns-resolution', label: 'DNS Query', color: 'violet' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => navigate(`/topic/${btn.id}`)}
                  className={`px-2.5 py-1 text-xs rounded-lg bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 transition-colors ${
                    btn.color === 'cyan'
                      ? 'text-cyan-700 dark:text-cyan-300 hover:border-cyan-400'
                      : 'text-violet-700 dark:text-violet-300 hover:border-violet-400'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
