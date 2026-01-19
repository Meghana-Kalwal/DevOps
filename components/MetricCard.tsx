
import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: string;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, subValue, icon, color }) => {
  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl flex items-center gap-5">
      <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center text-xl text-white`}>
        <i className={icon}></i>
      </div>
      <div>
        <p className="text-sm text-slate-400 font-medium">{label}</p>
        <div className="flex items-baseline gap-2">
          <h4 className="text-2xl font-bold text-slate-100">{value}</h4>
          {subValue && <span className="text-xs text-slate-500">{subValue}</span>}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
