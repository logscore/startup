const express = require('express');
const bcrypt = require('bcrypt');
const { v6: uuid } = require('uuid');
const cookieParser = require('cookie-parser');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
// app.use(
// 	cors({
// 		origin: 'https://startup.demodel.click',
// 		methods: ['GET', 'POST', 'PUT', 'DELETE'],
// 		allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
// 		credentials: true,
// 	}),
// );
// app.options('*', cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const port = process.argv.length > 2 ? process.argv[2] : 4000;
const users = [
	{
		email: 'dev@test.com',
		password:
			'$2b$10$KV3tsOHRDv9c3ySNseleUuFbVHX/WApGmjEkGLox81YZtodFxc.WK',
		token: '',
	},
];
const authCookieName = 'token';
const requests = [];

// This is the server health route to see if its busted
app.get('/pulse', (req, res) => {
	res.status(200).send({ msg: 'Still alive, sucker' });
});

app.post('/auth/signup', async (req, res) => {
	const userCheck = await findUser(users, 'email', req.body.email);

	if (!userCheck) {
		const user = await createUser(req.body.email, req.body.password);

		setAuthCookie(res, user.token);
		res.send({ token: user.token });
	} else {
		res.status(401).send({ msg: 'User already exists' });
	}
});

app.post('/auth/login', async (req, res) => {
	const user = await findUser(users, 'email', req.body.email);

	if (user) {
		if (await bcrypt.compare(req.body.password, user.password)) {
			user.token = uuid();
			setAuthCookie(res, user.token);
			res.send({ token: user.token });
		} else {
			res.status(401).send({ msg: 'Invalid password' });
		}
	} else {
		res.status(401).send({ msg: 'User does not exist' });
	}
});

app.post('/curl', (req, res) => {
	const { url, endpoint, method, headers, body } = req.body;
	if (
		url == null ||
		endpoint == null ||
		method == null ||
		headers == null ||
		body == null
	) {
		res.status(400).send(
			'Curl request is invalid. One or more parameters is undefined',
		);
	} else {
		let curlRequest = `curl -s -w "%{http_code}" -X ${method}`;

		if (headers[0].key || headers[0].value) {
			if (headers && Array.isArray(headers)) {
				headers.forEach(header => {
					curlRequest += ` -H "${header.key}: ${header.value}"`;
				});
			}
		}

		if (
			body &&
			(method === 'POST' || method === 'PUT' || method === 'PATCH')
		) {
			curlRequest += ` -d ${JSON.stringify(body)}`;
		}

		curlRequest += ` https://${url}${endpoint}`;

		try {
			exec(curlRequest, (error, stdout, stderr) => {
				if (error) {
					console.error(`exec error: ${error}`);
					return res
						.status(500)
						.send({ error: 'Error running curl command' });
				}

				if (stderr) {
					console.error(`stderr: ${stderr}`);
					return res
						.status(500)
						.send({ error: 'Error in curl execution' });
				}

				const curlResponse = stdout.slice(0, -3);
				const responseCode = stdout.slice(-3);

				requests.push({
					url,
					endpoint,
					method,
					headers,
					body,
					responseCode,
					curlRequest,
					curlResponse,
				});

				res.json({
					response: [curlRequest, curlResponse, responseCode],
				});
			});
		} catch (error) {
			console.error('an error has occurred: ', error);
		}
	}
});

app.get('/req', (req, res) => {
	res.status(200).json(requests);
});

async function createUser(email, password) {
	const passwordHash = await bcrypt.hash(password, 10);

	const user = {
		email: email,
		password: passwordHash,
		token: uuid(),
	};
	users.push(user);

	return user;
}

async function findUser(users, field, value) {
	if (!value) return null;

	return users.find(u => u[field] === value);
}

function setAuthCookie(res, authToken) {
	res.cookie(authCookieName, authToken, {
		secure: true,
		httpOnly: false,
		sameSite: 'strict',
		maxAge: 24 * 60 * 60 * 1000,
	});
}

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
