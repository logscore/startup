import React from 'react';
import '../../styles/account_style.css';

function AccountPage() {
    return (
        <div className='account-container'>
            <div className='account-box'>
                <p>youremail@website.com</p>
                <button className='signout_button'>Sign out</button>
            </div>
        </div>
    );
}

export default AccountPage;
