import RequestBuilder from '../../components/dashboard/RequestBuilder';
import TestsExplorer from '../../components/dashboard/TestsTable';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

function Home() {
    return (
        <>
            <Navbar />
            <div className='content-container'>
                <RequestBuilder />
                <TestsExplorer />
            </div>
            <Footer />
        </>
    );
}

export default Home;
