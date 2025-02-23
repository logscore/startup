import React, { useState } from 'react';

function RequestBuilder() {
    const [url, setUrl] = useState('');
    const [endpoint, setEndpoint] = useState('');
    const [method, setMethod] = useState('GET');
    const [body, setBody] = useState('');

    const [headers, setHeaders] = useState([{ key: '', value: '' }]);

    const addHeader = () => {
        setHeaders([...headers, { key: '', value: '' }]);
    };

    const updateHeader = (index: number, field: string, value: string) => {
        setHeaders(
            headers.map(
                (
                    header: {
                        key: string;
                        value: string;
                    },
                    i: number,
                ) => (i === index ? { ...header, [field]: value } : header),
            ),
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // const requestBody: {
            //     url: string;
            //     endpoint: string;
            //     method: string;
            //     headers: { key: string; value: string }[];
            //     body: string;
            // } = {
            //     url: url,
            //     endpoint: endpoint,
            //     method: method,
            //     headers: headers,
            //     body: body,
            // };
            // const response = await fetch('http://localhost:8080/curl', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(requestBody),
            // });

            // if (!response.ok) {
            //     throw new Error('An error has occured while making request');
            // }
            // const res = await response.json();
            const requestObj: {
                url: string;
                endpoint: string;
                method: string;
                headers: { key: string; value: string }[];
                body: string;
            }[] = [
                {
                    url: 'https://hanko.io',
                    endpoint: '/auth',
                    method: 'GET',
                    headers: [{ key: '', value: '' }],
                    body: '',
                },
                {
                    url: 'https://cal.com',
                    endpoint: '/user',
                    method: 'DELETE',
                    headers: [{ key: '', value: '' }],
                    body: '',
                },
                {
                    url: 'https://goonsquad.com',
                    endpoint: '/health',
                    method: 'POST',
                    headers: [{ key: '', value: '' }],
                    body: '',
                },
                {
                    url: 'https://formbricks.com',
                    endpoint: '/forms',
                    method: 'PUT',
                    headers: [{ key: '', value: '' }],
                    body: '',
                },
            ];
            localStorage.setItem('request', JSON.stringify(requestObj));
            localStorage.setItem(
                'responseCode',
                JSON.stringify({ code: '200' }),
            );
            // localStorage.setItem('response', res.response[1]);
            // localStorage.setItem('responseCode', res.response[2]);
            const localItem = localStorage.getItem('request');
            console.log(localItem);

            return;
        } catch (error: any) {
            console.error('Error making request on client:', error);
            throw error;
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='content-box'>
                <h2>Test Builder</h2>

                <div>
                    <label>API URL: </label>
                    <input
                        className='input-box'
                        type='text'
                        placeholder='https://api.example.com'
                        style={{ width: '300px' }}
                        onChange={e => setUrl(e.target.value)}
                    />
                </div>

                <div>
                    <label>Endpoint: </label>
                    <input
                        className='input-box'
                        type='text'
                        placeholder='/endpoint/v1/users?limit=10&offset=0'
                        style={{ width: '300px' }}
                        onChange={e => setEndpoint(e.target.value)}
                    />
                </div>

                <div className='method'>
                    <h3>Method</h3>
                    <select
                        className='method-selector'
                        value={method}
                        onChange={e => setMethod(e.target.value)}
                    >
                        <option value='GET'>GET</option>
                        <option value='POST'>POST</option>
                        <option value='PUT'>PUT</option>
                        <option value='DELETE'>DELETE</option>
                    </select>
                </div>

                <div>
                    <h3>Headers</h3>
                    {headers.map((header, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <input
                                className='input-box'
                                type='text'
                                placeholder='Header Key'
                                value={header.key}
                                onChange={e =>
                                    updateHeader(index, 'key', e.target.value)
                                }
                            />
                            <input
                                className='input-box'
                                type='text'
                                placeholder='Header Value'
                                value={header.value}
                                onChange={e =>
                                    updateHeader(index, 'value', e.target.value)
                                }
                            />
                            <button
                                onClick={addHeader}
                                className='content-box-button'
                            >
                                +
                            </button>
                        </div>
                    ))}
                </div>
                {/* 
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
                        // <button className='content-box-button'>+</button>
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
                        // <button className='content-box-button'>+</button>
                    </div>
                </div> */}

                <div className='request-body'>
                    <h3>Request Body</h3>
                    <textarea
                        placeholder='{ "key": "value" }'
                        onChange={e => setBody(e.target.value)}
                    />
                </div>
                {/* 
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
                </div> */}
                <button type='submit' className='save-button'>
                    Save
                </button>
            </div>
        </form>
    );
}

export default RequestBuilder;
