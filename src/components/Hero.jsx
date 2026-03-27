import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const Hero = ({ onNavClick }) => {
    return (
        <section className="relative min-h-[calc(100vh-6rem)] flex items-center justify-center overflow-hidden bg-[url('https://images.unsplash.com/photo-1516131206008-563d3c87f295?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
            {/* Overlay */}
            <div className="absolute inset-0 bg-navy-900/90 from-navy-900 via-navy-900/95 to-navy-900/80"></div>

            {/* Grid Pattern Effect */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-8 animate-fade-in-up backdrop-blur-sm">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-emerald-400 font-mono text-sm tracking-widest font-bold">SYSTEM ACTIVE • PATENT PENDING</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                    AquaSense <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Intelligent Automation</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                    Real-time water quality monitoring and automatic response to protect fish health—<span className="text-white font-bold">even at 3 AM.</span>
                    <span className="block mt-4 text-base text-gray-400 font-mono">Edge-powered • Sensor-driven • Farmer-centric</span>
                </p>

                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <button
                        onClick={() => onNavClick('dashboard')}
                        className="group relative px-8 py-4 bg-cyan-400 text-black font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105 glow-cyan"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            View Live System <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>

                    <button
                        onClick={() => onNavClick('product')}
                        className="px-8 py-4 border border-white/20 text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all backdrop-blur-sm flex items-center gap-2 justify-center"
                    >
                        <Play size={20} className="text-cyan-400" /> See How It Works
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
