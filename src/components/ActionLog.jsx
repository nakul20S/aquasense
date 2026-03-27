import React, { useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';
import clsx from 'clsx';

const ActionLog = ({ logs }) => {
    const scrollRef = useRef(null);

    // Auto-scroll to top when new logs arrive (since we prepend events)
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, [logs]);

    return (
        <div className="bg-navy-800 rounded-xl p-6 border border-cyan-400/20 h-[400px] flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-cyan-400">
                <Terminal size={20} />
                <h3 className="font-bold uppercase tracking-wider">Automation Watch (System Log)</h3>
            </div>
            <div
                ref={scrollRef}
                className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1"
            >
                {logs.map((log, i) => (
                    <div key={i} className={clsx(
                        "p-3 rounded bg-black/40 border-l-2 animate-pulse",
                        log.type === 'alert' ? 'border-red-500 text-red-400' : 'border-emerald-500 text-emerald-400'
                    )}>
                        <div className="flex justify-between items-start">
                            <span className="text-sm font-medium">{log.msg}</span>
                            <span className="text-xs opacity-60 font-mono ml-2 whitespace-nowrap">[{log.time}]</span>
                        </div>
                    </div>
                ))}
            </div>
            <p className="mt-4 text-xs text-gray-500 italic">*This log displays real-time actions taken by the edge controller.</p>
        </div>
    );
};

export default ActionLog;
