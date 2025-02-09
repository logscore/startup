import RequestBuilder from '../../components/dashboard/RequestBuilder';
import TestsExplorer from '../../components/dashboard/TestsExplorer';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

function Home() {
    return (
        <>
            <Navbar />
            <div style={{ display: 'flex' }} className='content-container'>
                <RequestBuilder />
                <TestsExplorer />
            </div>
            <Footer />
        </>
    );
}

export default Home;
