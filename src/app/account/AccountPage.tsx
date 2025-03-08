import Footer from '../../components/layout/Footer';
import Navbar from '../../components/layout/Navbar';
import '/styles/account_style.css';

// interface LoginProps {
// 	setToken: (userToken: { token: string }) => void;
// }

function AccountPage({ setToken }) {
	return (
		<div className='page-container'>
			<>
				<Navbar />
				<div className='account-box'>
					<p>youremail@website.com</p>
					<button
						className='signout_button'
						onClick={setToken({ token: '' })}
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
