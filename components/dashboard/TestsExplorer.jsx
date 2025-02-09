import React, { useState } from 'react';

function TestsExplorer() {
    const [tab, setTab] = useState(1);

    return (
        <div className='routes'>
            <div className='table'>
                <div className='row'>
                    <div className='grouped-cells'>
                        <div className='cell'>
                            <div
                                style={{
                                    border: '2px solid #28A745',
                                }}
                                className='row-method'
                            >
                                POST
                            </div>
                        </div>
                        <div className='cell'>
                            <p>/pets/456</p>
                        </div>
                    </div>
                    <div className='cell'>
                        <div className='response-code'>400</div>
                    </div>
                </div>

                <div className='row'>
                    <div className='grouped-cells'>
                        <div className='cell'>
                            <div
                                style={{
                                    border: '2px solid #DC3545',
                                }}
                                className='row-method'
                            >
                                DELETE
                            </div>
                        </div>
                        <div className='cell'>
                            <p>/pets/456</p>
                        </div>
                    </div>
                    <div className='cell'>
                        <div className='response-code'>305</div>
                    </div>
                </div>

                <div className='row'>
                    <div className='grouped-cells'>
                        <div className='cell'>
                            <div
                                style={{
                                    border: '2px solid #4897ff',
                                }}
                                className='row-method'
                            >
                                GET
                            </div>
                        </div>
                        <div className='cell'>
                            <p>/food</p>
                        </div>
                    </div>
                    <div className='cell'>
                        <div className='response-code'>200</div>
                    </div>
                </div>
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
                        <pre
                            className='code-placeholder'
                            style={{
                                backgroundColor: '#1a1a1a',
                                padding: '1rem',
                                borderRadius: '4px',
                                border: '1px solid #333',
                                overflowX: 'auto',
                                width: '700px',
                                marginLeft: '8rem',
                            }}
                        >
                            <code>
                                {`curl -X POST "https://api.example.com/v1/users?limit=10&offset=0" \\
    -H "Content-Type: application/json" \\
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \\
    -H "Accept: application/json" \\
    -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "securepassword123"
    }'`}
                            </code>
                        </pre>
                    </div>
                ) : (
                    <div>
                        <pre
                            className='code-placeholder'
                            style={{
                                backgroundColor: '#1a1a1a',
                                padding: '1rem',
                                borderRadius: '4px',
                                border: '1px solid #333',
                                overflowX: 'auto',
                                width: '700px',
                                marginLeft: '8rem',
                            }}
                        >
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
