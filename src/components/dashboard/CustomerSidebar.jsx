import React from 'react';
import { User, MapPin, Cpu, Clock, ChevronDown, Wifi, WifiOff, Loader } from 'lucide-react';
import clsx from 'clsx';

const InfoRow = ({ icon: Icon, label, value, valueClass = 'text-white' }) => (
    <div className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0">
        <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
            <Icon size={13} className="text-cyan-400" />
        </div>
        <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">{label}</p>
            <p className={clsx('text-sm font-semibold mt-0.5', valueClass)}>{value}</p>
        </div>
    </div>
);

const ConnectionBadge = ({ status }) => {
    const cfg = {
        CONNECTED:  { icon: Wifi,   text: 'Live Feed',        cls: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
        WAITING:    { icon: Loader, text: 'Connecting...',    cls: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10' },
        OFFLINE:    { icon: WifiOff,text: 'No Signal',        cls: 'text-red-400 border-red-500/30 bg-red-500/10' },
        SIMULATION: { icon: Cpu,    text: 'Simulation',       cls: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
    }[status] || { icon: Wifi, text: 'Unknown', cls: 'text-gray-400 border-white/10 bg-white/5' };

    const Icon = cfg.icon;
    const isLoading = status === 'WAITING';

    return (
        <div className={clsx('inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold', cfg.cls)}>
            <Icon size={12} className={isLoading ? 'animate-spin' : ''} />
            {cfg.text}
        </div>
    );
};

const CustomerSidebar = ({
    customerName, plantName, deviceLabel, lastUpdated,
    connectionStatus, locations, selectedLocation, onLocationChange
}) => {
    return (
        <aside className="w-64 shrink-0 flex flex-col gap-4">

            {/* Customer Card */}
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4">
                {/* Avatar */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-emerald-400/20 border border-cyan-400/20 flex items-center justify-center">
                        <User size={22} className="text-cyan-300" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Customer</p>
                        <p className="text-white font-bold text-base">{customerName}</p>
                    </div>
                </div>

                <InfoRow icon={MapPin} label="Plant Location" value={plantName} />
                <InfoRow icon={Cpu}    label="Device ID"      value={deviceLabel} valueClass="text-cyan-300 font-mono text-xs" />
                <InfoRow icon={Clock}  label="Last Update"    value={lastUpdated || '—'} valueClass="text-gray-300 text-xs font-mono" />

                <div className="mt-3">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1.5">Connection</p>
                    <ConnectionBadge status={connectionStatus} />
                </div>
            </div>

            {/* Device Switcher */}
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-3">Switch Plant / Device</p>
                <div className="relative">
                    <select
                        className="w-full appearance-none bg-black/40 border border-white/10 hover:border-cyan-400/40 text-white text-sm rounded-xl px-3 py-2.5 pr-8 focus:outline-none focus:border-cyan-400/60 transition-colors cursor-pointer"
                        value={selectedLocation}
                        onChange={e => onLocationChange(e.target.value)}
                    >
                        {locations.map(loc => (
                            <option key={loc.id} value={loc.id} className="bg-gray-900">
                                {loc.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                <p className="mt-3 text-[10px] text-gray-600 leading-relaxed">
                    Each location streams from a separate AquaSense unit via Firebase.
                </p>
            </div>

            {/* Threshold Guide */}
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-3">Safety Thresholds</p>
                <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                        <span className="text-cyan-300">Dissolved O₂</span>
                        <span className="font-mono text-gray-300">&gt; 3.5 ppm</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-purple-300">pH Level</span>
                        <span className="font-mono text-gray-300">6.5 – 8.5</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-emerald-300">Temperature</span>
                        <span className="font-mono text-gray-300">20 – 30 °C</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default CustomerSidebar;
