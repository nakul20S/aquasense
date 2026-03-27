import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ExternalLink } from 'lucide-react';
import { db, ref, onValue } from '../firebase';
import SensorBar from '../components/dashboard/SensorBar';
import CustomerSidebar from '../components/dashboard/CustomerSidebar';
import LiveCharts from '../components/dashboard/LiveCharts';

// ─── Plant / Device Configuration ───────────────────────────────────────────
// Add more entries here as you deploy more AquaSense units in the field.
const PLANT_LOCATIONS = [
    { id: 'unit-01', label: 'Pond A — Sirkazhi Farm', path: 'aquasense/liveData',  deviceId: 'AS-ESP32-001' },
    { id: 'unit-02', label: 'Pond B — Trial Unit',    path: 'aquasense/liveData2', deviceId: 'AS-ESP32-002' },
];

const CUSTOMER = {
    name: 'Nakul S',
    plantName: 'Sirkazhi Aquafarm',
};

const MAX_HISTORY = 30;

// ─── Dashboard ────────────────────────────────────────────────────────────────
const CustomerDashboard = () => {
    const [selectedId, setSelectedId]         = useState(PLANT_LOCATIONS[0].id);
    const [data, setData]                     = useState({ do: 0, ph: 0, temp: 0 });
    const [history, setHistory]               = useState([]);
    const [connectionStatus, setConnectionStatus] = useState('WAITING');
    const [lastUpdated, setLastUpdated]       = useState(null);

    const unsubscribeRef = useRef(null);

    // Current device info
    const currentLocation = PLANT_LOCATIONS.find(l => l.id === selectedId) || PLANT_LOCATIONS[0];

    const pushHistory = useCallback((newData) => {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setHistory(prev => {
            const next = [...prev, { time, ...newData }];
            return next.length > MAX_HISTORY ? next.slice(next.length - MAX_HISTORY) : next;
        });
        setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, []);

    // Subscribe to Firebase on mount + whenever location changes
    useEffect(() => {
        // Tear down previous subscription
        if (unsubscribeRef.current) {
            unsubscribeRef.current();
            unsubscribeRef.current = null;
        }

        setConnectionStatus('WAITING');
        setHistory([]);
        setData({ do: 0, ph: 0, temp: 0 });

        const dataRef = ref(db, currentLocation.path);
        const unsubscribe = onValue(
            dataRef,
            (snapshot) => {
                const val = snapshot.val();
                if (val) {
                    const newData = {
                        do:   Number(val.do)   || 0,
                        ph:   Number(val.ph)   || 0,
                        temp: Number(val.temp) || 0,
                    };
                    setData(newData);
                    setConnectionStatus('CONNECTED');
                    pushHistory(newData);
                }
            },
            (err) => {
                console.error('Firebase error:', err);
                setConnectionStatus('OFFLINE');
            }
        );

        unsubscribeRef.current = unsubscribe;

        return () => {
            if (unsubscribeRef.current) unsubscribeRef.current();
        };
    }, [selectedId, currentLocation.path, pushHistory]);

    return (
        <div
            className="min-h-screen flex flex-col text-white"
            style={{ background: 'radial-gradient(ellipse at 30% 0%, rgba(6,182,212,0.06) 0%, transparent 60%), #020c18' }}
        >
            {/* ── Header ────────────────────────────────────────────── */}
            <header className="shrink-0 px-6 py-3 flex items-center justify-between border-b border-white/[0.07] bg-black/30 backdrop-blur-md sticky top-0 z-40">
                <div className="flex items-center gap-3">
                    <Activity size={20} className="text-cyan-400" />
                    <span className="text-xl font-black tracking-tight">
                        Aqua<span className="text-cyan-400">Sense</span>
                    </span>
                    <span className="hidden md:block text-white/20 text-lg font-thin mx-1">|</span>
                    <span className="hidden md:block text-sm text-gray-400 font-medium">{CUSTOMER.plantName}</span>
                </div>

                <div className="flex items-center gap-4">
                    {/* Live indicator */}
                    <div className={`hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${
                        connectionStatus === 'CONNECTED' ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                        : connectionStatus === 'OFFLINE' ? 'text-red-400 border-red-500/30 bg-red-500/10'
                        : 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10'
                    }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                            connectionStatus === 'CONNECTED' ? 'bg-emerald-500 animate-pulse'
                            : connectionStatus === 'OFFLINE' ? 'bg-red-500'
                            : 'bg-yellow-500 animate-bounce'
                        }`} />
                        {connectionStatus === 'CONNECTED' ? 'LIVE' : connectionStatus === 'OFFLINE' ? 'OFFLINE' : 'CONNECTING'}
                    </div>

                    <Link to="/" className="flex items-center gap-1.5 text-[11px] text-gray-500 hover:text-cyan-400 transition-colors font-mono">
                        <ExternalLink size={11} /> Showcase Site
                    </Link>
                </div>
            </header>

            {/* ── Main Content ──────────────────────────────────────── */}
            <div className="flex-1 flex flex-col p-5 gap-5 min-h-0">

                {/* SENSOR BAR — top */}
                <div className="shrink-0">
                    <SensorBar data={data} />
                </div>

                {/* BODY — sidebar + charts */}
                <div className="flex-1 flex gap-5 min-h-0">

                    {/* LEFT: Customer Sidebar */}
                    <CustomerSidebar
                        customerName={CUSTOMER.name}
                        plantName={currentLocation.label}
                        deviceLabel={currentLocation.deviceId}
                        lastUpdated={lastUpdated}
                        connectionStatus={connectionStatus}
                        locations={PLANT_LOCATIONS}
                        selectedLocation={selectedId}
                        onLocationChange={setSelectedId}
                    />

                    {/* RIGHT: 3 Horizontal Charts */}
                    <div className="flex-1 min-w-0 min-h-0">
                        <LiveCharts history={history} />
                    </div>
                </div>
            </div>

            {/* ── Footer Bar ────────────────────────────────────────── */}
            <footer className="shrink-0 px-6 py-2 border-t border-white/[0.05] flex items-center justify-between text-[10px] text-gray-600 font-mono bg-black/20">
                <span>AquaSense © 2026 • Validated by ICAR-CIBA</span>
                <span>Firebase path: <span className="text-cyan-900">{currentLocation.path}</span></span>
            </footer>
        </div>
    );
};

export default CustomerDashboard;
