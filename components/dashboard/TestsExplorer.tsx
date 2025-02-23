import { useEffect } from 'react';
import { useState } from 'react';

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
            return ' #7d7d7d';
        case '4':
            return ' #d90a0a';
        case '5':
            return '#558ce5';
        default:
            return ' #ffffff';
    }
}

function TestsExplorer() {
    const [tab, setTab] = useState(1);
    const [rows, setRows] = useState<
        {
            url: string;
            endpoint: string;
            method: string;
            headers: { key: string; value: string }[];
            body: string;
            statusCode: string;
        }[]
    >([]);

    //note that this impementation will need to change as it only pulls a single entry from local storage. a better soution is to have an array of json objects with the values and iterate over them when displaying the rows
    useEffect(() => {
        const request: string | null = localStorage.getItem('request');
        const requestJSON = request ? JSON.parse(request) : null;
        // console.log(requestJSON);

        setRows(requestJSON);
    }, []);

    return (
        <div className='routes'>
            <div className='table'>
                {rows ? (
                    rows.map(row => {
                        return (
                            <div className='row'>
                                <div className='grouped-cells'>
                                    <div className='cell'>
                                        <div
                                            style={{
                                                border: methodColor(row.method),
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
                                            backgroundColor: statusCodeColor(
                                                row.statusCode[0],
                                            ),
                                        }}
                                    >
                                        {row.statusCode}
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

            <div className='request-explorer'>
                <div className='request-explorer-header'>
                    <div className='explorer-buttons'>
                        <button
                            className={
                                tab === 1
                                    ? 'custom-button explorer-button-active'
                                    : 'custom-button explorer-button-inactive'
                            }
                            onClick={() => setTab(1)}
                        >
                            Request
                        </button>
                        <button
                            className={
                                tab === 2
                                    ? 'custom-button explorer-button-active'
                                    : 'custom-button explorer-button-inactive'
                            }
                            onClick={() => setTab(2)}
                        >
                            Response
                        </button>
                    </div>
                </div>
                {tab === 1 ? (
                    <div className='request-explorer-body'>
                        <pre className='code-placeholder'>
                            <code>
                                {`curl -X POST "https://api.example.com/v1/users?limit=10&offset=0" \\
    -H "Content-Type: application/json" \\
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \\
    -H "Accept: application/json" \\
    -d '{
        "name": "John Doe",
        "email": "john.doe@example.com",
        "password": "securepassword123"
    }`}
                            </code>
                        </pre>
                    </div>
                ) : (
                    <div className='request-explorer-body'>
                        <pre className='code-placeholder'>
                            <code>
                                {`{
  "status": "success",
  "code": 200,
  "data": {
    "id": "12345",
    "createdAt": "2024-02-07T15:30:22Z",
    "user": {
      "id": "usr_789",
      "name": "John Smith",
      "email": "john.smith@example.com"
    },
    "order": {
      "orderId": "ord_456",
      "items": [
        {
          "id": "item_001",
          "name": "Blue Widget",
          "quantity": 2,
          "price": 29.99
        },
        {
          "id": "item_002",
          "name": "Red Gadget",
          "quantity": 1,
          "price": 49.99
        }
      ],
      "totalAmount": 109.97,
      "currency": "USD"
    },
    "metadata": {
      "source": "web",
      "ipAddress": "192.168.1.1",
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }
  }
}`}
                            </code>
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TestsExplorer;
