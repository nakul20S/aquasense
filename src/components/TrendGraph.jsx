import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

// --- Individual Chart Card ---
const ChartCard = ({ title, labels, dataPoints, color, unit, yMin, yMax, dangerZone }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 400, easing: 'easeInOutQuart' },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#000d1a',
                titleColor: color,
                bodyColor: '#e0f7ff',
                borderColor: color,
                borderWidth: 1,
                callbacks: {
                    label: (ctx) => ` ${ctx.parsed.y.toFixed(2)} ${unit}`,
                },
            },
        },
        scales: {
            y: {
                min: yMin,
                max: yMax,
                grid: { color: 'rgba(255,255,255,0.05)' },
                ticks: {
                    color: 'rgba(255,255,255,0.4)',
                    font: { size: 10, family: 'monospace' },
                    callback: (val) => `${val} ${unit}`,
                },
            },
            x: {
                grid: { display: false },
                ticks: {
                    color: 'rgba(255,255,255,0.4)',
                    font: { size: 9, family: 'monospace' },
                    maxRotation: 0,
                    maxTicksLimit: 6,
                },
            },
        },
        elements: {
            line: { tension: 0.4, borderWidth: 2.5 },
            point: {
                radius: 3,
                hoverRadius: 6,
                backgroundColor: color,
                borderColor: '#0a1628',
                borderWidth: 2,
            },
        },
    };

    const lastVal = dataPoints.length > 0 ? dataPoints[dataPoints.length - 1] : null;
    const isDanger = dangerZone && lastVal !== null && lastVal < dangerZone;

    const chartData = {
        labels,
        datasets: [
            {
                fill: true,
                label: title,
                data: dataPoints,
                borderColor: isDanger ? '#ef4444' : color,
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 220);
                    const hex = isDanger ? '#ef4444' : color;
                    gradient.addColorStop(0, hex + '40');
                    gradient.addColorStop(1, hex + '00');
                    return gradient;
                },
            },
        ],
    };

    return (
        <div className={`bg-navy-800 rounded-xl p-5 border transition-colors duration-700 ${isDanger ? 'border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'border-white/10'}`}>
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold uppercase tracking-wider text-xs" style={{ color: isDanger ? '#ef4444' : color }}>
                    {title}
                </h3>
                <div className="flex items-center gap-2">
                    {isDanger && (
                        <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest animate-pulse">
                            ⚠ CRITICAL
                        </span>
                    )}
                    <span className="font-mono text-xl font-bold text-white">
                        {lastVal !== null ? lastVal.toFixed(2) : '--'}
                        <span className="text-xs text-gray-400 ml-1">{unit}</span>
                    </span>
                </div>
            </div>

            <div className="h-[160px]">
                {dataPoints.length >= 2 ? (
                    <Line options={options} data={chartData} />
                ) : (
                    <div className="h-full flex items-center justify-center">
                        <p className="text-gray-500 text-xs font-mono animate-pulse tracking-widest uppercase">
                            {dataPoints.length === 0 ? 'Waiting for data...' : 'Collecting readings...'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Main TrendGraph Component (receives history from Dashboard) ---
const TrendGraph = ({ history, isDemo }) => {
    // Build labels from timestamps
    const labels = history.map(d => d.time);
    const doData = history.map(d => d.do);
    const phData = history.map(d => d.ph);
    const tempData = history.map(d => d.temp);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse inline-block"></span>
                    Live Sensor Trends
                </h3>
                <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">
                    {isDemo ? '🔴 SIMULATION' : `${history.length} readings`}
                </span>
            </div>

            <ChartCard
                title="Dissolved Oxygen"
                labels={labels}
                dataPoints={doData}
                color="#00E5FF"
                unit="ppm"
                yMin={0}
                yMax={12}
                dangerZone={3.5}
            />
            <ChartCard
                title="pH Level"
                labels={labels}
                dataPoints={phData}
                color="#a78bfa"
                unit="pH"
                yMin={5}
                yMax={9}
                dangerZone={null}
            />
            <ChartCard
                title="Temperature"
                labels={labels}
                dataPoints={tempData}
                color="#34d399"
                unit="°C"
                yMin={15}
                yMax={35}
                dangerZone={null}
            />
        </div>
    );
};

export default TrendGraph;
