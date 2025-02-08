import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import router components
import Home from './home/Home';
import AccountPage from './account/AccountPage';
import '../styles/dashboard_style.css';
import '../styles/auth_style.css';
import LogIn from './login/Login';

function App() {
    return (
        <Router>
            {' '}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/account' element={<AccountPage />} />
                <Route path='/login' element={<LogIn />} />
            </Routes>
        </Router>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
