import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { glossaryTerms } from '../data/glossary';
import { BookOpen, Search, Lightbulb, ExternalLink } from 'lucide-react';

export const Glossary: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');

  const alphabet = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  const filteredTerms = glossaryTerms.filter((item) => {
    const matchesQuery =
      item.term.toLowerCase().includes(query.toLowerCase()) ||
      item.definition.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase());

    if (!matchesQuery) return false;
    if (selectedLetter === 'ALL') return true;
    return item.term.toUpperCase().startsWith(selectedLetter);
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-amber-500" />
            <span>Technical Glossary & Lexicon</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Clear definitions, intuitive everyday analogies, and direct curriculum links for essential engineering terminology.
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search glossary terms (e.g., Reverse Proxy, CAP Theorem, Latency, NAT)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex flex-wrap gap-1 pt-1">
          {alphabet.map((letter) => (
            <button
              key={letter}
              type="button"
              onClick={() => setSelectedLetter(letter)}
              className={`px-2 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                selectedLetter === letter
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-100 dark:bg-dark-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {filteredTerms.length === 0 ? (
        <div className="p-10 text-center rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-500">
          No glossary terms match "{query}" {selectedLetter !== 'ALL' ? `starting with "${selectedLetter}"` : ''}.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTerms.map((term, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">{term.term}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 text-cyan-700 dark:text-cyan-400 shrink-0">
                    {term.category}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{term.definition}</p>

                <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-dark-950 border border-amber-200/60 dark:border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-700 dark:text-amber-400 font-bold">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Plain English Analogy</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 italic">"{term.simpleExplanation}"</p>
                </div>
              </div>

              {term.relatedTopicId && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <Link
                    to={`/topic/${term.relatedTopicId}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500"
                  >
                    <span>Explore Deep Dive: {term.relatedTopicTitle}</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
