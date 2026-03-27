import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProblemSolution from '../components/ProblemSolution';
import Product from '../components/Product';
import Dashboard from '../components/Dashboard';
import Team from '../components/Team';
import Footer from '../components/Footer';

function ShowcasePage() {
    const [activePage, setActivePage] = useState('home');

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.target.id) {
                    setActivePage(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.observe(section));

        return () => sections.forEach((section) => observer.unobserve(section));
    }, []);

    const handleNavClick = (id) => {
        setActivePage(id);
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-navy-900 text-white selection:bg-cyan-500/30">
            <Header activePage={activePage} onNavClick={handleNavClick} />
            <main>
                <section id="home">
                    <Hero onNavClick={handleNavClick} />
                </section>
                <ProblemSolution />
                <Product />
                <Dashboard />
                <Team />
            </main>
            <Footer onNavClick={handleNavClick} />
        </div>
    );
}

export default ShowcasePage;
