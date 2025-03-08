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
		if (url === '') {
		} else {
			try {
				const requestBody: {
					url: string;
					endpoint: string;
					method: string;
					headers: { key: string; value: string }[];
					body: string;
				} = {
					url: url,
					endpoint: endpoint,
					method: method,
					headers: headers,
					body: body,
				};
				console.log(requestBody);
				const response = await fetch('http://localhost:4000/curl', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(requestBody),
				});

				console.log(response);

				if (!response.ok) {
					throw new Error(
						'An error has occured while making request',
					);
				}
				// 				const requestObj: {
				// 					url: string;
				// 					endpoint: string;
				// 					method: string;
				// 					headers: { key: string; value: string }[];
				// 					body: string;
				// 					statusCode: string;
				// 					curl: string;
				// 					curlResponse: string;
				// 				}[] = [
				// 					// TODO: This will be changed to just include one object not in an array. Make sure to fix the other instances of handing this data
				// 					{
				// 						url: url,
				// 						endpoint: endpoint,
				// 						method: method,
				// 						headers: headers,
				// 						body: body,
				// 						statusCode: 's',
				// 						curl: `curl -X GET "https://official-joke-api.appspot.com/jokes/programming/random`,
				// 						curlResponse: `{"type":"programming","setup":"Why was the JavaScript developer sad?","punchline":"He didn't know how to null his feelings.","id":420}]`,
				// 					},
				// 					{
				// 						url: 'https://reqres.in/api/users/2',
				// 						endpoint: '/user',
				// 						method: 'DELETE',
				// 						headers: [{ key: '', value: '' }],
				// 						body: '',
				// 						statusCode: '300',
				// 						curl: `curl -X DELETE "https://reqres.in/api/users/2"`,
				// 						curlResponse: ``,
				// 					},
				// 					{
				// 						url: 'https://reqres.in/api/users',
				// 						endpoint: '/api/users',
				// 						method: 'POST',
				// 						headers: [
				// 							{ key: 'Content-Type', value: 'application/json' },
				// 						],
				// 						body: '{"name": "John Doe", "job": "Developer"}',
				// 						statusCode: '400',
				// 						curl: `curl -X POST "https://reqres.in/api/users" \\
				//     -H "Content-Type: application/json" \\
				//     -d '{"name": "John Doe", "job": "Developer"}'
				// `,
				// 						curlResponse: `{
				//     name: 'John Doe',
				//     job: 'Developer',
				//     id: '121',
				//     createdAt: '2025-02-24T00:37:28.418Z',
				// }`,
				// 					},
				// 					{
				// 						url: 'https://reqres.in/api/users/2',
				// 						endpoint: '/forms',
				// 						method: 'PUT',
				// 						headers: [{ key: '', value: '' }],
				// 						body: '',
				// 						statusCode: '500',
				// 						curl: `curl -X PUT "https://reqres.in/api/users/2" \\
				//     -H "Content-Type: application/json" \\
				//     -d '{"name": "John Doe", "job": "Senior Developer"}'`,
				// 						curlResponse: `{
				//     name: 'John Doe',
				//     job: 'Senior Developer',
				//     updatedAt: '2025-02-24T00:42:51.002Z',
				// }`,
				// 					},
				// 				];
				// localStorage.setItem('request', JSON.stringify(requestObj));

				// window.location.reload();

				return;
			} catch (error: any) {
				console.error('Error making request on client:', error);
				throw error;
			}
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='content-box'>
				<h2>Test Builder</h2>
				<div className='input_row'>
					<label>API URL: </label>
					<input
						className='input-box'
						type='url'
						placeholder='https://api.example.com'
						style={{ width: '300px' }}
						onChange={e => setUrl(e.target.value)}
						required
					/>
				</div>
				<div className='input_row'>
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
								type='button'
								onClick={addHeader}
								className='content-box-button'
							>
								+
							</button>
						</div>
					))}
				</div>
				<div className='request-body'>
					<h3>Request Body</h3>
					<textarea
						placeholder='{ "key": "value" }'
						onChange={e => setBody(e.target.value)}
					/>
				</div>
				{/* TODO: This page refrest will be replaced with a websocket listener for the db to see when new entries are made */}
				<button type='submit' className='save-button'>
					Save
				</button>
			</div>
		</form>
	);
}

export default RequestBuilder;
