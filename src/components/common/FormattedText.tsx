import React from 'react';

interface FormattedTextProps {
  text: string;
  className?: string;
}

/**
 * Renders inline markdown tokens (`code` and **bold**) cleanly without exposing raw backticks/asterisks.
 */
export const FormattedText: React.FC<FormattedTextProps> = ({ text, className = '' }) => {
  if (!text) return null;

  // Split by `code` or **bold** tokens
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
          return (
            <code
              key={i}
              className="px-1.5 py-0.5 mx-0.5 rounded bg-slate-100 dark:bg-slate-800/90 text-cyan-700 dark:text-cyan-300 font-mono text-[0.88em] border border-slate-200 dark:border-slate-700/70"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
          return (
            <strong key={i} className="font-semibold text-slate-900 dark:text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </span>
  );
};
