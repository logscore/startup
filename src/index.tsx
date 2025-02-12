import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import AccountPage from './account/AccountPage';
import '../styles/dashboard_style.css';
import Login from './login/Login';
import ErrorPage from './error/ErrorPage';
import useToken from '../lib/login';

function App() {
    const { token, setToken } = useToken();

    if (!token) {
        return <Login setToken={setToken} />;
    }

    return (
        <Router>
            {' '}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/account' element={<AccountPage />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </Router>
    );
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(<App />);
