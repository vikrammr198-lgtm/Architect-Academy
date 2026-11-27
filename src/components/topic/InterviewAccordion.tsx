import React, { useState } from 'react';
import { InterviewQuestion } from '../../types';
import { FormattedText } from '../common/FormattedText';
import { ChevronDown, ChevronUp, Sparkles, Check } from 'lucide-react';

interface InterviewAccordionProps {
  questions: InterviewQuestion[];
}

export const InterviewAccordion: React.FC<InterviewAccordionProps> = ({ questions }) => {
  const [filter, setFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [expandedIndices, setExpandedIndices] = useState<Record<number, boolean>>({ 0: true });

  const filtered = questions.filter((q) => filter === 'all' || q.level === filter);

  const toggleIndex = (idx: number) => {
    setExpandedIndices((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-slate-800 w-fit">
        {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
          <button
            type="button"
            key={lvl}
            onClick={() => setFilter(lvl)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
              filter === lvl
                ? 'bg-white dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/40 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {lvl}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((item, idx) => {
          const isExpanded = expandedIndices[idx] ?? false;

          let badgeColor = 'bg-cyan-50 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-500/30';
          if (item.level === 'intermediate') {
            badgeColor = 'bg-amber-50 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30';
          } else if (item.level === 'advanced') {
            badgeColor = 'bg-rose-50 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/30';
          }

          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900/90 overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggleIndex(idx)}
                className="w-full p-4 text-left flex items-start justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${badgeColor}`}>
                      {item.level}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                    <FormattedText text={item.question} />
                  </h4>
                </div>
                <div className="p-1 rounded-lg bg-slate-100 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 shrink-0 mt-1">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isExpanded && (
                <div className="p-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-dark-950/40 space-y-3">
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    <FormattedText text={item.answer} />
                  </p>

                  {item.keyPoints && item.keyPoints.length > 0 && (
                    <div className="p-3 rounded-xl bg-white dark:bg-dark-950 border border-slate-200 dark:border-slate-800/80 space-y-1.5">
                      <span className="text-[11px] font-mono uppercase font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        Key Takeaways to Mention to the Interviewer
                      </span>
                      <ul className="space-y-1">
                        {item.keyPoints.map((kp, kIdx) => (
                          <li key={kIdx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                            <FormattedText text={kp} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
