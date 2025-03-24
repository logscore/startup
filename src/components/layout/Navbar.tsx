import { useNavigate } from 'react-router-dom';
import Github from '../../../public/Github';
import UserIcon from '../../../public/UserIcon';
import DocsIcon from '../../../public/DocsIcon';

function Navbar() {
	const navigate = useNavigate();

	return (
		<nav className='index_nav'>
			<h2 className='title' onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
				Demodel
			</h2>
			<div className='nav_links'>
				<button onClick={() => (window.location.href = 'https://github.com/logscore/startup')}>
					<Github />
				</button>
				<button>
					<DocsIcon />
				</button>
				<button onClick={() => navigate('/account')}>
					<UserIcon />
				</button>
			</div>
		</nav>
	);
}

export default Navbar;
