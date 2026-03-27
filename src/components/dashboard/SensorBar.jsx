import React from 'react';
import { Activity, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

const MetricTile = ({ label, value, unit, color, critical, icon: Icon }) => (
    <div className={clsx(
        'flex-1 flex flex-col items-center justify-center py-5 px-4 rounded-2xl border transition-all duration-700 relative overflow-hidden',
        critical
            ? 'border-red-500/70 bg-red-950/30 shadow-[0_0_30px_rgba(239,68,68,0.25)]'
            : 'border-white/10 bg-white/5'
    )}>
        {/* Background glow */}
        <div className={clsx(
            'absolute inset-0 opacity-0 transition-opacity duration-700 pointer-events-none',
            critical ? 'opacity-100' : ''
        )} style={{ background: `radial-gradient(ellipse at center, ${critical ? 'rgba(239,68,68,0.1)' : 'transparent'} 0%, transparent 70%)` }} />

        <div className="flex items-center gap-2 mb-1">
            {critical && <AlertTriangle size={14} className="text-red-400 animate-pulse" />}
            <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: critical ? '#f87171' : color }}>
                {label}
            </span>
        </div>

        <div className="flex items-end gap-1.5">
            <span className={clsx(
                'text-5xl font-black tracking-tight tabular-nums transition-colors duration-500',
                critical ? 'text-red-400' : 'text-white'
            )}>
                {value}
            </span>
            <span className="text-lg text-gray-400 mb-2 font-mono">{unit}</span>
        </div>

        <div className={clsx(
            'flex items-center gap-1.5 mt-1 text-[11px] font-bold uppercase tracking-widest',
            critical ? 'text-red-400' : 'text-gray-500'
        )}>
            <span className={clsx(
                'w-1.5 h-1.5 rounded-full',
                critical ? 'bg-red-500 animate-ping' : 'bg-emerald-500 animate-pulse'
            )} />
            {critical ? 'CRITICAL' : 'NOMINAL'}
        </div>
    </div>
);

const SensorBar = ({ data }) => {
    const doCritical = data.do > 0 && data.do < 3.5;

    return (
        <div className="flex gap-4">
            <MetricTile
                label="Dissolved Oxygen"
                value={data.do.toFixed(2)}
                unit="ppm"
                color="#22d3ee"
                critical={doCritical}
            />
            <MetricTile
                label="pH Level"
                value={data.ph.toFixed(2)}
                unit="pH"
                color="#a78bfa"
                critical={false}
            />
            <MetricTile
                label="Temperature"
                value={data.temp.toFixed(2)}
                unit="°C"
                color="#34d399"
                critical={false}
            />
        </div>
    );
};

export default SensorBar;
