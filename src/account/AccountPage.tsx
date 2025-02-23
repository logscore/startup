import Footer from '../../components/layout/Footer';
import Navbar from '../../components/layout/Navbar';
import '../../styles/account_style.css';

function AccountPage() {
    function handlelogout() {
        localStorage.removeItem('token');
        window.location.reload();
    }

    return (
        <div className='page-container'>
            <>
                <Navbar />
                <div className='account-box'>
                    <p>youremail@website.com</p>
                    <button className='signout_button' onClick={handlelogout}>
                        Sign out
                    </button>
                </div>
                <Footer />
            </>
        </div>
    );
}

export default AccountPage;
