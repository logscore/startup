import Footer from '../../components/layout/Footer';
import Navbar from '../../components/layout/Navbar';
import '../../styles/account_style.css';
import { useNavigate } from 'react-router-dom';

function AccountPage() {
    const navigate = useNavigate();

    return (
        <div className='page-container'>
            <>
                <Navbar />
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
                <Footer />
            </>
        </div>
    );
}

export default AccountPage;
