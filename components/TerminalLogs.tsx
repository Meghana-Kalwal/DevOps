
import React, { useState } from 'react';
import { BuildLog } from '../types';
import { analyzeBuildLogs } from '../services/geminiService';

interface TerminalLogsProps {
  logs: BuildLog[];
}

const TerminalLogs: React.FC<TerminalLogsProps> = ({ logs }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    const logText = logs.map(l => `[${l.level}] ${l.message}`).join('\n');
    const result = await analyzeBuildLogs(logText);
    setAiAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-xl flex flex-col h-[500px]">
      <div className="bg-slate-800 px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          </div>
          <span className="text-xs font-mono text-slate-400 ml-2">build-logs-v1.4.2.log</span>
        </div>
        <button 
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="text-xs bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-3 py-1 rounded flex items-center gap-2 transition-colors"
        >
          {isAnalyzing ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            <i className="fas fa-magic"></i>
          )}
          Analyze Failure with AI
        </button>
      </div>

      <div className="p-4 font-mono text-sm overflow-y-auto flex-1 bg-black/40">
        {logs.map((log, i) => (
          <div key={i} className="mb-1 flex gap-3">
            <span className="text-slate-600 shrink-0">[{log.timestamp}]</span>
            <span className={`shrink-0 font-bold ${
              log.level === 'ERROR' ? 'text-rose-500' : 
              log.level === 'WARN' ? 'text-amber-500' : 'text-emerald-500'
            }`}>
              {log.level}
            </span>
            <span className="text-slate-300 break-all">{log.message}</span>
          </div>
        ))}
        
        {aiAnalysis && (
          <div className="mt-6 border-t border-indigo-500/30 pt-4 bg-indigo-500/5 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-indigo-400 mb-2">
              <i className="fas fa-brain"></i>
              <span className="font-bold uppercase tracking-wider text-xs">AI Insight Engine</span>
            </div>
            <div className="prose prose-invert prose-sm max-w-none text-indigo-100 whitespace-pre-wrap">
              {aiAnalysis}
            </div>
            <button 
              onClick={() => setAiAnalysis(null)}
              className="mt-4 text-xs text-slate-500 hover:text-slate-300"
            >
              Clear Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TerminalLogs;
