import React from 'react';

import TestBuilder from '../../components/dashboard/RequestBuilder';
import TestsExplorer from '../../components/dashboard/TestsExplorer';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const Home = () => {
    return (
        <>
            <Navbar />
            <div style={{ display: 'flex' }} className='content-container'>
                <TestBuilder />
                <TestsExplorer />
            </div>
            <Footer />
        </>
    );
};

export default Home;
