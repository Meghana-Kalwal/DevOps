
import React from 'react';
import { SecurityVulnerability } from '../types';

interface SecuritySummaryProps {
  vulnerabilities: SecurityVulnerability[];
}

const SecuritySummary: React.FC<SecuritySummaryProps> = ({ vulnerabilities }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-rose-600 text-white';
      case 'HIGH': return 'bg-orange-500 text-white';
      case 'MEDIUM': return 'bg-amber-500 text-white';
      case 'LOW': return 'bg-emerald-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <i className="fas fa-shield-alt text-emerald-400"></i>
          Security Scan
        </h3>
        <span className="text-xs text-slate-400">Last run: 5 mins ago</span>
      </div>
      
      <div className="space-y-3">
        {vulnerabilities.map((v, i) => (
          <div key={i} className="flex items-start gap-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
            <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getSeverityColor(v.severity)}`}>
              {v.severity}
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-slate-200">{v.title}</h4>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-slate-500">{v.component}</span>
                <span className="text-xs text-indigo-400 font-mono">{v.cve}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-sm font-medium transition-colors border border-slate-700">
        View Full Security Report
      </button>
    </div>
  );
};

export default SecuritySummary;
