import { useState } from 'react';

function RequestExplorer(data: any) {
    const [tab, setTab] = useState(1);

    const selectedTestIndex = data.data.selectedTest;
    const testIndex = selectedTestIndex ? selectedTestIndex : null;
    console.log(testIndex);

    const row = data.data.rows[testIndex];
    const rowData = row ? row : null;
    console.log(rowData);

    return (
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
                        {rowData ? (
                            <code>{rowData.curl}</code>
                        ) : (
                            <p style={{ margin: '0rem' }}>
                                No request available
                            </p>
                        )}
                    </pre>
                </div>
            ) : (
                <div className='request-explorer-body'>
                    <pre className='code-placeholder'>
                        {rowData ? (
                            <code>{rowData.curlResponse}</code>
                        ) : (
                            <p style={{ margin: '0rem' }}>
                                No response available
                            </p>
                        )}
                    </pre>
                </div>
            )}
        </div>
    );
}

export default RequestExplorer;
