import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import AccountPage from './account/AccountPage';
import '../styles/dashboard_style.css';
import LogIn from './login/Login';
import ErrorPage from './error/ErrorPage';

function App() {
    return (
        <Router>
            {' '}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/account' element={<AccountPage />} />
                <Route path='/login' element={<LogIn />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </Router>
    );
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(<App />);
