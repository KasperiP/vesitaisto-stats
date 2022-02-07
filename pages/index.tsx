import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import Navbar from '../components/Navbar/Navbar';
import styles from '../styles/Index.module.css';
import { Player } from '../types';

type StatsOverviewResponse = {
	kills: Player[];
	deaths: Player[];
	kd: Player[];
	killstreakrecord: Player[];
	levelrecord: Player[];
};
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home: NextPage = () => {
	const { data, error } = useSWR<StatsOverviewResponse, boolean>(
		'/api/overview',
		fetcher
	);

	if (error) return <div>Failed to load</div>;

	type Key = 'kills' | 'deaths' | 'killstreakrecord' | 'kd' | 'levelrecord';

	const renderStats = (key: Key) => {
		if (data) {
			const renderedStats = data[key].map((item, index) => {
				return (
					<div className={styles.listItem} key={item.uuid}>
						<p className={styles.listItemSmall}>#{index + 1}</p>
						<div className={styles.listItemLarge}>
							<Image
								src={`https://cravatar.eu/avatar/${item.uuid}/20.png`}
								width={20}
								height={20}
								alt="Image"
							></Image>
							<p>kassq</p>
						</div>
						<p className={styles.listItemSmall}>
							{key === 'kd'
								? (item.kills / item.deaths)
										.toFixed(2)
										.replace(/[.,]00$/, '')
								: item[key]}
						</p>
					</div>
				);
			});
			return renderedStats;
		} else {
			const renderedStats = Array.from({ length: 10 }, (_, k) => (
				<div className={styles.listItem} key={k}>
					<div className={styles.loading} />
					<div className={styles.loading} />
					<div className={styles.loading} />
				</div>
			));
			return renderedStats;
		}
	};

	return (
		<>
			<Navbar />
			<div className={styles.gridContainer}>
				<div className={styles.gridItem}>
					<h2>Tapot</h2>
					<div className={styles.listContainer}>
						<div
							className={`${styles.listItem} ${styles.listItemNav}`}
						>
							<p className={styles.listItemSmall}>Sijoitus</p>
							<p className={styles.listItemLarge}>Pelaaja</p>
							<p className={styles.listItemSmall}>Arvo</p>
						</div>
						{renderStats('kills')}
						<div className={styles.btnContainer}>
							<Link href="/kills">Näytä lisää...</Link>
						</div>
					</div>
				</div>
				<div className={styles.gridItem}>
					<h2>Kuolemat</h2>
					<div className={styles.listContainer}>
						<div
							className={`${styles.listItem} ${styles.listItemNav}`}
						>
							<p className={styles.listItemSmall}>Sijoitus</p>
							<p className={styles.listItemLarge}>Pelaaja</p>
							<p className={styles.listItemSmall}>Arvo</p>
						</div>
						{renderStats('deaths')}
						<div className={styles.btnContainer}>
							<Link href="/deaths">Näytä lisää...</Link>
						</div>
					</div>
				</div>
				<div className={styles.gridItem}>
					<h2>KD</h2>
					<div className={styles.listContainer}>
						<div
							className={`${styles.listItem} ${styles.listItemNav}`}
						>
							<p className={styles.listItemSmall}>Sijoitus</p>
							<p className={styles.listItemLarge}>Pelaaja</p>
							<p className={styles.listItemSmall}>Arvo</p>
						</div>
						{renderStats('kd')}
						<div className={styles.btnContainer}>
							<Link href="/kd">Näytä lisää...</Link>
						</div>
					</div>
				</div>
				<div className={styles.gridItem}>
					<h2>Tappoputki</h2>
					<div className={styles.listContainer}>
						<div
							className={`${styles.listItem} ${styles.listItemNav}`}
						>
							<p className={styles.listItemSmall}>Sijoitus</p>
							<p className={styles.listItemLarge}>Pelaaja</p>
							<p className={styles.listItemSmall}>Arvo</p>
						</div>
						{renderStats('killstreakrecord')}
						<div className={styles.btnContainer}>
							<Link href="/killstreak">Näytä lisää...</Link>
						</div>
					</div>
				</div>
				<div className={styles.gridItem}>
					<h2>Tasoennätys</h2>
					<div className={styles.listContainer}>
						<div
							className={`${styles.listItem} ${styles.listItemNav}`}
						>
							<p className={styles.listItemSmall}>Sijoitus</p>
							<p className={styles.listItemLarge}>Pelaaja</p>
							<p className={styles.listItemSmall}>Arvo</p>
						</div>
						{renderStats('levelrecord')}
						<div className={styles.btnContainer}>
							<Link href="/levelrecord">Näytä lisää...</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
