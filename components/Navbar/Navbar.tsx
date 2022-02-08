import { useTheme } from 'next-themes';
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
	const { theme, setTheme } = useTheme();
	const handleThemeChange = () => {
		if (theme === 'light') {
			setTheme('dark');
		} else {
			setTheme('light');
		}
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
				<Link href="https://github.com/KasperiP" passHref>
					<div className={styles.imgContainer}>
						<Image
							src="/github.svg"
							layout="fill"
							objectFit="contain"
							alt="Github logo"
						/>
					</div>
				</Link>
				<span>
					<button onClick={handleThemeChange}>
						Teema: {theme === 'dark' ? 'tumma' : 'vaalea'}
					</button>
					<button onClick={handleCopy}>
						{copied ? 'Kopioitu!' : 'IP: motimaa.net'}
					</button>
				</span>
			</div>
		</nav>
	);
};

export default Navbar;
