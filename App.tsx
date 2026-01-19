
import React, { useState } from 'react';
import PipelineVisualizer from './components/PipelineVisualizer';
import TerminalLogs from './components/TerminalLogs';
import SecuritySummary from './components/SecuritySummary';
import MetricCard from './components/MetricCard';
import { MOCK_PIPELINE, MOCK_LOGS, MOCK_VULNERABILITIES, MOCK_QUALITY } from './constants';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const App: React.FC = () => {
  const [pipeline] = useState(MOCK_PIPELINE);
  const [logs] = useState(MOCK_LOGS);
  const [vulnerabilities] = useState(MOCK_VULNERABILITIES);
  const [quality] = useState(MOCK_QUALITY);

  const chartData = [
    { name: 'Quality', value: quality.score },
    { name: 'Remaining', value: 100 - quality.score },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <i className="fas fa-layer-group text-xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">InsightEngine <span className="text-indigo-500">v2.0</span></h1>
            <p className="text-xs text-slate-400">Project: micro-services-gateway / Branch: <span className="text-slate-200">main</span></p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Build Identifier</span>
            <span className="text-sm font-mono text-indigo-400">#BUILD-99423</span>
          </div>
          <button className="bg-slate-800 hover:bg-slate-700 p-2 rounded-full h-10 w-10 flex items-center justify-center transition-colors">
            <i className="fas fa-bell"></i>
          </button>
          <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center overflow-hidden">
             <img src="https://picsum.photos/40/40" alt="Avatar" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Metrics & Pipeline */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6">
            <MetricCard 
              label="Bugs Found" 
              value={quality.bugs} 
              subValue="+2 since yesterday" 
              icon="fas fa-bug" 
              color="bg-rose-500" 
            />
            <MetricCard 
              label="Code Coverage" 
              value={`${quality.coverage}%`} 
              subValue="Target: 80%" 
              icon="fas fa-percentage" 
              color="bg-emerald-500" 
            />
          </div>

          <PipelineVisualizer stages={pipeline} />

          {/* Quality Score Gauge Card */}
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl">
             <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <i className="fas fa-chart-line text-indigo-400"></i>
                Maintainability Index
              </h3>
              <div className="h-48 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="100%"
                      startAngle={180}
                      endAngle={0}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={0}
                      dataKey="value"
                    >
                      <Cell fill="#6366f1" />
                      <Cell fill="#1e293b" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-4">
                  <span className="text-4xl font-bold">{quality.score}</span>
                  <span className="text-xs text-slate-500 uppercase">Score</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center">
                  <p className="text-xs text-slate-500 mb-1 uppercase">Code Smells</p>
                  <p className="text-lg font-semibold text-amber-500">{quality.codeSmells}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-500 mb-1 uppercase">Duplications</p>
                  <p className="text-lg font-semibold text-indigo-400">{quality.duplications}%</p>
                </div>
              </div>
          </div>
        </div>

        {/* Center/Right Column: Logs & Security */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Build Diagnostics</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-medium transition-all flex items-center gap-2">
                <i className="fas fa-stop"></i> Abort Build
              </button>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-all flex items-center gap-2">
                <i className="fas fa-redo"></i> Restart Build
              </button>
            </div>
          </div>

          <TerminalLogs logs={logs} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SecuritySummary vulnerabilities={vulnerabilities} />
            
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <i className="fas fa-history text-slate-400"></i>
                Build History
              </h3>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-800 hover:bg-slate-800/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                        <i className="fas fa-check"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Build #99422</p>
                        <p className="text-[10px] text-slate-500 uppercase">2 hours ago</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-400">4m 12s</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                View All History →
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer / Status Bar */}
      <footer className="bg-indigo-600 text-white px-6 py-1.5 flex items-center justify-between text-[11px] font-medium tracking-wide">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            CONNECTED: PRODUCTION-NODE-01
          </div>
          <div className="flex items-center gap-2">
            LATENCY: 14ms
          </div>
          <div className="flex items-center gap-2">
            UPTIME: 99.998%
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span>v2.0.4-LTS</span>
          <span className="font-mono">IP: 192.168.1.104</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
