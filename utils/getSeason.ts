export const getSeason = () => {
	const months = [
		'tammi',
		'helmi',
		'maalis',
		'huhti',
		'touko',
		'kesä',
		'heinä',
		'elo',
		'syys',
		'loka',
		'marras',
	];
	const month = new Date().getMonth();
	const year = new Date().getFullYear().toString().slice(-2);
	return `${months[month]}kuu${year}`;
};
