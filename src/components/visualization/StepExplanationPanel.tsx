import React from 'react';
import { AnimationStep } from '../../types';
import { FormattedText } from '../common/FormattedText';
import { Activity, ArrowRight } from 'lucide-react';

interface StepExplanationPanelProps {
  step: AnimationStep;
  currentStepIndex: number;
  totalSteps: number;
  onSelectStep: (idx: number) => void;
}

export const StepExplanationPanel: React.FC<StepExplanationPanelProps> = ({
  step,
  currentStepIndex,
  totalSteps,
  onSelectStep,
}) => {
  return (
    <div className="bg-dark-900/95 border border-slate-800 rounded-xl p-4 shadow-xl backdrop-blur-md">
      {/* Progress track */}
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: totalSteps }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onSelectStep(idx)}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              idx === currentStepIndex
                ? 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]'
                : idx < currentStepIndex
                ? 'bg-cyan-700'
                : 'bg-slate-800'
            }`}
            title={`Jump to Step ${idx + 1}`}
          />
        ))}
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[11px] font-mono font-bold uppercase rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Step {step.step} of {totalSteps}
            </span>
            <h4 className="text-base font-semibold text-slate-100">{step.title}</h4>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            <FormattedText text={step.description} />
          </p>
        </div>

        {/* Live Packet Information Pill */}
        {step.packet && (
          <div className="shrink-0 flex items-center gap-2.5 px-3 py-2 rounded-lg bg-dark-950 border border-slate-800 font-mono text-xs">
            <div className="flex items-center gap-1.5 text-cyan-400">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>{step.packet.from}</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            <div className="text-emerald-400">{step.packet.to}</div>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300">
              {step.packet.label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
