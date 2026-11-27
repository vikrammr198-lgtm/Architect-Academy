import React, { useState } from 'react';
import { QuizQuestion } from '../../types';
import { useStore } from '../../store/useStore';
import { FormattedText } from '../common/FormattedText';
import { CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';

interface QuizCardProps {
  topicId: string;
  questions: QuizQuestion[];
}

export const QuizCard: React.FC<QuizCardProps> = ({ topicId, questions }) => {
  const { recordQuizScore, markTopicCompleted, progress } = useStore();

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const existingScore = progress.quizScores[topicId];

  const handleSelect = (qIdx: number, optIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correct += 1;
      }
    });
    return correct;
  };

  const handleSubmit = () => {
    const score = calculateScore();
    setSubmitted(true);
    recordQuizScore(topicId, score, questions.length);
    if (score >= Math.ceil(questions.length * 0.8)) {
      markTopicCompleted(topicId);
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const score = calculateScore();
  const allAnswered = Object.keys(selectedAnswers).length === questions.length;

  return (
    <div className="space-y-6">
      {existingScore && !submitted && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
            <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>
              Previous Best: <strong>{existingScore.score} / {existingScore.total}</strong> ({Math.round((existingScore.score / existingScore.total) * 100)}%)
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">Recorded</span>
        </div>
      )}

      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const selected = selectedAnswers[qIdx];
          const isCorrect = selected === q.correctAnswer;

          return (
            <div
              key={q.id}
              className={`p-5 rounded-2xl border transition-all ${
                submitted
                  ? isCorrect
                    ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/80'
                    : 'bg-rose-50/70 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800/80'
                  : 'bg-white dark:bg-dark-900/90 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-dark-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 shrink-0">
                  {qIdx + 1}
                </span>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                  <FormattedText text={q.question} />
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-2 mt-4 ml-9">
                {q.options.map((opt, optIdx) => {
                  let optStyle =
                    'bg-slate-50 dark:bg-dark-950/70 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800/50';

                  if (submitted) {
                    if (optIdx === q.correctAnswer) {
                      optStyle =
                        'bg-emerald-100 dark:bg-emerald-900/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-medium';
                    } else if (selected === optIdx) {
                      optStyle =
                        'bg-rose-100 dark:bg-rose-900/40 border-rose-500 text-rose-900 dark:text-rose-200';
                    } else {
                      optStyle = 'opacity-50 border-transparent';
                    }
                  } else if (selected === optIdx) {
                    optStyle =
                      'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-500 dark:border-cyan-400 text-cyan-900 dark:text-cyan-200 shadow-sm';
                  }

                  return (
                    <button
                      type="button"
                      key={optIdx}
                      disabled={submitted}
                      onClick={() => handleSelect(qIdx, optIdx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${optStyle}`}
                    >
                      <FormattedText text={opt} />
                      {submitted && optIdx === q.correctAnswer && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 ml-2" />
                      )}
                      {submitted && selected === optIdx && optIdx !== q.correctAnswer && (
                        <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="mt-3 ml-9 p-3 rounded-xl bg-slate-100 dark:bg-dark-950/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-cyan-700 dark:text-cyan-400 block mb-0.5">Explanation:</span>
                  <FormattedText text={q.explanation} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-5 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        {submitted ? (
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-xl border ${
                score >= 4
                  ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30'
                  : 'bg-amber-50 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/30'
              }`}
            >
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-base font-bold text-slate-900 dark:text-white">
                You scored {score} out of {questions.length} ({Math.round((score / questions.length) * 100)}%)
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {score >= 4
                  ? 'Excellent work! You have mastered this concept.'
                  : 'Good attempt! Review the explanations above and try again.'}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Answer all {questions.length} questions to verify your technical knowledge and complete this topic.
          </div>
        )}

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {submitted ? (
            <button
              type="button"
              onClick={handleRetake}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors border border-slate-200 dark:border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
          ) : (
            <button
              type="button"
              disabled={!allAnswered}
              onClick={handleSubmit}
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                allAnswered
                  ? 'bg-cyan-600 hover:bg-cyan-500 text-white font-bold shadow-lg shadow-cyan-500/20 cursor-pointer'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
              }`}
            >
              Submit & Check Answers ({Object.keys(selectedAnswers).length}/{questions.length})
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
