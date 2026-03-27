import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale,
    PointElement, LineElement, Tooltip, Filler, Legend,
} from 'chart.js';
import { AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend);

const SingleChart = ({ title, labels, data, color, unit, yMin, yMax, dangerBelow }) => {
    const lastVal = data.length > 0 ? data[data.length - 1] : null;
    const isDanger = dangerBelow != null && lastVal !== null && lastVal < dangerBelow;
    const activeColor = isDanger ? '#f87171' : color;

    const chartData = {
        labels,
        datasets: [{
            fill: true,
            data,
            borderColor: activeColor,
            backgroundColor: (ctx) => {
                const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 220);
                gradient.addColorStop(0, activeColor + '38');
                gradient.addColorStop(1, activeColor + '00');
                return gradient;
            },
            borderWidth: 2.5,
            tension: 0.4,
            pointRadius: data.length > 1 ? 3 : 0,
            pointHoverRadius: 6,
            pointBackgroundColor: activeColor,
            pointBorderColor: '#0a1628',
            pointBorderWidth: 2,
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 400, easing: 'easeInOutQuart' },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#050e1a',
                titleColor: activeColor,
                bodyColor: '#e2e8f0',
                borderColor: activeColor + '80',
                borderWidth: 1,
                padding: 10,
                callbacks: { label: (ctx) => ` ${ctx.parsed.y.toFixed(2)} ${unit}` },
            },
        },
        scales: {
            y: {
                min: yMin, max: yMax,
                grid: { color: 'rgba(255,255,255,0.04)' },
                ticks: {
                    color: 'rgba(255,255,255,0.3)',
                    font: { size: 9, family: 'monospace' },
                    maxTicksLimit: 5,
                    callback: (v) => `${v}${unit === '°C' ? '°' : ''}`,
                },
            },
            x: {
                grid: { display: false },
                ticks: {
                    color: 'rgba(255,255,255,0.3)',
                    font: { size: 8, family: 'monospace' },
                    maxRotation: 0,
                    maxTicksLimit: 5,
                },
            },
        },
    };

    return (
        <div className={clsx(
            'flex-1 flex flex-col bg-white/[0.03] rounded-2xl border overflow-hidden transition-all duration-700',
            isDanger ? 'border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.15)]' : 'border-white/8'
        )}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-4 pb-2 shrink-0">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: activeColor }} />
                    <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: activeColor }}>
                        {title}
                    </span>
                    {isDanger && (
                        <span className="flex items-center gap-1 text-[10px] text-red-400 font-bold animate-pulse">
                            <AlertTriangle size={10} /> CRITICAL
                        </span>
                    )}
                </div>
                <span className="font-mono text-lg font-bold text-white tabular-nums">
                    {lastVal !== null ? lastVal.toFixed(2) : '—'}
                    <span className="text-xs text-gray-500 ml-1">{unit}</span>
                </span>
            </div>

            {/* Chart */}
            <div className="flex-1 px-3 pb-3 min-h-0">
                {data.length >= 2
                    ? <Line options={options} data={chartData} />
                    : (
                        <div className="h-full flex items-center justify-center">
                            <p className="text-gray-600 text-[11px] font-mono tracking-widest uppercase animate-pulse">
                                {data.length === 0 ? 'Waiting for stream…' : 'Collecting…'}
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

const LiveCharts = ({ history }) => {
    const labels = history.map(d => d.time);
    const doData   = history.map(d => d.do);
    const phData   = history.map(d => d.ph);
    const tempData = history.map(d => d.temp);

    return (
        <div className="flex gap-4 h-full">
            <SingleChart title="Dissolved Oxygen" labels={labels} data={doData}   color="#22d3ee" unit="ppm" yMin={0}  yMax={12} dangerBelow={3.5} />
            <SingleChart title="pH Level"          labels={labels} data={phData}   color="#a78bfa" unit="pH"  yMin={5}  yMax={9}  dangerBelow={null} />
            <SingleChart title="Temperature"       labels={labels} data={tempData} color="#34d399" unit="°C"  yMin={15} yMax={35} dangerBelow={null} />
        </div>
    );
};

export default LiveCharts;
