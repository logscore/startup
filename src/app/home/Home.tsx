import RequestBuilder from '../../components/dashboard/RequestBuilder';
import TestsExplorer from '../../components/dashboard/TestsTable';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useState } from 'react';

function Home() {
	const [refreshTrigger, setRefreshTrigger] = useState(0);

	const triggerRefresh = () => {
		setRefreshTrigger(prev => prev + 1);
	};
	return (
		<>
			<Navbar />
			<div className='content-container'>
				<RequestBuilder triggerRefresh={triggerRefresh} />
				<TestsExplorer refreshTrigger={refreshTrigger} />
			</div>
			<Footer />
		</>
	);
}

export default Home;
