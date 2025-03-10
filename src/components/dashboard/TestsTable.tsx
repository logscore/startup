import { useEffect, useState } from 'react';
import RequestExplorer from './RequestExplorer';

// ! The tests table will be have a websocket that will listen to updates from a specific collection in the db and refresh when updated.

function methodColor(value: string) {
	switch (value) {
		case 'GET':
			return '2px solid #28A745';
		case 'POST':
			return '2px solid #255fbc';
		case 'PUT':
			return '2px solid #ca9100';
		case 'DELETE':
			return '2px solid #d90a0a';
	}
}

function statusCodeColor(value: string) {
	switch (value) {
		case '2':
			return ' #28A745';
		case '3':
			return ' #ffd700';
		case '4':
			return ' #d90a0a';
		case '5':
			return '#558ce5';
		default:
			return ' #ffffff';
	}
}

function TestsExplorer() {
	const [rows, setRows] = useState<
		{
			url: string;
			endpoint: string;
			method: string;
			headers: { key: string; value: string }[];
			body: string;
			responseCode: string;
			curlRequest: string;
			curlResponse: string;
		}[]
	>([]);
	const [selectedTest, setSelectedTest] = useState<number | undefined>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('http://localhost:4000/req', {
					method: 'GET',
				});
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const responseJSON = await response.json();
				setRows(responseJSON);
			} catch (error) {
				console.error('Fetch error:', error);
			}
		};

		fetchData();
	}, []);

	return (
		<>
			<div className='routes'>
				<div className='table'>
					{rows ? (
						rows.map((row, index) => {
							return (
								<div
									className='row'
									key={index}
									onClick={() => {
										setSelectedTest(index);
									}}
								>
									<div className='grouped-cells'>
										<div className='cell'>
											<div
												style={{
													border: methodColor(
														row.method,
													),
												}}
												className='row-method'
											>
												{row.method}
											</div>
										</div>
										<div className='cell'>
											<p>{row.url}</p>
										</div>
									</div>
									<div className='cell'>
										<div
											className='response-code'
											style={{
												backgroundColor:
													statusCodeColor(
														row.responseCode[0],
													),
											}}
										>
											{row.responseCode}
										</div>
									</div>
								</div>
							);
						})
					) : (
						<p style={{ margin: '1rem' }}>
							No tests to explore! Begin by sending your first
							endpoint request!
						</p>
					)}
				</div>
				<RequestExplorer data={{ selectedTest, rows }} />
			</div>
		</>
	);
}

export default TestsExplorer;
