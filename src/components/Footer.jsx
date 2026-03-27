import React from 'react';
import { Activity, Mail, Phone, MapPin } from 'lucide-react';

const Footer = ({ onNavClick }) => {
    return (
        <footer className="bg-navy-900 border-t border-white/5 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Column 1: Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Activity className="text-cyan-400" />
                            <h2 className="text-2xl font-bold text-white">Aqua<span className="text-cyan-400">Sense</span></h2>
                        </div>
                        <p className="text-gray-400 mb-6">
                            Intelligent aquaculture automation for the modern farmer. Protecting aquatic life through real-time sensing and closed-loop control.
                        </p>
                        <div className="text-sm text-gray-500">
                            &copy; {new Date().getFullYear()} AquaSense Project. All rights reserved.
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-lg">Quick Access</h3>
                        <ul className="space-y-3">
                            {[
                                { label: 'Home', id: 'home' },
                                { label: 'Product', id: 'product' },
                                { label: 'Dashboard', id: 'dashboard' },
                                { label: 'Team', id: 'team' }
                            ].map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => onNavClick(item.id)}
                                        className="text-gray-400 hover:text-cyan-400 transition-colors"
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-lg">Contact Team</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-gray-400">
                                <Mail size={18} className="text-cyan-500" />
                                <span>contact@aquasense-project.com</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Phone size={18} className="text-cyan-500" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <MapPin size={18} className="text-cyan-500" />
                                <span>Sirkazhi, Tamil Nadu</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="text-center pt-8 border-t border-white/5 text-gray-600 text-sm">
                    Designed with <span className="text-red-500">♥</span> by the AquaSense Engineering Team
                </div>
            </div>
        </footer>
    );
};

export default Footer;
