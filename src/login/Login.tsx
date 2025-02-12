import React, { useState } from 'react';
import '../../styles/auth_style.css';

interface LoginProps {
    setToken: (userToken: { token: string }) => void;
}

// interface Credentials {
//     email: string;
//     password: string;
// }

async function loginUser(/*credentials: Credentials*/) {
    try {
        // const response = await fetch('<whatever auth endpoint you make>', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(credentials),
        // });

        // if (!response.ok) {
        //     throw new Error('Invalid login credentials');
        // }
        //
        // return await response.json();

        return {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fakePayload.fakeSignature',
        };
    } catch (error: any) {
        console.error('Error logging in:', error);
        throw error;
    }
}

function Login({ setToken }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            const token = await loginUser(/*{ email, password }*/);
            setToken(token);
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div className='auth_container'>
            <form onSubmit={handleSubmit} className='auth_box'>
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
                        // required
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
                        // required
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
                    Sign In
                </button>
            </form>
        </div>
    );
}

export default Login;
