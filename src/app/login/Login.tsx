import React, { useState } from 'react';
import '/styles/auth_style.css';

const dev = (import.meta as ImportMeta & { env: { DEV: boolean } }).env.DEV === true;

interface Credentials {
	email: string;
	password: string;
}

interface LoginProps {
	setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

async function authenticateUser(credentials: Credentials, route: string) {
	const prodUrl = `https://startup.demodel.click/auth/${route}`;
	const devUrl = `http://localhost:4000/auth/${route}`;
	const response = await fetch(dev ? devUrl : prodUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
		credentials: 'include',
	});

	if (!response.ok) {
		const data = await response.json();
		throw new Error(data.msg);
	}
	return await response.json();
}

function Login({ setToken }: LoginProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [tab, setTab] = useState(1);

	const handleAuth = async (e: React.FormEvent<HTMLFormElement>, route: string) => {
		e.preventDefault();
		setError('');

		try {
			const token = await authenticateUser({ email, password }, route);
			token ? setToken(token) : null;
		} catch (error: any) {
			setError(error.message);
		}
	};

	return (
		<div className='auth_container'>
			<div>
				<button
					className={
						tab === 1 ? 'custom-button explorer-button-active' : 'custom-button explorer-button-inactive'
					}
					onClick={() => setTab(1)}
				>
					Signup
				</button>
				<button
					className={
						tab === 2 ? 'custom-button explorer-button-active' : 'custom-button explorer-button-inactive'
					}
					onClick={() => setTab(2)}
				>
					Login
				</button>
			</div>
			{tab === 1 ? (
				<form onSubmit={e => handleAuth(e, 'signup')} className='auth_box'>
					<div className='welcome_text'>
						<span className='emoji'>🦊</span>
						<h1 className='auth_title'>Hey there!</h1>
						<p>Ready to make sure your API works?</p>
					</div>
					<div className='email'>
						<label>Email (dev@test.com)</label>
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
						<label>Password (password)</label>
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
				<form onSubmit={e => handleAuth(e, 'login')} className='auth_box'>
					<div className='welcome_text'>
						<span className='emoji'>🦊</span>
						<h1 className='auth_title'>Welcome back!</h1>
						<p>Let's get to work </p>
					</div>
					<div className='email'>
						<label>Email (dev@test.com)</label>
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
						<label>Password (password)</label>
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
