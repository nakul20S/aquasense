import React, { useState } from 'react';
import { Menu, X, Activity } from 'lucide-react';
import clsx from 'clsx';

const Header = ({ activePage, onNavClick }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { id: 'home', label: 'HOME' },
        { id: 'product', label: 'PRODUCT' },
        { id: 'dashboard', label: 'DASHBOARD' },
        { id: 'team', label: 'TEAM' }
    ];

    const handleClick = (id) => {
        onNavClick(id);
        setIsMobileMenuOpen(false);
    };

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 bg-navy-900/90 backdrop-blur-md py-4 border-b border-cyan-400/20 shadow-[0_5px_30px_rgba(0,0,0,0.5)]"
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleClick('home')}
                >
                    <Activity className="text-cyan-400" />
                    <h1 className="text-2xl font-bold tracking-tighter text-white">
                        Aqua<span className="text-cyan-400">Sense</span>
                    </h1>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => handleClick(link.id)}
                            className={clsx(
                                "text-sm font-bold tracking-widest transition-all duration-300 uppercase",
                                activePage === link.id
                                    ? "text-cyan-400 border-b-2 border-cyan-400 pb-1 shadow-[0_5px_15px_rgba(0,229,255,0.4)]"
                                    : "text-gray-400 hover:text-white"
                            )}
                        >
                            {link.label}
                        </button>
                    ))}
                    <div className="flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-bold text-emerald-400">SYSTEM LIVE</span>
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-navy-900 border-t border-cyan-400/20 p-4 shadow-xl">
                    <nav className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => handleClick(link.id)}
                                className={clsx(
                                    "text-left py-2 border-b border-white/5 font-bold uppercase tracking-wider",
                                    activePage === link.id ? "text-cyan-400" : "text-gray-300"
                                )}
                            >
                                {link.label}
                            </button>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
