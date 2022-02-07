import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import useSWR from 'swr';
import LargeTable from '../components/LargeTable/LargeTable';
import Navbar from '../components/Navbar/Navbar';
import { StatsResponse } from '../types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Killstreak: NextPage = () => {
	const [current, setCurrent] = useState<number>(1);

	const { data, error } = useSWR<StatsResponse, boolean>(
		`/api/stats/?page=${current}&sortBy=killstreakrecord&limit=10&sortOrder=desc`,
		fetcher
	);

	return (
		<>
			<Head>
				<title>Vesitaisto - tappoputki</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
			</Head>
			<Navbar />
			<LargeTable
				name="Tappoputki"
				sortBy="killstreakrecord"
				current={current}
				setCurrent={setCurrent}
				data={data}
				error={error}
			/>
		</>
	);
};

export default Killstreak;
