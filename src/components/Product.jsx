import React from 'react';
import { Cpu, Activity, Zap, Smartphone } from 'lucide-react';

const Product = () => {
    return (
        <section id="product" className="py-24 bg-navy-900 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-cyan-900/10 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        The AquaSense <span className="text-cyan-400">Product Ecosystem</span>
                    </h2>
                    <p className="text-xl text-gray-400 font-mono tracking-wider">
                        Where Industrial Hardware meets Intelligent Code.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto rounded mt-6"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

                    {/* Layer 1: Sensing */}
                    <div className="group relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative bg-navy-800 rounded-xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-colors">
                            <div className="h-64 overflow-hidden bg-black/50 flex items-center justify-center p-4">
                                {/* Image: Prototype Model 2 */}
                                <img
                                    src="/assets/prototype.png"
                                    alt="AquaSense Probe Prototype"
                                    className="h-full object-contain group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-cyan-900/30 rounded-lg text-cyan-400">
                                        <Activity size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Layer 1: Precision Sensing</h3>
                                </div>
                                <p className="text-gray-400 leading-relaxed font-medium">
                                    Utilizing industrial-grade <span className="text-white">Atlas EZO probes</span> for DO, pH, and Temperature. Features galvanic isolation to ensure accuracy in high-salinity brackish water.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Layer 2: Edge Intelligence */}
                    <div className="group relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative bg-navy-800 rounded-xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-colors">
                            <div className="h-64 overflow-hidden bg-black/50 flex items-center justify-center relative">
                                {/* Placeholder for PCB Image - Keeping Abstract as requested or fallback */}
                                <Cpu size={80} className="text-cyan-500/50 absolute" />
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                                <div className="z-10 bg-black/60 px-4 py-2 rounded border border-cyan-500/30 text-cyan-400 font-mono text-sm">
                                    ESP32-S3 CORE
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-purple-900/30 rounded-lg text-purple-400">
                                        <Cpu size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Layer 2: Edge Intelligence</h3>
                                </div>
                                <p className="text-gray-400 leading-relaxed font-medium">
                                    The "Brain" — An <span className="text-white">ESP32-S3 microcontroller</span> executing local logic. Decisions happen at the pond-side, ensuring 100% uptime even if the cloud is offline.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Layer 3: Actuation */}
                    <div className="group relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative bg-navy-800 rounded-xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-colors">
                            <div className="h-64 overflow-hidden bg-white/5 flex items-center justify-center p-4">
                                {/* Image: Workflow Diagram */}
                                <img
                                    src="/assets/workflow.png"
                                    alt="System Logic Workflow"
                                    className="h-full object-contain group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-emerald-900/30 rounded-lg text-emerald-400">
                                        <Zap size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Layer 3: Closed-Loop Actuation</h3>
                                </div>
                                <p className="text-gray-400 leading-relaxed font-medium">
                                    Automated response via high-power <span className="text-white">industrial relays</span>. When sensors detect a crash, aerators are triggered in milliseconds without human input.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Layer 4: Interface */}
                    <div className="group relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative bg-navy-800 rounded-xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-colors">
                            <div className="h-64 overflow-hidden bg-black/50 flex items-center justify-center relative">
                                {/* Image: Mobile App */}
                                <div className="absolute inset-0 bg-gradient-to-br from-navy-900 to-black"></div>
                                <img
                                    src="/assets/mobile_app.png"
                                    alt="AquaSense Mobile App"
                                    className="h-full object-contain relative z-10 group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-blue-900/30 rounded-lg text-blue-400">
                                        <Smartphone size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Layer 4: Data Visualization</h3>
                                </div>
                                <p className="text-gray-400 leading-relaxed font-medium">
                                    Dual-interface monitoring. A deep-data web hub for research and a simplified <span className="text-white">Mobile App</span> for the farmer with "5-foot visibility" UX.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Product;
