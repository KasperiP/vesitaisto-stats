import mongoose from 'mongoose';

const { DATABASE_URL } = process.env;

export const connect = async () => {
	const conn = await mongoose
		.connect(DATABASE_URL as string)
		.catch((err) => console.log(err));
	console.log('Connected to MongoDB');

	const PlayerSchema = new mongoose.Schema({
		uuid: {
			type: String,
			required: true,
		},
		kills: {
			type: Number,
		},
		deaths: {
			type: Number,
		},
		killstreak: {
			type: Number,
		},
		killstreakrecord: {
			type: Number,
		},
		levelrecord: {
			type: Number,
		},
		player_name: {
			type: String,
		},
	});

	const Players =
		mongoose.models.pelaajat ||
		mongoose.model('pelaajat', PlayerSchema, 'pelaajat');

	return { conn, Players };
};
