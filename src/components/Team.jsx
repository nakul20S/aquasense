import React from 'react';
import { User, Award } from 'lucide-react';

const Team = () => {
    const teamMembers = [
        { name: "Dhaush K", role: "Architecture & Automation Logic", lead: true },
        { name: "Nakul S", role: "Embedded System Development" },
        { name: "Harish M", role: "Power & Control Subsystems" },
        { name: "M. Gomathi", role: "Data Handling & Dashboard Logic" },
        { name: "Keerthika S", role: "Frontend Interface Design" },
    ];

    return (
        <section id="team" className="py-20 bg-navy-900 border-t border-cyan-400/10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">Meet the Engineers</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Built by students, guided by purpose. Validated by ICAR-CIBA.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {/* Faculty Guide Card */}
                    <div className="bg-gradient-to-br from-navy-800 to-navy-900 p-6 rounded-xl border border-emerald-500/30 flex items-start gap-4 hover:scale-105 transition-transform shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Award size={64} />
                        </div>
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center shrink-0">
                            <Award className="text-emerald-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Proselvi Mam</h3>
                            <p className="text-sm text-emerald-400 font-medium mb-1">Faculty Guide</p>
                            <p className="text-xs text-gray-400">Technical Mentorship & Validation</p>
                        </div>
                    </div>

                    {/* Team Members */}
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-navy-800 p-6 rounded-xl border border-white/5 hover:border-cyan-400/50 transition-all hover:-translate-y-1 group">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="w-10 h-10 bg-cyan-900/30 rounded-full flex items-center justify-center group-hover:bg-cyan-400/20 transition-colors">
                                    <User className="text-cyan-400" size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">{member.name}</h3>
                                    {member.lead && <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded uppercase tracking-wider">Team Lead</span>}
                                </div>
                            </div>
                            <p className="text-sm text-gray-400 border-t border-white/5 pt-3">
                                {member.role}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
