export type Player = {
	_id: number;
	uuid: string;
	kills: number;
	deaths: number;
	killstreak: number;
	killstreakrecord: number;
	levelrecord: number;
	player_name: string;
};

export type StatsResponse = {
	data: Player[];
	pagination: {
		total: number;
		page: number;
		pages: number;
	};
};
