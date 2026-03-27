import React from 'react';
import clsx from 'clsx';

const StatCard = ({ title, value, unit, status }) => {
    const isCritical = status === 'Critical';

    return (
        <div className={clsx(
            "bg-navy-800 rounded-xl p-6 border transition-all duration-300 hover:scale-105",
            isCritical ? "border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-pulse" : "border-cyan-400/20 hover:border-cyan-400/50"
        )}>
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">{title}</h3>
                <span className={clsx(
                    "px-2 py-1 rounded text-xs font-bold uppercase",
                    isCritical ? "bg-red-500/20 text-red-500" : "bg-emerald-500/20 text-emerald-400"
                )}>
                    {status}
                </span>
            </div>
            <div className="flex items-baseline gap-2">
                <span className={clsx(
                    "text-5xl font-bold",
                    isCritical ? "text-red-500" : "text-white"
                )}>
                    {value}
                </span>
                <span className="text-cyan-400 font-mono text-lg">{unit}</span>
            </div>
        </div>
    );
};

export default StatCard;
