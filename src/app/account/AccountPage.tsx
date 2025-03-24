import Footer from '../../components/layout/Footer';
import Navbar from '../../components/layout/Navbar';
import '/styles/account_style.css';
import Cookies from 'js-cookie';

interface LoginProps {
	setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

// Fix: Accept the correct type for setToken
function handleSignout(setToken: React.Dispatch<React.SetStateAction<string | null>>) {
	Cookies.remove('token');
	setToken(null);
}

function AccountPage({ setToken }: LoginProps) {
	return (
		<div className='page-container'>
			<Navbar />
			<div className='account-box'>
				<p>youremail@website.com</p>
				<button className='signout_button' onClick={() => handleSignout(setToken)}>
					Sign out
				</button>
			</div>
			<Footer />
		</div>
	);
}

export default AccountPage;
