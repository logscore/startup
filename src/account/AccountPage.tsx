import React from 'react';
import '../../styles/account_style.css';
import { useNavigate } from 'react-router-dom';

function AccountPage() {
    const navigate = useNavigate();

    return (
        <div className='account-container'>
            <div className='account-box'>
                <p>youremail@website.com</p>
                <button
                    className='signout_button'
                    onClick={() => navigate('/login')}
                >
                    Sign out
                </button>
            </div>
        </div>
    );
}

export default AccountPage;
