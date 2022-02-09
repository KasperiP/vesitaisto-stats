import mongoose from 'mongoose';

const DATABASE_URL = process.env.DATABASE_URL;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
	cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
	if (!DATABASE_URL) {
		throw new Error(
			'Please define the MONGODB_URI environment variable inside .env.local'
		);
	}

	if (cached.conn) {
		console.log('Cached connection found');
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		};

		console.log('Connecting to MongoDB');
		cached.promise = mongoose
			.connect(DATABASE_URL, opts)
			.then((mongoose) => {
				return mongoose;
			});
	}
	cached.conn = await cached.promise;
	return cached.conn;
}

export default dbConnect;
