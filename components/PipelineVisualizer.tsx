
import React from 'react';
import { PipelineStage, PipelineStatus } from '../types';

interface PipelineVisualizerProps {
  stages: PipelineStage[];
}

const PipelineVisualizer: React.FC<PipelineVisualizerProps> = ({ stages }) => {
  const getStatusIcon = (status: PipelineStatus) => {
    switch (status) {
      case PipelineStatus.SUCCESS:
        return <i className="fas fa-check-circle text-emerald-500"></i>;
      case PipelineStatus.FAILED:
        return <i className="fas fa-times-circle text-rose-500"></i>;
      case PipelineStatus.IN_PROGRESS:
        return <i className="fas fa-spinner fa-spin text-blue-500"></i>;
      case PipelineStatus.SKIPPED:
        return <i className="fas fa-forward text-slate-500"></i>;
      default:
        return <i className="far fa-circle text-slate-600"></i>;
    }
  };

  const getStatusColor = (status: PipelineStatus) => {
    switch (status) {
      case PipelineStatus.SUCCESS: return 'border-emerald-500/50 bg-emerald-500/10';
      case PipelineStatus.FAILED: return 'border-rose-500/50 bg-rose-500/10';
      case PipelineStatus.IN_PROGRESS: return 'border-blue-500/50 bg-blue-500/10';
      default: return 'border-slate-700 bg-slate-800/50';
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <i className="fas fa-rocket text-blue-400"></i>
        Deployment Pipeline
      </h3>
      <div className="flex flex-col gap-4">
        {stages.map((stage, index) => (
          <div key={stage.id} className="relative">
            {index < stages.length - 1 && (
              <div className="absolute left-4 top-10 w-0.5 h-6 bg-slate-700"></div>
            )}
            <div className={`flex items-center justify-between p-3 rounded-lg border ${getStatusColor(stage.status)} transition-all hover:scale-[1.01]`}>
              <div className="flex items-center gap-4">
                <div className="text-xl w-8 flex justify-center">
                  {getStatusIcon(stage.status)}
                </div>
                <div>
                  <p className="font-medium text-slate-200">{stage.name}</p>
                  <p className="text-xs text-slate-400">Started: {stage.startedAt !== '-' ? new Date(stage.startedAt).toLocaleTimeString() : 'N/A'}</p>
                </div>
              </div>
              <div className="text-sm font-mono text-slate-400">
                {stage.duration}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipelineVisualizer;
