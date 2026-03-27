import React, { useState, useEffect, useRef, useCallback } from 'react';
import StatCard from './StatCard';
import ActionLog from './ActionLog';
import TrendGraph from './TrendGraph';
import clsx from 'clsx';
import { db, ref, onValue } from '../firebase';
import { Wifi, Activity, AlertTriangle } from 'lucide-react';

const MAX_HISTORY = 30; // rolling window size

const Dashboard = () => {
    const [mode, setMode] = useState('LIVE'); // 'LIVE' | 'DEMO'
    const [data, setData] = useState({ do: 0, ph: 0, temp: 0 });
    const [history, setHistory] = useState([]); // array of { time, do, ph, temp }
    const [logs, setLogs] = useState([
        { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), msg: "System initialization complete. Waiting for sensor stream...", type: "info" }
    ]);
    const [connectionStatus, setConnectionStatus] = useState('WAITING');

    const lastDataTimeRef = useRef(Date.now());
    const timeoutIntervalRef = useRef(null);
    const prevDoRef = useRef(null);

    // Helper to add a timestamped point to history
    const pushHistory = useCallback((newData) => {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setHistory(prev => {
            const updated = [...prev, { time: timestamp, ...newData }];
            return updated.length > MAX_HISTORY ? updated.slice(updated.length - MAX_HISTORY) : updated;
        });
    }, []);

    // ---------------------------
    // LIVE MODE LOGIC (Firebase)
    // ---------------------------
    useEffect(() => {
        if (mode !== 'LIVE') {
            setConnectionStatus('SIMULATION');
            clearInterval(timeoutIntervalRef.current);
            return;
        }

        setConnectionStatus('WAITING');
        const dataRef = ref(db, 'aquasense/liveData');

        const unsubscribe = onValue(dataRef, (snapshot) => {
            const val = snapshot.val();
            if (val) {
                lastDataTimeRef.current = Date.now();
                setConnectionStatus('CONNECTED');

                const newData = {
                    do: Number(val.do) || 0,
                    ph: Number(val.ph) || 0,
                    temp: Number(val.temp) || 0,
                };

                setData(newData);
                pushHistory(newData);
            }
        }, (error) => {
            console.error("Firebase read failed", error);
            setConnectionStatus('OFFLINE');
        });

        // 3-minute timeout checker
        timeoutIntervalRef.current = setInterval(() => {
            const elapsed = Date.now() - lastDataTimeRef.current;
            if (elapsed > 180000) {
                setConnectionStatus('OFFLINE');
                setLogs(prev => [
                    { time: new Date().toLocaleTimeString(), msg: "⚠️ CONNECTION LOST: No telemetry received for 3 minutes.", type: "alert" },
                    ...prev
                ]);
            }
        }, 1000);

        return () => {
            unsubscribe();
            clearInterval(timeoutIntervalRef.current);
        };
    }, [mode, pushHistory]);

    // ---------------------------
    // DEMO MODE LOGIC (Simulation)
    // ---------------------------
    useEffect(() => {
        if (mode !== 'DEMO') return;

        // Reset history for a clean demo run
        setHistory([]);
        const initial = { do: 7.2, ph: 7.5, temp: 25.0 };
        setData(initial);
        pushHistory(initial);
        setLogs(prev => [{ time: new Date().toLocaleTimeString(), msg: "DEMO MODE ACTIVATED: Simulating night conditions", type: "info" }, ...prev]);

        const interval = setInterval(() => {
            setData(prev => {
                const next = {
                    do: Math.max(2.0, prev.do - 0.15),
                    ph: parseFloat((7.5 + (Math.random() * 0.2 - 0.1)).toFixed(2)),
                    temp: parseFloat((25.0 + (Math.random() * 0.4 - 0.2)).toFixed(2)),
                };
                pushHistory(next);
                return next;
            });
        }, 1500);

        return () => clearInterval(interval);
    }, [mode, pushHistory]);

    // ---------------------------
    // AUTOMATION LOGIC — Alert on DO drop
    // ---------------------------
    useEffect(() => {
        if (data.do > 0 && data.do < 3.5) {
            if (prevDoRef.current === null || prevDoRef.current >= 3.5) {
                setLogs(prev => [
                    {
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                        msg: `CRITICAL: DO level ${data.do.toFixed(2)} ppm < 3.5 ppm → Aerator turned ON automatically`,
                        type: "alert"
                    },
                    ...prev
                ]);
            }
        }
        prevDoRef.current = data.do;
    }, [data.do]);

    // Status helper
    const getStatusDisplay = () => {
        switch (connectionStatus) {
            case 'CONNECTED':   return { text: "RECEIVING DATA",    color: "text-blue-400",   dot: "bg-blue-500 animate-pulse" };
            case 'WAITING':     return { text: "WAITING FOR TELEMETRY...", color: "text-yellow-400", dot: "bg-yellow-500 animate-bounce" };
            case 'OFFLINE':     return { text: "OFFLINE / NO SIGNAL", color: "text-red-500",  dot: "bg-red-500" };
            case 'SIMULATION':  return { text: "SIMULATION ACTIVE", color: "text-red-400",   dot: "bg-red-500 animate-pulse" };
            default:            return { text: "UNKNOWN",            color: "text-gray-400",  dot: "bg-gray-500" };
        }
    };

    const statusStyle = getStatusDisplay();

    return (
        <section id="dashboard" className="container mx-auto px-4 py-8 min-h-screen">

            {/* Dashboard Control Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6 bg-navy-800 p-6 rounded-xl border border-white/5 shadow-lg">
                <div>
                    <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Activity className="text-cyan-400" />
                        Live System Dashboard
                    </h2>
                    <div className="flex items-center gap-2 mt-2">
                        <span className={clsx("w-3 h-3 rounded-full", statusStyle.dot)}></span>
                        <p className="text-gray-400 font-mono text-sm tracking-wider uppercase">
                            Status: <span className={statusStyle.color}>{statusStyle.text}</span>
                        </p>
                    </div>
                    {connectionStatus === 'OFFLINE' && (
                        <div className="mt-2 text-xs text-red-400 flex items-center gap-1 font-bold">
                            <AlertTriangle size={12} /> LAST CONTACT: {Math.round((Date.now() - lastDataTimeRef.current) / 60000)} MIN AGO
                        </div>
                    )}
                </div>

                {/* Mode Switcher */}
                <div className="flex bg-navy-900 rounded-lg p-1 border border-cyan-400/20">
                    <button
                        onClick={() => setMode('LIVE')}
                        className={clsx(
                            "px-6 py-2 rounded-md font-bold text-sm transition-all flex items-center gap-2",
                            mode === 'LIVE' ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : "text-gray-400 hover:text-white"
                        )}
                    >
                        <Wifi size={16} /> LIVE DEVICE
                    </button>
                    <button
                        onClick={() => setMode('DEMO')}
                        className={clsx(
                            "px-6 py-2 rounded-md font-bold text-sm transition-all flex items-center gap-2",
                            mode === 'DEMO' ? "bg-red-600 text-white shadow-lg shadow-red-500/30 animate-pulse" : "text-gray-400 hover:text-white"
                        )}
                    >
                        <Activity size={16} /> SIMULATE CRISIS
                    </button>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Dissolved Oxygen" value={data.do.toFixed(2)} unit="ppm" status={data.do > 0 && data.do < 4 ? "Critical" : "Optimum"} />
                <StatCard title="pH Level"          value={data.ph.toFixed(2)} unit="pH"  status="Stable" />
                <StatCard title="Temperature"       value={data.temp.toFixed(2)} unit="°C" status="Active" />
            </div>

            {/* Charts + Log */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <TrendGraph history={history} isDemo={mode === 'DEMO'} />
                <ActionLog logs={logs} />
            </div>
        </section>
    );
};

export default Dashboard;
