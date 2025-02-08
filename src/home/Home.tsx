import React from 'react';

import TestBuilder from '../../components/dashboard/RequestBuilder';
import TestsExplorer from '../../components/dashboard/TestsExplorer';

const Home = () => {
    return (
        <div style={{ display: 'flex' }} className='content-container'>
            <TestBuilder />
            <TestsExplorer />
        </div>
    );
};

export default Home;
