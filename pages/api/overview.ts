// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Player } from '../../types';
import dbConnect from '../../utils/dbConnect';
import Players from '../../models/PlayerModel';

type StatsOverviewResponse = {
	kills: Player[];
	deaths: Player[];
	kd: Player[];
	killstreakrecord: Player[];
	levelrecord: Player[];
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<StatsOverviewResponse>
) {
	await dbConnect();

	const data: Player[] = await Players.find({});

	const topKills = data.sort((a, b) => b.kills - a.kills).slice(0, 10);
	const topDeaths = data.sort((a, b) => b.deaths - a.deaths).slice(0, 10);

	const topKd = data
		.sort((a, b) => {
			const bKd = b.deaths < 1 ? b.kills : b.kills / b.deaths;
			const aKd = a.deaths < 1 ? a.kills : a.kills / a.deaths;
			return bKd - aKd;
		})
		.slice(0, 10);

	const topKillstreakrecord = data
		.sort((a, b) => b.killstreakrecord - a.killstreakrecord)
		.slice(0, 10);

	const topLevelrecord = data
		.sort((a, b) => b.levelrecord - a.levelrecord)
		.slice(0, 10);

	res.setHeader('Cache-Control', 'max-age=0, s-maxage=300');
	res.status(200).send({
		kills: topKills,
		deaths: topDeaths,
		kd: topKd,
		killstreakrecord: topKillstreakrecord,
		levelrecord: topLevelrecord,
	});
}
