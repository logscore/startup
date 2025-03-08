import React, { useState } from 'react';
import '/styles/auth_style.css';

// interface LoginProps {
// 	setToken: (userToken: { token: string }) => void;
// }

interface Credentials {
	email: string;
	password: string;
}

async function loginUser(credentials: Credentials) {
	try {
		const response = await fetch('http://localhost:4000/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credentials),
			credentials: 'include',
		});

		if (!response.ok) {
			throw new Error('Invalid login credentials');
		}

		return await response.json();
	} catch (error: any) {
		console.error('Error logging in:', error);
		throw error;
	}
}

async function signupUser(credentials: Credentials) {
	try {
		const response = await fetch('http://localhost:4000/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credentials),
			credentials: 'include',
		});

		if (!response.ok) {
			return response;
		} else {
			return await response.json();
		}
	} catch (error: any) {
		console.error('Error logging in:', error);
		throw error;
	}
}

function Login({ setToken }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [tab, setTab] = useState(1);

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError('');

		try {
			const token = await loginUser({ email, password });
			setToken(token) ? token : null;
		} catch (error: any) {
			setError(error.message);
		}
	};

	const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError('');

		try {
			const token = await signupUser({ email, password });
			setToken(token);
		} catch (error: any) {
			setError(error.message);
		}
	};

	return (
		<div className='auth_container'>
			<div>
				<button
					className={
						tab === 1
							? 'custom-button explorer-button-active'
							: 'custom-button explorer-button-inactive'
					}
					onClick={() => setTab(1)}
				>
					Signup
				</button>
				<button
					className={
						tab === 2
							? 'custom-button explorer-button-active'
							: 'custom-button explorer-button-inactive'
					}
					onClick={() => setTab(2)}
				>
					Login
				</button>
			</div>
			{tab === 1 ? (
				<form onSubmit={handleSignup} className='auth_box'>
					<div className='welcome_text'>
						<span className='emoji'>🦊</span>
						<h1 className='auth_title'>Hey there!</h1>
						<p>Ready to make sure your API works?</p>
					</div>
					<div className='email'>
						<label>Email</label>
						<input
							value={email}
							type='email'
							id='email'
							className='signin-box'
							placeholder='Your Email'
							onChange={e => setEmail(e.target.value)} // Had to look this one up because text wouldn't show up when typed in on the last implementation
							required
						/>
					</div>
					<div className='password'>
						<label>Password</label>
						<input
							value={password}
							type='password'
							id='password'
							className='signin-box'
							placeholder='Secure Password'
							onChange={e => setPassword(e.target.value)} // Had to look this one up because text wouldn't show up when typed in on the last implementation
							required
						/>
					</div>
					{error && (
						<p
							style={{
								color: 'red',
								textAlign: 'center',
								margin: '16px',
							}}
						>
							{error}
						</p>
					)}
					<button type='submit' className='signin_button'>
						Sign Up
					</button>
				</form>
			) : (
				<form onSubmit={handleLogin} className='auth_box'>
					<div className='welcome_text'>
						<span className='emoji'>🦊</span>
						<h1 className='auth_title'>Welcome back!</h1>
						<p>Let's get to work </p>
					</div>
					<div className='email'>
						<label>Email</label>
						<input
							value={email}
							type='email'
							id='email'
							className='signin-box'
							placeholder='Your Email'
							onChange={e => setEmail(e.target.value)} // Had to look this one up because text wouldn't show up when typed in on the last implementation
							required
						/>
					</div>
					<div className='password'>
						<label>Password</label>
						<input
							value={password}
							type='password'
							id='password'
							className='signin-box'
							placeholder='Secure Password'
							onChange={e => setPassword(e.target.value)} // Had to look this one up because text wouldn't show up when typed in on the last implementation
							required
						/>
					</div>
					{error && (
						<p
							style={{
								color: 'red',
								textAlign: 'center',
								margin: '16px',
							}}
						>
							{error}
						</p>
					)}
					<button type='submit' className='signin_button'>
						Log In
					</button>
				</form>
			)}
		</div>
	);
}

export default Login;
