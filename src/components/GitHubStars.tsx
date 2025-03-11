import { useEffect, useState } from 'react';

export default function GithubStars() {
	const [stars, setStars] = useState(null);

	useEffect(() => {
		fetch('https://api.github.com/repos/logscore/startup')
			.then(response => response.json())
			.then(data => setStars(data.stargazers_count))
			.catch(error =>
				console.error('Error fetching GitHub stars:', error),
			);
	}, []);

	return (
		<a
			href='https://github.com/logscore/startup'
			target='_blank'
			rel='noopener noreferrer'
			style={{ textDecoration: 'none' }}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '8px',
					backgroundColor: ' #1e1e1e',
					color: ' #ffffff',
					padding: '6px 12px',
					borderRadius: '8px',
					cursor: 'pointer',
					border: '1px solid ',
					borderColor: ' #333',
					boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
					transition: 'background-color 0.2s ease',
					fontSize: '16px',
					fontWeight: '500',
				}}
				onMouseEnter={e =>
					(e.currentTarget.style.borderColor = ' #ffd700')
				}
				onMouseLeave={e =>
					(e.currentTarget.style.borderColor = ' #1e1e1e')
				}
			>
				<img
					src='https://www.svgrepo.com/show/493677/github-repo-git-octocat.svg'
					alt='GitHub Logo'
					style={{
						width: '20px',
						height: '20px',
						filter: 'brightness(0) invert(1)',
					}}
				/>
				<span>Star us on GitHub</span>
				{stars !== null && (
					<span
						style={{
							marginLeft: '4px',
							color: '#FFAC33',
							fontWeight: '600',
						}}
					>
						{stars} ⭐
					</span>
				)}
			</div>
		</a>
	);
}
