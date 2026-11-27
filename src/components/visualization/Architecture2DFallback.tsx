import React from 'react';
import { AnimationStep, TopicContent } from '../../types';
import { ArrowRight, Activity } from 'lucide-react';

interface Architecture2DFallbackProps {
  topic: TopicContent;
  step: AnimationStep;
  onSelectComponent: (id: string) => void;
  selectedComponentId: string | null;
  showLabels: boolean;
}

export const Architecture2DFallback: React.FC<Architecture2DFallbackProps> = ({
  topic,
  step,
  onSelectComponent,
  selectedComponentId,
  showLabels,
}) => {
  const nodes =
    topic.interactiveComponents.length > 0
      ? topic.interactiveComponents
      : topic.coreArchitecture.components.map((c, idx) => ({
          id: `comp-${idx}`,
          name: c.name,
          role: c.role,
          description: c.details,
        }));

  return (
    <div className="w-full h-full min-h-[420px] bg-dark-950 flex flex-col items-center justify-center p-6 select-none relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#161e2e_1px,transparent_1px),linear-gradient(to_bottom,#161e2e_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-6 my-auto">
        <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
          2D Architecture Schematic — {topic.title.split('(')[0].trim()}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 w-full">
          {nodes.map((node, idx) => {
            const isActive =
              selectedComponentId === node.id ||
              step.activeNodes.includes(node.id) ||
              step.activeNodes.some((an) => node.id.includes(an) || an.includes(node.id));

            return (
              <React.Fragment key={node.id}>
                <button
                  type="button"
                  onClick={() => onSelectComponent(node.id)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all text-left w-44 sm:w-48 ${
                    isActive
                      ? 'bg-cyan-950/80 border-cyan-400 shadow-[0_0_22px_rgba(6,182,212,0.35)] scale-105'
                      : 'bg-dark-900 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isActive ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'
                      }`}
                    />
                    <span className="text-[10px] font-mono text-slate-400">#{idx + 1}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-100 leading-snug">{node.name}</div>
                  {showLabels && <div className="text-[10px] text-cyan-300 font-mono mt-1 truncate">{node.role}</div>}
                </button>

                {idx < nodes.length - 1 && (
                  <div className="hidden sm:flex items-center text-slate-600">
                    <ArrowRight className={`w-5 h-5 ${isActive ? 'text-cyan-400 animate-pulse' : ''}`} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {step.packet && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-900 border border-slate-700 font-mono text-xs text-emerald-300">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>
              Active Flow: <strong>{step.packet.from}</strong> → <strong>{step.packet.to}</strong> [{step.packet.label}]
            </span>
          </div>
        )}
      </div>

      <div className="absolute bottom-3 text-center text-xs text-slate-400">
        Click any node block to inspect role, real-time metrics, and technologies.
      </div>
    </div>
  );
};
