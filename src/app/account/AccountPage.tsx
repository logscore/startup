import Footer from '../../components/layout/Footer';
import Navbar from '../../components/layout/Navbar';
import '/styles/account_style.css';

interface LoginProps {
	setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

function AccountPage({ setToken }: LoginProps) {
	return (
		<div className='page-container'>
			<>
				<Navbar />
				<div className='account-box'>
					<p>youremail@website.com</p>
					<button
						className='signout_button'
						onClick={() => setToken(null)}
					>
						Sign out
					</button>
				</div>
				<Footer />
			</>
		</div>
	);
}

export default AccountPage;
