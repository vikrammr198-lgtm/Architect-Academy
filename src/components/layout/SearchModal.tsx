import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { allTopics } from '../../data/topics';
import { glossaryTerms } from '../../data/glossary';
import { Search, X, ArrowRight, BookOpen, Layers, Network } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedTopics = Object.values(allTopics)
    .filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.introduction.definition.toLowerCase().includes(q)
    )
    .slice(0, 8);

  const matchedGlossary = glossaryTerms
    .filter((g) => g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q))
    .slice(0, 4);

  const handleSelectTopic = (id: string) => {
    setSearchOpen(false);
    setQuery('');
    navigate(`/topic/${id}`);
  };

  const handleSelectGlossary = (term: typeof glossaryTerms[0]) => {
    setSearchOpen(false);
    setQuery('');
    if (term.relatedTopicId) {
      navigate(`/topic/${term.relatedTopicId}`);
    } else {
      navigate('/glossary');
    }
  };

  return (
    <div
      onClick={() => setSearchOpen(false)}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-cyan-500 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all System Design & Networking topics, categories, protocols..."
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2 mb-1.5">
              Curriculum Topics ({matchedTopics.length})
            </div>
            {matchedTopics.length === 0 ? (
              <div className="text-xs text-slate-500 px-2 py-2">No matching topics found.</div>
            ) : (
              <div className="space-y-1">
                {matchedTopics.map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => handleSelectTopic(topic.id)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 text-left transition-colors group border border-transparent hover:border-slate-200 dark:hover:border-slate-700/60"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 text-cyan-600 dark:text-cyan-400">
                        {topic.module === 'system-design' ? (
                          <Layers className="w-4 h-4" />
                        ) : (
                          <Network className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300">
                          {topic.title}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">
                          {topic.category} • {topic.readTime}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {matchedGlossary.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800/80 pt-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2 mb-1.5">
                Technical Glossary ({matchedGlossary.length})
              </div>
              <div className="space-y-1">
                {matchedGlossary.map((term, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectGlossary(term)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 text-left transition-colors group border border-transparent hover:border-slate-200 dark:hover:border-slate-700/60"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 text-amber-500">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-300">
                          {term.term}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                          {term.definition}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400">View</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-dark-950/80 text-[11px] font-mono text-slate-500 flex items-center justify-between">
          <span>Click any result to jump straight to topic</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
