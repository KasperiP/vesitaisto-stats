export type Player = {
	_id: number;
	uuid: string;
	kills: number;
	deaths: number;
	killstreak: number;
	killstreakrecord: number;
	levelrecord: number;
};

export type StatsResponse = {
	data: Player[];
	pagination: {
		total: number;
		page: number;
		pages: number;
	};
};
