import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Compass,
  Eye,
  ZoomIn,
  ZoomOut,
  Tag,
} from 'lucide-react';

interface VisualizerToolbarProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onRestart: () => void;
  onPrevStep: () => void;
  onNextStep: () => void;
  canPrev: boolean;
  canNext: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  onChangeSpeed: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetCamera: () => void;
  showLabels: boolean;
  onToggleLabels: () => void;
  is2DView: boolean;
  onToggle2DView: () => void;
}

export const VisualizerToolbar: React.FC<VisualizerToolbarProps> = ({
  isPlaying,
  onTogglePlay,
  onRestart,
  onPrevStep,
  onNextStep,
  canPrev,
  canNext,
  currentStep,
  totalSteps,
  speed,
  onChangeSpeed,
  onZoomIn,
  onZoomOut,
  onResetCamera,
  showLabels,
  onToggleLabels,
  is2DView,
  onToggle2DView,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-dark-900/95 border border-slate-800/80 rounded-xl backdrop-blur-md shadow-lg">
      {/* Left: Playback & Step Controls */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onTogglePlay}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            isPlaying
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
              : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30'
          }`}
          title={isPlaying ? 'Pause Animation' : 'Play Request Flow'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span>{isPlaying ? 'Pause' : 'Play'}</span>
        </button>

        <button
          type="button"
          onClick={onRestart}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-colors border border-transparent hover:border-slate-700"
          title="Restart from Step 1"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-slate-800 mx-0.5" />

        <button
          type="button"
          onClick={onPrevStep}
          disabled={!canPrev}
          className={`p-1.5 rounded-lg transition-colors border border-transparent ${
            canPrev
              ? 'text-slate-300 hover:text-white hover:bg-slate-800/80 hover:border-slate-700'
              : 'text-slate-600 cursor-not-allowed'
          }`}
          title="Previous Step"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="text-xs font-mono px-2 py-1 rounded bg-dark-950/80 border border-slate-800 text-slate-300">
          <span className="text-cyan-400 font-bold">{currentStep}</span> / {totalSteps}
        </div>

        <button
          type="button"
          onClick={onNextStep}
          disabled={!canNext}
          className={`p-1.5 rounded-lg transition-colors border border-transparent ${
            canNext
              ? 'text-slate-300 hover:text-white hover:bg-slate-800/80 hover:border-slate-700'
              : 'text-slate-600 cursor-not-allowed'
          }`}
          title="Next Step"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onChangeSpeed}
          className="px-2 py-1 text-xs font-mono font-medium rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
          title="Cycle Speed (0.5x / 1x / 2x)"
        >
          {speed}x
        </button>
      </div>

      {/* Right: Zoom, Reset Camera, Labels & Mode Toggle */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {!is2DView && (
          <>
            <button
              type="button"
              onClick={onZoomIn}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
            </button>

            <button
              type="button"
              onClick={onZoomOut}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5 text-cyan-400" />
            </button>

            <button
              type="button"
              onClick={onResetCamera}
              className="flex items-center gap-1 px-2 py-1 text-xs rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
              title="Reset Camera Angle"
            >
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">Reset</span>
            </button>
          </>
        )}

        <button
          type="button"
          onClick={onToggleLabels}
          className={`flex items-center gap-1 px-2 py-1 text-xs rounded-lg transition-colors border ${
            showLabels
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
              : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:bg-slate-700'
          }`}
          title="Toggle 3D Node Labels"
        >
          <Tag className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Labels</span>
        </button>

        <button
          type="button"
          onClick={onToggle2DView}
          className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg transition-colors border ${
            is2DView
              ? 'bg-violet-500/20 text-violet-300 border-violet-500/40'
              : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
          }`}
          title="Toggle 2D Schematic / 3D Scene"
        >
          <Eye className="w-3.5 h-3.5 text-violet-400" />
          <span>{is2DView ? '2D Diagram' : '3D Scene'}</span>
        </button>
      </div>
    </div>
  );
};
