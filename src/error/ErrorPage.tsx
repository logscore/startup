import '/styles/ErrorPage.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const timestamp = new Date().toLocaleString();

    const navigate = useNavigate();

    // Shoutout to freeCodeCamp for this little effect here...
    useEffect(() => {
        const handleEnter = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                navigate('/');
            }
        };

        document.addEventListener('keydown', handleEnter);

        return () => {
            document.removeEventListener('keydown', handleEnter);
        };
    }, [navigate]);

    return (
        <div className='neofetch-container'>
            <div className='neofetch-content'>
                <div className='neofetch-wrapper'>
                    {/* <div className='ascii-art'>
                        {`
⠛⢉⣤⠶⠴⣤⣄⠀⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⢠⣿⠁⠀⠀⠀⣿⡄⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⠈⢿⠧⢀⠈⣠⡿⠃⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣀⣠⣀⠂⢸⡏⠠⢼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠛⠛⠋⢙⣿
⣿⣿⣿⠇⠸⠇⠐⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠟⠛⠛⠛⠛⠙⠛⠛⠻⠿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢁⣴⠞⠛⠘⢷⣆⢨
⣿⣿⣿⠈⢰⣿⡆⠈⣿⣿⣿⣿⡿⠟⠋⠁⠀⣀⣉⣡⡤⠔⠒⠒⠢⠂⠀⠀⠀⠀⠄⢤⡙⠻⢿⣿⣿⣿⣿⣿⣿⡗⠺⣿⠀⠁⠠⢀⣿⠆
⣿⣿⣿⣬⣤⣈⣠⣀⣿⣿⠛⠁⠀⣈⣤⣾⣿⠟⠋⠁⣀⣤⣤⣀⣤⣶⣶⣶⣦⣴⣦⣤⣈⠑⠌⠹⢿⣿⣿⣿⣿⣿⣶⡀⢐⣠⣤⡾⠟⢠
⣿⣿⣿⣿⣿⣿⣿⣿⠛⠁⢀⣴⣿⣿⣿⠏⠁⣀⣴⣿⣿⣿⣿⣿⣿⣿⣽⣿⣿⣦⠙⣿⣿⣿⣦⡑⢀⠻⣿⣿⣿⣿⠛⠁⣾⠋⡁⢀⣠⣿
⣿⣿⣿⣿⣿⣿⡿⠃⠈⣰⣿⣛⣷⡿⠁⢀⣴⣿⣿⣿⣿⡇⢼⣿⣷⣿⢿⣿⣟⣿⣇⠸⣿⣿⣿⣿⡄⠡⡘⢿⣿⡇⢈⣤⡉⠀⢤⣿⣿⣿
⣿⣿⣿⣿⣿⡿⠁⠌⣰⣿⡿⣽⡿⠀⢠⣿⡿⢻⣿⣿⡿⠀⣿⣿⣿⡏⣸⣿⣯⣿⣿⠀⢿⣿⣿⡌⢿⣆⠰⠈⣿⡥⠈⠿⠛⢀⣾⣿⣿⣿
⣿⣿⣿⣿⣿⡇⠀⢠⣿⡷⣿⣿⠃⢠⣿⣿⠸⣿⣏⣥⡤⢐⣾⣯⣿⡇⣹⣿⣷⣿⣿⡆⢰⣮⣿⣷⠈⣿⡆⠠⢸⣿⣶⣶⣾⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⠀⠀⣼⣿⡽⣿⡟⠀⣾⣿⣯⠀⣿⣿⣿⠁⢸⣿⣯⣿⠆⣹⣼⣷⣿⡟⢡⠈⣿⣿⣿⡀⢿⣷⠀⠀⣻⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⡿⠀⠀⣿⢿⣽⣻⠇⢀⣿⣿⡷⠀⣿⣿⣿⠀⠨⣿⡿⣿⠂⢹⣾⣿⣿⡏⠰⠀⢼⣿⣿⡇⢸⣿⠄⠂⠘⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⡇⢰⠠⣿⣟⡾⣝⡇⢰⣿⣾⡷⠈⣿⣿⣯⠀⠀⣿⣿⣿⠀⢸⠉⣿⣿⡇⠘⠠⠸⣿⣿⠀⢸⡟⢣⠘⡀⢿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⠇⠈⠰⣿⠈⣤⣿⠀⢸⣿⣿⡷⠀⠿⠟⠋⠀⠀⠄⠛⢋⠀⠘⢀⠛⡙⠁⠈⠀⠀⠉⠉⠀⢸⣷⠀⢆⠐⠸⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⠂⠂⣼⡏⢰⣾⠇⠀⢸⣿⢿⣟⠀⠀⠀⠀⠀⠀⠀⠲⣾⣿⣿⣿⣿⣿⠆⠀⠀⠈⠓⢂⡀⢸⣿⠆⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⠃⠀⢠⣿⠁⣼⡿⠁⠀⠀⣿⢾⣿⠀⣿⡄⠀⠀⠁⠀⠀⣿⣿⣿⣻⣿⣿⡇⠀⠀⠀⠀⣸⠀⣿⠈⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⠀⠆⣿⡏⠀⣿⡗⠠⢀⠂⢹⣿⢿⡀⢿⣷⣄⣁⠂⣠⣼⣿⣿⣿⣿⢾⣿⣿⣦⣤⣴⣾⢧⠈⣿⡀⠀⠂⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⠀⠀⣿⡇⢀⢿⣷⢀⠈⡇⢸⡄⢻⡅⢺⣯⡻⡟⣿⡿⣿⣷⣿⣷⣿⣿⣷⣿⣻⡽⣽⢮⣿⠀⣹⠄⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⠀⠂⢹⣧⠀⠈⢿⡎⣄⠙⠠⣇⠸⣃⠸⣷⣻⣟⣷⣿⢿⣻⣿⣻⣿⣻⡿⣾⣟⣿⣿⠿⠋⢠⣞⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣷⡌⠆⠹⢆⠉⡴⢫⡜⡣⠄⠱⠀⡿⡀⠻⠿⣿⣾⣿⣿⣿⣿⣿⢻⣿⣿⠿⠟⠛⢉⠀⢰⡻⠈⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⡆⠐⡄⠐⠈⠓⠼⡁⢜⡀⠡⠘⡥⠀⣤⣄⣀⡉⠉⠉⠉⠉⠁⡀⠤⣄⠒⠬⠉⠀⢸⡱⠀⠀⠀⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣧⡄⠀⠓⠀⠀⠀⠀⠁⢀⠐⡀⠰⠀⢳⣎⡳⣹⢹⠳⠖⣌⣦⡈⠁⠀⠄⡀⠀⠁⠦⡁⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⢗⡭⠆⠀⠀⠀⠀⢀⡼⠂⠀⢀⠀⠡⠈⣐⣉⢃⠋⠛⠛⠛⠛⣁⠀⠀⠀⢀⠐⠀⠃⠀⠀⢁⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⠿⢿⡟⢁⡀⠐⠀⠀⠘⠇⠀⠐⠀⣾⣿⣶⣶⣿⡿⠿⠿⠿⠟⠿⣿⣿⣦⡀⠉⠠⠀⠀⠁⠉⠠⠾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
`}
                    </div> */}
                    <img
                        src='/assets/kanna-confused.png'
                        style={{ width: '400px', height: '400px' }}
                    ></img>

                    <div className='info-section'>
                        <div className='header'>
                            <span>404 Not Found</span>
                        </div>

                        <div className='info-grid'>
                            <div className='label'>OS</div>
                            <div>Web Browser v404</div>

                            <div className='label'>Host</div>
                            <div>lost-in-space</div>

                            <div className='label'>Kernel</div>
                            <div>1.18.3.8-arch-btw</div>

                            <div className='label'>Uptime</div>
                            <div>0 seconds</div>

                            <div className='label'>Packages</div>
                            <div>404 missing</div>

                            <div className='label'>Shell</div>
                            <div>404.sh</div>

                            <div className='label'>Resolution</div>
                            <div>
                                ${window.screen.width}x${window.screen.height}
                            </div>

                            <div className='label'>Error Type</div>
                            <div>Cosmic Bit Flip</div>

                            <div className='label'>Last Seen</div>
                            <div>{timestamp}</div>

                            <div className='label'>Location</div>
                            <div>{window.location.pathname}</div>
                        </div>

                        <div className='message'>
                            <p>
                                Kanna couldn't find the page you're looking for.
                                I hear going back and trying again works
                                sometimes. ¯\_(ツ)_/¯
                            </p>
                            <div className='return-line'>
                                <button
                                    onClick={() => navigate(-1)}
                                    className='error-link'
                                >
                                    $ cd ..
                                    <span className='cursor'></span>
                                </button>

                                <p className='return'>{`<--Return`}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
