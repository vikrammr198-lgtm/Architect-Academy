import React from 'react';
import { Component3DInfo } from '../../types';
import { X, Cpu, Server, Check, Layers, HardDrive } from 'lucide-react';

interface ComponentDetailModalProps {
  component: Component3DInfo | null;
  onClose: () => void;
}

export const ComponentDetailModal: React.FC<ComponentDetailModalProps> = ({ component, onClose }) => {
  if (!component) return null;

  return (
    <div className="absolute top-4 right-4 z-20 w-80 max-w-[calc(100vw-2rem)] bg-dark-900/95 border border-cyan-500/30 rounded-xl p-4 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-right duration-200">
      <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Server className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100 leading-tight">{component.name}</h4>
            <span className="text-[11px] font-mono text-cyan-400">{component.role}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">{component.description}</p>

      {/* Metrics */}
      {component.metrics && component.metrics.length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-800/80">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Live Telemetry</span>
          <div className="grid grid-cols-2 gap-2 mt-1.5">
            {component.metrics.map((m, idx) => (
              <div key={idx} className="bg-dark-950/80 p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">{m.label}</div>
                <div className="text-xs font-mono font-semibold text-slate-200 mt-0.5">{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technologies */}
      {component.technologies && component.technologies.length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-800/80">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Production Tech</span>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {component.technologies.map((t, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-slate-300 border border-slate-700/60"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
