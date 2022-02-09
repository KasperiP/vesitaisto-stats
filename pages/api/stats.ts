// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Player, StatsResponse } from '../../types';
import dbConnect from '../../utils/dbConnect';
import Players from '../../models/PlayerModel';

type Error = {
	error: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<StatsResponse | Error>
) {
	let { sortBy, sortOrder, page, limit } = req.query;

	if (
		(sortBy && typeof sortBy !== 'string') ||
		(sortOrder && typeof sortOrder !== 'string') ||
		(page && typeof page !== 'string') ||
		(limit && typeof limit !== 'string')
	) {
		return res.status(400).json({
			error: 'Invalid query parameters',
		});
	}

	// Validate sortBy parameter
	const sortByParams = [
		'kills',
		'deaths',
		'kd',
		'killstreak',
		'killstreakrecord',
		'levelrecord',
	];
	if (sortBy && !sortByParams.includes(sortBy)) {
		return res.status(400).send({
			error: 'Invalid sortBy parameter',
		});
	}
	sortBy = sortBy || 'kills';

	// Validate sortOrder parameter
	const sortOrderParams = ['asc', 'desc'];
	if (sortOrder && !sortOrderParams.includes(sortOrder)) {
		return res.status(400).send({
			error: 'Invalid sortOrder parameter',
		});
	}
	sortOrder = sortOrder || 'desc';

	// Validate page parameter
	if (page && !Number.isInteger(parseInt(page))) {
		return res.status(400).send({
			error: 'Invalid page parameter',
		});
	}
	page = page ? page : '1';

	// Validate limit parameter
	if (limit && !Number.isInteger(parseInt(limit))) {
		return res.status(400).send({
			error: 'Invalid limit parameter',
		});
	}
	limit = limit ? limit : '10';

	// Database connection
	await dbConnect();

	const parsedPage = parseInt(page);
	const parsedLimit = parseInt(limit);

	const skipIndex = (parsedPage - 1) * parsedLimit;
	let askedCollection;
	if (sortBy === 'kd') {
		const playersCollection: Player[] = await Players.find({});
		const sortedByKd = playersCollection.sort((a, b) => {
			const bKd = b.deaths < 1 ? b.kills : b.kills / b.deaths;
			const aKd = a.deaths < 1 ? a.kills : a.kills / a.deaths;
			return bKd - aKd;
		});

		if (sortOrder === 'asc') {
			askedCollection = sortedByKd.slice(
				skipIndex,
				skipIndex + parsedLimit
			);
		} else {
			askedCollection = sortedByKd
				.slice(skipIndex, skipIndex + parsedLimit)
				.reverse();
		}
	} else {
		const playersCollection = await Players.find({})
			.sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
			.skip(skipIndex)
			.limit(parsedLimit);

		askedCollection = playersCollection;
	}
	const totalPlayers = await Players.count();
	const totalPages = Math.ceil(totalPlayers / parsedLimit);
	const currentPage = parseInt(page);

	res.setHeader('Cache-Control', 'max-age=0, s-maxage=300');
	res.status(200).send({
		data: askedCollection,
		pagination: {
			total: totalPlayers,
			page: currentPage,
			pages: totalPages,
		},
	});
}
