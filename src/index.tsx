import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './app/home/Home';
import AccountPage from './app/account/AccountPage';
import '../styles/dashboard_style.css';
import Login from './app/login/Login';
import ErrorPage from './app/error/ErrorPage';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function App() {
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		const tokenCookie = Cookies.get('token');

		if (tokenCookie) {
			setToken(tokenCookie);
		}
	}, []);

	if (!token) {
		return <Login setToken={setToken} />;
	}

	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route
					path='/account'
					element={<AccountPage setToken={setToken} />}
				/>
				<Route path='*' element={<ErrorPage />} />
			</Routes>
		</Router>
	);
}

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);
root.render(<App />);
