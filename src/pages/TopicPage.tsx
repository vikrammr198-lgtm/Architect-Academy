import React, { useEffect, Suspense, lazy } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTopicById, getAdjacentTopics } from '../data/topics';
import { useStore } from '../store/useStore';
import { QuizCard } from '../components/topic/QuizCard';
import { InterviewAccordion } from '../components/topic/InterviewAccordion';
import { FormattedText } from '../components/common/FormattedText';

const Interactive3DViewer = lazy(() =>
  import('../components/visualization/Interactive3DViewer').then((m) => ({ default: m.Interactive3DViewer }))
);
import {
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Layers,
  Network,
  Check,
  X,
  HelpCircle,
  Building2,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  Sparkles,
} from 'lucide-react';

export const TopicPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();

  const {
    markTopicCompleted,
    unmarkTopicCompleted,
    toggleTopicBookmark,
    recordTopicVisit,
    isTopicCompleted,
    isTopicBookmarked,
    setCurrentModule,
  } = useStore();

  const topic = getTopicById(topicId || 'reverse-proxy');
  const { prevTopic, nextTopic } = getAdjacentTopics(topic.id);

  const completed = isTopicCompleted(topic.id);
  const bookmarked = isTopicBookmarked(topic.id);

  useEffect(() => {
    setCurrentModule(topic.module);
    recordTopicVisit(topic.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [topic.id, topic.module, setCurrentModule, recordTopicVisit]);

  const handleToggleComplete = () => {
    if (completed) {
      unmarkTopicCompleted(topic.id);
    } else {
      markTopicCompleted(topic.id);
    }
  };

  const moduleRoute = topic.module === 'system-design' ? '/system-design' : '/networking';

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
        <Link to="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
          Dashboard
        </Link>
        <span>/</span>
        <Link to={moduleRoute} className="capitalize hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
          {topic.module.replace('-', ' ')}
        </Link>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 line-clamp-1">{topic.category}</span>
      </nav>

      {/* Topic Header & Meta */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase border ${
                topic.module === 'system-design'
                  ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-500/30'
                  : 'bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-500/30'
              }`}
            >
              {topic.module === 'system-design' ? 'System Design' : 'Computer Networking'}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <Clock className="w-3.5 h-3.5" />
              {topic.readTime} Read
            </span>
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              {topic.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleTopicBookmark(topic.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                bookmarked
                  ? 'bg-cyan-50 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-300 dark:border-cyan-500/40 shadow-sm'
                  : 'bg-slate-50 dark:bg-dark-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
              <span>{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>

            <button
              type="button"
              onClick={handleToggleComplete}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                completed
                  ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40 shadow-sm'
                  : 'bg-slate-50 dark:bg-dark-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${completed ? 'text-emerald-500' : 'text-slate-400 dark:text-slate-500'}`} />
              <span>{completed ? 'Completed' : 'Mark as Complete'}</span>
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {topic.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          <FormattedText text={topic.summary} />
        </p>
      </div>

      {/* SECTION 1: Interactive 3D Visualization */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>1. Interactive 3D Architectural Simulation</span>
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
            Rotate 360° • Zoom • Step Control • Click Nodes
          </span>
        </div>

        <Suspense
          fallback={
            <div className="w-full h-[520px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-dark-950 flex flex-col items-center justify-center gap-3 text-cyan-400">
              <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-mono text-slate-400">Initializing Interactive 3D Engine...</span>
            </div>
          }
        >
          <Interactive3DViewer key={topic.id} topic={topic} />
        </Suspense>
      </section>

      {/* SECTION 2: Introduction */}
      <section className="p-6 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Compass className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>2. Introduction & Concept Definition</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <FormattedText text={topic.introduction.definition} />
        </p>

        <div className="p-4 rounded-xl bg-cyan-50/60 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800/50 space-y-2">
          <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-300 text-xs font-mono font-bold uppercase">
            <Lightbulb className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Real-World Intuition & Analogy</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
            "<FormattedText text={topic.introduction.analogousStory} />"
          </p>
          <div className="text-xs font-semibold text-cyan-800 dark:text-cyan-200 pt-1 border-t border-cyan-200/70 dark:border-cyan-900/60">
            Key Architectural Takeaway: <FormattedText text={topic.introduction.keyTakeaway} />
          </div>
        </div>
      </section>

      {/* SECTION 3: Why Is It Required? */}
      <section className="p-6 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>3. Why Is It Required? Problems Solved</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {topic.whyRequired.problemsSolved.map((prob, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
            >
              <span className="w-5 h-5 rounded-md bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                !
              </span>
              <FormattedText text={prob} />
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-dark-950/80 border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Production Impact
          </span>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <FormattedText text={topic.whyRequired.realWorldImpact} />
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {topic.whyRequired.metricsAffected.map((metric, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-xs rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80"
              >
                ✓ <FormattedText text={metric} />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Core Architecture */}
      <section className="p-6 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="w-4 h-4 text-violet-600 dark:text-violet-400" />
          <span>4. Core Architecture & Component Breakdown</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <FormattedText text={topic.coreArchitecture.description} />
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          {topic.coreArchitecture.components.map((comp, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  <FormattedText text={comp.name} />
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-transparent text-cyan-700 dark:text-cyan-400 shrink-0">
                  {comp.role}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <FormattedText text={comp.details} />
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: How It Works */}
      <section className="p-6 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Network className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>5. How It Works: Step-by-Step Execution</span>
        </h2>

        <div className="space-y-3">
          {topic.howItWorks.steps.map((st) => (
            <div
              key={st.stepNumber}
              className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800"
            >
              <span className="w-7 h-7 rounded-lg bg-cyan-50 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                {st.stepNumber}
              </span>
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                  <FormattedText text={st.action} />
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <FormattedText text={st.technicalDetail} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: Real-World Example */}
      <section className="p-6 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-amber-500" />
            <span>6. Real-World Case Study: {topic.realWorldExample.company}</span>
          </h2>
          {topic.realWorldExample.isConceptual && (
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
              Illustrative Reference Architecture
            </span>
          )}
        </div>

        <div className="p-5 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400">
              Engineering Scenario
            </span>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200">
              <FormattedText text={topic.realWorldExample.scenario} />
            </p>
          </div>

          <div className="space-y-1 border-t border-slate-200 dark:border-slate-800/80 pt-3">
            <span className="text-[11px] font-mono uppercase text-cyan-600 dark:text-cyan-400">
              Implementation Details
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <FormattedText text={topic.realWorldExample.implementation} />
            </p>
          </div>

          <div className="space-y-1 border-t border-slate-200 dark:border-slate-800/80 pt-3">
            <span className="text-[11px] font-mono uppercase text-emerald-600 dark:text-emerald-400">Scale Metrics</span>
            <p className="text-xs sm:text-sm font-mono text-emerald-700 dark:text-emerald-300">
              <FormattedText text={topic.realWorldExample.scaleDetails} />
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: Advantages & Disadvantages */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>7. Architectural Trade-offs & Comparisons</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 space-y-3">
            <h3 className="text-sm font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Key Advantages</span>
            </h3>
            <ul className="space-y-2">
              {topic.advantages.map((adv, idx) => (
                <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 shrink-0">✓</span>
                  <FormattedText text={adv} />
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-3">
            <h3 className="text-sm font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
              <X className="w-4 h-4" />
              <span>Limitations & Disadvantages</span>
            </h3>
            <ul className="space-y-2">
              {topic.disadvantages.map((dis, idx) => (
                <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <span className="text-rose-600 dark:text-rose-400 shrink-0">✕</span>
                  <FormattedText text={dis} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 8: Related Concepts */}
      {topic.relatedTopics && topic.relatedTopics.length > 0 && (
        <section className="p-6 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-sm font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
            8. Related Concepts
          </h2>
          <div className="flex flex-wrap gap-2">
            {topic.relatedTopics.map((rel) => (
              <Link
                key={rel.id}
                to={`/topic/${rel.id}`}
                className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-500/40 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors flex items-center gap-1.5"
              >
                <span>{rel.title}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 9: Interview Questions */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>9. High-Frequency Interview Questions & Answers</span>
        </h2>
        <InterviewAccordion key={`interview-${topic.id}`} questions={topic.interviewQuestions} />
      </section>

      {/* SECTION 10: Knowledge Check */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>10. Interactive Knowledge Check (5 Questions)</span>
        </h2>
        <QuizCard key={`quiz-${topic.id}`} topicId={topic.id} questions={topic.quiz} />
      </section>

      {/* SECTION 11 & 12: Mark as Complete & Navigation */}
      <div className="p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          {prevTopic ? (
            <Link
              to={`/topic/${prevTopic.id}`}
              className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <div className="text-left">
                <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-mono">Previous Topic</span>
                <span className="line-clamp-1">{prevTopic.title}</span>
              </div>
            </Link>
          ) : (
            <div className="text-xs text-slate-400 dark:text-slate-600">Start of Module</div>
          )}
        </div>

        <button
          type="button"
          onClick={handleToggleComplete}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
            completed
              ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40'
              : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{completed ? 'Topic Completed ✓' : 'Mark Topic as Completed'}</span>
        </button>

        <div>
          {nextTopic ? (
            <Link
              to={`/topic/${nextTopic.id}`}
              className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors"
            >
              <div className="text-right">
                <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-mono">Next Topic</span>
                <span className="line-clamp-1">{nextTopic.title}</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <div className="text-xs text-slate-400 dark:text-slate-600">End of Module</div>
          )}
        </div>
      </div>
    </div>
  );
};
