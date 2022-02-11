import Image from 'next/image';
import Pagination from 'rc-pagination';
import { StatsResponse } from '../../types';
import styles from './LargeTable.module.css';

type Props = {
	name: string;
	sortBy: 'kills' | 'deaths' | 'kd' | 'levelrecord' | 'killstreakrecord';
	current: number;
	setCurrent: (current: number) => void;
	data: StatsResponse | undefined;
	error: boolean | undefined;
};

const LargeTable = ({ name, sortBy, current, setCurrent, data }: Props) => {
	const handleChange = (page: number) => {
		setCurrent(page);
	};

	return (
		<>
			<div className={styles.container}>
				<div>
					<h2>{name}</h2>
					<div className={styles.listContainer}>
						<div
							className={`${styles.listItemTitle} ${styles.listItem}`}
						>
							<p className={styles.listItemSmall}>Sijoitus</p>
							<p className={styles.listItemLarge}>Nimi</p>
							<p className={styles.listItemSmall}>Arvo</p>
						</div>
						{data
							? data.data.map((player, index) => {
									return (
										<div
											className={styles.listItem}
											key={player.uuid}
										>
											<p className={styles.listItemSmall}>
												#
												{index + 1 + (current - 1) * 10}
											</p>
											<div
												className={styles.listItemLarge}
											>
												<Image
													src={`https://cravatar.eu/avatar/${player.uuid}/20.png`}
													width={20}
													height={20}
													alt="Image"
													unoptimized={true}
												></Image>
												<p>{player.player_name}</p>
											</div>

											<p className={styles.listItemSmall}>
												{sortBy === 'kd'
													? (
															player.kills /
															(player.deaths > 1
																? player.deaths
																: 1)
													  )
															.toFixed(2)
															.replace(
																/[.,]00$/,
																''
															)
													: player[sortBy]}
											</p>
										</div>
									);
							  })
							: Array.from({ length: 10 }, (_, k) => (
									<div className={styles.listItem} key={k}>
										<div className={styles.loading} />
										<div className={styles.loading} />
										<div className={styles.loading} />
									</div>
							  ))}
					</div>
				</div>
				{data && (
					<>
						<div className={styles.paginationContainer}>
							<Pagination
								total={data.pagination.total}
								current={current}
								pageSize={10}
								onChange={handleChange}
							/>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default LargeTable;
