import React from 'react';
import { LucideIcon, ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface KpiCardProps {
  label: string;
  value: string | number;
  unit?: string;
  changeText: string;
  changeType: 'positive' | 'negative' | 'neutral'; // positive usually means improvement (e.g., lower energy is positive)
  comparisonLabel?: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  sparklineData?: number[];
  onClick?: () => void;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  unit,
  changeText,
  changeType,
  comparisonLabel = 'vs last month',
  icon: Icon,
  iconColor,
  iconBg,
  sparklineData = [35, 42, 38, 48, 52, 45, 58],
  onClick,
}) => {
  // SVG sparkline path calculation
  const minVal = Math.min(...sparklineData);
  const maxVal = Math.max(...sparklineData);
  const range = maxVal - minVal || 1;
  const width = 80;
  const height = 28;

  const points = sparklineData
    .map((val, idx) => {
      const x = (idx / (sparklineData.length - 1)) * width;
      const y = height - ((val - minVal) / range) * (height - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const isGreen = changeType === 'positive';
  const isRed = changeType === 'negative';

  const strokeColor = isGreen ? '#10B981' : isRed ? '#F43F5E' : '#0EA5E9';
  const fillColor = isGreen ? 'rgba(16, 185, 129, 0.15)' : isRed ? 'rgba(244, 63, 94, 0.15)' : 'rgba(14, 165, 233, 0.15)';
  const gradId = `spark-grad-${label.replace(/\s+/g, '-').toLowerCase()}`;

  // Create closed polygon for area fill
  const areaPoints = `${points} ${width},${height} 0,${height}`;

  return (
    <div
      onClick={onClick}
      className={`glow-card bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 shadow-xs transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-emerald-500/50' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {label}
          </span>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl lg:text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight tabular-nums">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </span>
            {unit && (
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {unit}
              </span>
            )}
          </div>
        </div>

        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-xs ring-1 ring-black/5 dark:ring-white/10 ${iconBg}`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs">
          <span
            className={`inline-flex items-center font-bold tabular-nums ${
              isGreen
                ? 'text-emerald-600 dark:text-emerald-400'
                : isRed
                ? 'text-rose-600 dark:text-rose-400'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {isGreen ? (
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
            ) : isRed ? (
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            ) : null}
            {changeText}
          </span>
          <span className="text-slate-500 dark:text-slate-400 text-[11px] font-medium">
            {comparisonLabel}
          </span>
        </div>

        {/* Mini SVG Sparkline with Gradient Area */}
        <div className="w-20 h-7">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
                <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <polygon fill={`url(#${gradId})`} points={areaPoints} />
            <polyline
              fill="none"
              stroke={strokeColor}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
