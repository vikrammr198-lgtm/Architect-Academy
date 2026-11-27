import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { systemDesignCategories, networkingCategories } from '../data/categories';
import { allTopics } from '../data/topics';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Layers,
  Network,
  RotateCcw,
} from 'lucide-react';

export const Progress: React.FC = () => {
  const { progress, resetProgress } = useStore();
  const navigate = useNavigate();

  const totalSdTopics = systemDesignCategories.reduce((acc, cat) => acc + cat.topics.length, 0);
  const totalNetTopics = networkingCategories.reduce((acc, cat) => acc + cat.topics.length, 0);

  const completedSd = progress.completedTopics.filter((id) => allTopics[id]?.module === 'system-design').length;
  const completedNet = progress.completedTopics.filter((id) => allTopics[id]?.module === 'networking').length;

  const sdPercent = totalSdTopics > 0 ? Math.round((completedSd / totalSdTopics) * 100) : 0;
  const netPercent = totalNetTopics > 0 ? Math.round((completedNet / totalNetTopics) * 100) : 0;

  const quizEntries = Object.entries(progress.quizScores);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <TrendingUp className="w-6 h-6 text-emerald-500" />
            <span>Learning Progress & Mastery</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Track completed topics, quiz performances, and overall curriculum milestones.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (window.confirm('Are you sure you want to reset your learning progress?')) {
              resetProgress();
            }
          }}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-300 dark:hover:border-rose-900 text-xs transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Progress</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">System Design Track</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {completedSd} of {totalSdTopics} Topics Completed
                </span>
              </div>
            </div>
            <span className="text-xl font-black font-mono text-cyan-600 dark:text-cyan-400">{sdPercent}%</span>
          </div>

          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${sdPercent}%` }}
            />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-500/30">
                <Network className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Computer Networking Track</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {completedNet} of {totalNetTopics} Topics Completed
                </span>
              </div>
            </div>
            <span className="text-xl font-black font-mono text-violet-600 dark:text-violet-400">{netPercent}%</span>
          </div>

          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-violet-500 to-pink-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${netPercent}%` }}
            />
          </div>
        </div>
      </div>

      <section className="p-6 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-500" />
          <span>Knowledge Check Assessment History ({quizEntries.length})</span>
        </h2>

        {quizEntries.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-dark-950 rounded-xl border border-slate-200 dark:border-slate-800">
            No quizzes completed yet. Complete a topic quiz to record your score here.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quizEntries.map(([tId, info]) => {
              const topic = allTopics[tId];
              if (!topic) return null;
              const percent = Math.round((info.score / info.total) * 100);

              return (
                <div
                  key={tId}
                  onClick={() => navigate(`/topic/${tId}`)}
                  className="cursor-pointer p-4 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors flex items-center justify-between group"
                >
                  <div className="min-w-0 pr-3">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 truncate">
                      {topic.title}
                    </h4>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{topic.category}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <div
                      className={`text-sm font-mono font-bold ${
                        percent >= 80 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {info.score} / {info.total}
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">{percent}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="p-6 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>Completed Topics ({progress.completedTopics.length})</span>
        </h2>

        {progress.completedTopics.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-dark-950 rounded-xl border border-slate-200 dark:border-slate-800">
            You haven't marked any topics as completed yet. Click "Mark as Complete" on any topic page when finished.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {progress.completedTopics.map((id) => {
              const topic = allTopics[id];
              if (!topic) return null;
              return (
                <Link
                  key={id}
                  to={`/topic/${id}`}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500/40 transition-colors flex items-center justify-between group"
                >
                  <div className="min-w-0 pr-2">
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 truncate">
                      {topic.title}
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{topic.readTime}</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
