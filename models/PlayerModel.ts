import mongoose from 'mongoose';

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
		required: true,
	},
});

export default mongoose.models.pelaajat ||
	mongoose.model('pelaajat', PlayerSchema, 'pelaajat');
