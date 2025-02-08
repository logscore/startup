import React from 'react';

function TestBuilder() {
    return (
        <div className='content-box'>
            <h2>Test Builder</h2>

            {/* API URL */}
            <div>
                <label>API URL: </label>
                <input
                    className='input-box'
                    type='text'
                    placeholder='https://api.example.com'
                    style={{ width: '300px' }}
                />
            </div>

            {/* method */}
            <div className='method'>
                <h3>Method</h3>
                <select className='method-selector'>
                    <option value='GET'>GET</option>
                    <option value='POST'>POST</option>
                    <option value='PUT'>PUT</option>
                    <option value='DELETE'>DELETE</option>
                    <option value='PATCH'>PATCH</option>
                </select>
            </div>

            {/* Hhader */}
            <div>
                <h3>Headers</h3>
                <div>
                    <input
                        className='input-box'
                        type='text'
                        placeholder='Header Key'
                    />
                    <input
                        className='input-box'
                        type='text'
                        placeholder='Header Value'
                    />
                    <button className='content-box-button'>+</button>
                </div>
                <div>
                    <input
                        className='input-box'
                        type='text'
                        placeholder='Header Key'
                    />
                    <input
                        className='input-box'
                        type='text'
                        placeholder='Header Value'
                    />
                    <button className='content-box-button'>+</button>
                </div>
            </div>

            {/* query params */}
            <div>
                <h3>Query Parameters</h3>
                <div>
                    <input
                        className='input-box'
                        type='text'
                        placeholder='Query Key'
                    />
                    <input
                        className='input-box'
                        type='text'
                        placeholder='Query Value'
                    />
                    <button className='content-box-button'>+</button>
                </div>
                <div>
                    <input
                        className='input-box'
                        type='text'
                        placeholder='Query Key'
                    />
                    <input
                        className='input-box'
                        type='text'
                        placeholder='Query Value'
                    />
                    <button className='content-box-button'>+</button>
                </div>
            </div>

            {/* request body */}
            <div className='request-body'>
                <h3>Request Body</h3>
                <textarea placeholder='{ "key": "value" }' />
            </div>

            {/* auth */}
            <div className='authentication'>
                <h3>Authentication</h3>
                <select>
                    <option value='none'>None</option>
                    <option value='basic'>Basic Auth</option>
                    <option value='bearer'>Bearer Token</option>
                </select>
                <div className='auth-inputs'>
                    <input type='text' placeholder='Username' />
                    <input type='password' placeholder='Password' />
                </div>
                <div className='auth-inputs'>
                    <input type='text' placeholder='Bearer Token' />
                </div>
            </div>
            <button className='save-button'>Save</button>
        </div>
    );
}

export default TestBuilder;
