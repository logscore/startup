import GithubStars from '../GitHubStars';

function Footer() {
	return (
		<footer
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '1rem',
			}}
		>
			Author: Logan Reeder || Copyleft: Demodel Corp.
			<GithubStars />
		</footer>
	);
}

export default Footer;
