import React from 'react';
import '../../styles/auth_style.css';
import { useNavigate } from 'react-router-dom';

function LogIn() {
    const email = '';
    const password = '';
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        console.log(email, password);
        navigate('/');
    };

    return (
        <div className='auth_container'>
            <form onSubmit={handleSubmit} className='auth_box'>
                <div className='welcome_text'>
                    <span className='emoji'>😍</span>
                    <h1 className='auth_title'>Hey there!</h1>
                    <p>Ready to make sure your API works?</p>
                </div>
                <div className='email'>
                    <label>Email</label>
                    <input
                        value={email}
                        type='email'
                        id='email'
                        className='email_input'
                        placeholder='Your Email'
                    />
                </div>
                <div className='password'>
                    <label>Password</label>
                    <input
                        value={password}
                        type='password'
                        id='password'
                        className='password_input'
                        placeholder='Secure Password'
                    />
                </div>
                <button type='submit' className='signin_button'>
                    Sign In
                </button>
            </form>
        </div>
    );
}

export default LogIn;
