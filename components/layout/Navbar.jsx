import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate(); // Create a navigate function

    return (
        <nav className='index_nav'>
            <h2
                className='title'
                onClick={() => navigate('/')}
                style={{ cursor: 'pointer' }}
            >
                Demodel
            </h2>
            <div className='nav_links'>
                <button
                    onClick={() =>
                        (window.location.href =
                            'https://github.com/logscore/startup')
                    }
                >
                    <img src='./assets/github.svg' alt='GitHub' />
                </button>
                <button className='docs_button'>
                    <img src='./assets/docs.svg' alt='Documentation' />
                </button>
                <button onClick={() => navigate('/account')}>
                    <img src='./assets/user_account.svg' alt='User account' />
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
