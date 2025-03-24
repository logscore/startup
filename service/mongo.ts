import bcrypt from 'bcrypt';
import { v6 as uuid } from 'uuid';

import { MongoClient, WithId } from 'mongodb';
const uri =
	'mongodb+srv://cs260_user:laID0Is39FpJQSOj@cs260.jgb0x.mongodb.net/?retryWrites=true&w=majority&appName=cs260';

interface RequestItem {
	url: string;
	endpoint: string;
	method: string;
	headers: { key: string; value: string }[];
	body: string;
	responseCode: string;
	curlRequest: string;
	curlResponse: string;
}

const mongo = new MongoClient(uri);

export async function ping() {
	try {
		await mongo.connect();
		await mongo.db('admin').command({ ping: 1 });
		console.log('Pinged your deployment. You successfully connected to MongoDB.');
	} catch (error) {
		console.error('An error occured when pinging DB:', error);
	}
}

export async function insertItem(item: RequestItem): Promise<void> {
	const client = new MongoClient(uri);
	try {
		await client.connect();
		const db = client.db('cs260');
		await db.collection('curl').insertOne(item);
	} catch (error) {
		console.error('An error occurred when inserting your test:', error);
	} finally {
		await client.close();
	}
}

export async function getItems(): Promise<WithId<Document>[]> {
	const client = new MongoClient(uri);
	try {
		await client.connect();
		const db = client.db('cs260');
		const result = await db.collection('curl').find().sort({ _id: -1 }).limit(10).toArray();
		return result as WithId<Document>[];
	} catch (error) {
		console.error('An error occurred when fetching items:', error);
		return [];
	} finally {
		await client.close();
	}
}

export async function findUser(email: string, password: string) {
	if (!email || !password) return null;

	try {
		await mongo.connect();
		const db = mongo.db('cs260');
		const usersCollection = db.collection('users');

		const user = await usersCollection.findOne({ email });
		if (!user) {
			console.log('Email not found');
			return null;
		}

		return { email: user.email, password: user.password };
	} catch (error) {
		console.error('Error finding user:', error);
		return null;
	} finally {
		await mongo.close();
	}
}

interface User {
	email: string;
	password: string;
	token: string;
}

export async function createUser(email: string, password: string): Promise<{ token: string } | null> {
	if (!email || !password) return null;

	const passwordHash: string = await bcrypt.hash(password, 10);

	const user: User = {
		email: email,
		password: passwordHash,
		token: uuid(),
	};

	try {
		await mongo.connect();
		const db = mongo.db('cs260');
		const usersCollection = db.collection<User>('users');

		const result = await usersCollection.insertOne(user);

		if (!result.acknowledged) {
			console.error('User insertion failed');
			return null;
		}

		return { token: user.token };
	} catch (error) {
		console.error('Error creating user:', error);
		return null;
	} finally {
		await mongo.close();
	}
}
