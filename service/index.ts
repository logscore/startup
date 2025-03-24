import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { v6 as uuid } from 'uuid';
import cookieParser from 'cookie-parser';
import { exec } from 'child_process';
import cors from 'cors';
import { createUser, findUser, getItems, insertItem, ping } from './mongo';

interface User {
	email: string;
	password: string;
	token: string;
}

interface RequestData {
	url: string;
	endpoint: string;
	method: string;
	headers: Array<{ key: string; value: string }>;
	body: any;
	responseCode?: string;
	curlRequest?: string;
	curlResponse?: string;
}

interface CurlRequestBody {
	url: string;
	endpoint: string;
	method: string;
	headers: Array<{ key: string; value: string }>;
	body: any;
}

const app = express();

const dev = (import.meta as ImportMeta & { env: { VITE_PROD: boolean } }).env.VITE_PROD;

if (!dev) {
	app.use(
		cors({
			origin: 'https://startup.demodel.click',
			methods: ['GET', 'POST', 'PUT', 'DELETE'],
			allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
			credentials: true,
		}),
	);
	app.options('*', cors());
	console.log('Running in production mode with strict CORS');
} else {
	app.use(cors());
	console.log('Running in development mode with permissive CORS');
}

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const port: number = process.argv.length > 2 ? parseInt(process.argv[2]) : 4000;
const users: User[] = [
	{
		email: 'dev@test.com',
		password: '$2b$10$KV3tsOHRDv9c3ySNseleUuFbVHX/WApGmjEkGLox81YZtodFxc.WK',
		token: '',
	},
];
const authCookieName: string = 'token';
const requests: RequestData[] = [];

// This is the server health route to see if its busted
app.get('/pulse', (_req: Request, res: Response) => {
	res.status(200).send({ msg: 'Still alive, sucker' });
});

app.post('/auth/signup', async (req: Request, res: Response) => {
	const userCheck = await findUser(req.body.email, req.body.password);

	if (!userCheck) {
		const user = await createUser(req.body.email, req.body.password);

		if (user) {
			setAuthCookie(res, user.token);
			res.status(201).send({ token: user.token });
		} else {
			res.status(500).send({ msg: 'Failed to create user' });
		}
	} else {
		res.status(401).send({ msg: 'User already exists' });
	}
});

app.post('/auth/login', async (req: Request, res: Response) => {
	const user = await findUser(req.body.email, req.body.password);

	if (user) {
		if (await bcrypt.compare(req.body.password, user.password)) {
			const token = uuid();
			setAuthCookie(res, token);
			res.send({ token: token });
		} else {
			res.status(401).send({ msg: 'Invalid password' });
		}
	} else {
		res.status(401).send({ msg: 'User does not exist' });
	}
});

app.post('/curl', (req: Request, res: Response) => {
	const { url, endpoint, method, headers, body }: CurlRequestBody = req.body;
	if (url == null || endpoint == null || method == null || headers == null || body == null) {
		res.status(400).send('Curl request is invalid. One or more parameters is undefined');
	} else {
		let curlRequest: string = `curl -s -w "%{http_code}" -X ${method}`;

		if (headers[0]?.key || headers[0]?.value) {
			if (headers && Array.isArray(headers)) {
				headers.forEach(header => {
					curlRequest += ` -H "${header.key}: ${header.value}"`;
				});
			}
		}

		if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
			curlRequest += ` -d ${JSON.stringify(body)}`;
		}

		curlRequest += ` https://${url}${endpoint}`;

		try {
			exec(curlRequest, (error, stdout, stderr) => {
				if (error) {
					console.error(`exec error: ${error}`);
					return res.status(500).send({ error: 'Error running curl command' });
				}

				if (stderr) {
					console.error(`stderr: ${stderr}`);
					return res.status(500).send({ error: 'Error in curl execution' });
				}

				const curlResponse: string = stdout.slice(0, -3);
				const responseCode: string = stdout.slice(-3);

				insertItem({
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

app.get('/req', async (_req: Request, res: Response) => {
	try {
		const items = await getItems();
		res.status(200).json(items);
	} catch (error) {
		console.error('Error fetching requests:', error);
		res.status(500).json({ error: 'Failed to retrieve requests' });
	}
});

function setAuthCookie(res: Response, authToken: string): void {
	res.cookie(authCookieName, authToken, {
		secure: true,
		httpOnly: false,
		sameSite: 'strict',
		maxAge: 24 * 60 * 60 * 1000,
	});
}

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
	ping().catch(console.dir);
});
