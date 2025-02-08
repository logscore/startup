import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import router components
import Navbar from '../components/layout/Navbar';
import Home from './home/Home';
import AccountPage from './account/AccountPage';
import Footer from '../components/layout/Footer';
import '../styles/dashboard_style.css';
import '../styles/auth_style.css';

function App() {
    return (
        <Router>
            {' '}
            {/* Wrap the entire app in Router */}
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/account' element={<AccountPage />} />
            </Routes>
            <Footer />
        </Router>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
