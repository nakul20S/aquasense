import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShowcasePage from './pages/ShowcasePage';
import CustomerDashboard from './pages/CustomerDashboard';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ShowcasePage />} />
                <Route path="/dashboard" element={<CustomerDashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
