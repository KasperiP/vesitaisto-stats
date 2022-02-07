import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getSeason } from '../../utils/getSeason';
import styles from './Navbar.module.css';

const Navbar = () => {
	const [copied, setCopied] = useState<boolean>(false);

	const handleCopy = () => {
		navigator.clipboard.writeText('motimaa.net');
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};

	return (
		<nav className={styles.navbar}>
			<Link href="/" passHref>
				<div>
					<Image
						src="/statistics.svg"
						alt="Statistics logo"
						height={50}
						width={50}
					/>
					<h1>Vesitaisto · kausi {getSeason()}</h1>
				</div>
			</Link>
			<div>
				<button onClick={handleCopy}>
					{copied ? 'Kopioitu!' : 'IP: motimaa.net'}
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
