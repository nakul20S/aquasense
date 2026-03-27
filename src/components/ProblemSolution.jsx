import React from 'react';
import { ShieldAlert, RefreshCw, Zap, TrendingUp, Cpu } from 'lucide-react';

const ProblemSolution = () => {
    return (
        <section id="problem" className="py-20 bg-gradient-to-b from-navy-900 to-navy-800">
            <div className="container mx-auto px-4">
                {/* Problem Section */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400 mb-6">
                            Why Traditional Monitoring Fails
                        </h2>
                        <div className="w-24 h-1 bg-cyan-400 mx-auto rounded"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="flex gap-4 items-start p-6 bg-navy-900 border-l-4 border-red-500 rounded-r-xl shadow-lg">
                                <ShieldAlert className="text-red-500 shrink-0" size={32} />
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">The 3 AM Crisis</h3>
                                    <p className="text-gray-400">
                                        Oxygen levels often crash late at night. Without automation, farmers wake up to catastrophic losses.
                                        In 2023, Sirkazhi farmers suffered <span className="text-red-400 font-bold">significant financial loss</span> in a single night due to delayed response.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start p-6 bg-navy-900 border-l-4 border-orange-500 rounded-r-xl shadow-lg">
                                <RefreshCw className="text-orange-500 shrink-0" size={32} />
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Manual is Too Slow</h3>
                                    <p className="text-gray-400">
                                        Manual testing is reactive. By the time you notice fish gasping, the stress damage is already done.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            {/* Visual representation could go here, for now a card describing the loss */}
                            <div className="bg-navy-900 p-8 rounded-2xl border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                                <h4 className="text-2xl font-bold text-red-500 mb-4">The Cost of Delay</h4>
                                <ul className="space-y-4 text-gray-300">
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                        Unnoticed Oxygen Drops
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                        Mass Mortality Events
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                        Wasted Electricity on Safe Days
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Solution Section */}
                <div id="solution" className="relative">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            The AquaSense Advantage
                        </h2>
                        <p className="text-xl text-cyan-400 tracking-wider uppercase font-medium">Closing the Loop between Sensing and Action</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="bg-navy-800 p-8 rounded-xl border border-cyan-400/20 hover:border-cyan-400 transition-all hover:-translate-y-2 group">
                            <div className="w-16 h-16 bg-cyan-400/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-cyan-400/20">
                                <Cpu className="text-cyan-400" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">1. Edge Intelligence</h3>
                            <p className="text-gray-400">
                                AquaSense continuously compares live data against safe thresholds locally, ensuring zero latency.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-navy-800 p-8 rounded-xl border border-cyan-400/20 hover:border-cyan-400 transition-all hover:-translate-y-2 group">
                            <div className="w-16 h-16 bg-cyan-400/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-cyan-400/20">
                                <Zap className="text-cyan-400" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">2. Automated Action</h3>
                            <p className="text-gray-400">
                                Aerators trigger the moment DO falls below 3.5 ppm—without waiting for the farmer.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-navy-800 p-8 rounded-xl border border-cyan-400/20 hover:border-cyan-400 transition-all hover:-translate-y-2 group">
                            <div className="w-16 h-16 bg-cyan-400/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-cyan-400/20">
                                <TrendingUp className="text-cyan-400" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">3. Proven Outcome</h3>
                            <p className="text-gray-400">
                                <span className="text-emerald-400 font-bold block mb-1">Optimized Energy Usage</span>
                                Run aerators only when needed. 100% peace of mind for the farmer.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProblemSolution;
