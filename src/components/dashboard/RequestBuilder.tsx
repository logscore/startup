import React, { useState } from 'react';

interface refreshProp {
	triggerRefresh: () => void;
}

function RequestBuilder({ triggerRefresh }: refreshProp) {
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
				const response = await fetch(
					'https://startup.demodel.click/curl',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(requestBody),
					},
				);

				if (!response.ok) {
					throw new Error(
						'An error has occured while making request',
					);
				}

				triggerRefresh();

				return;
			} catch (error: any) {
				console.error('Error making request on client:', error);
				throw error;
			}
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className='content-box'>
					<h2>Test Builder</h2>
					<div className='input_row'>
						<label>API URL: </label>
						<input
							className='input-box'
							type='domain'
							placeholder='api.example.com'
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
										updateHeader(
											index,
											'key',
											e.target.value,
										)
									}
								/>
								<input
									className='input-box'
									type='text'
									placeholder='Header Value'
									value={header.value}
									onChange={e =>
										updateHeader(
											index,
											'value',
											e.target.value,
										)
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
		</>
	);
}

export default RequestBuilder;
