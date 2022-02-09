// pages/_document.js

import { Head, Html, Main, NextScript } from 'next/document';
import { getSeason } from '../utils/getSeason';

export default function Document() {
	return (
		<Html lang="fi">
			<Head>
				{/* Fonts */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="true"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200;300;400;600;700&display=swap"
					rel="stylesheet"
				/>

				{/* SEO */}
				<meta name="theme-color" content="#007bff" />
				<meta charSet="utf-8" />
				<meta name="language" content="finnish" />

				<meta name="author" content="kassq" />
				<meta name="designer" content="kassq" />
				<meta name="publisher" content="kassq" />

				<meta
					name="description"
					content="Suomen suurimman Minecraft-palvelimen Motimaan vestaisto pelimuodon tilastot koottuna kätevästi yhteen paikkaan."
				/>
				<meta
					name="keywords"
					content="motimaa, minecraft, motimaanet"
				/>

				<meta name="robots" content="index, follow" />
				<meta name="subject" content="Minecraft" />

				{/* OpenGraph */}
				<meta
					property="og:site_name"
					content={`Kauden ${getSeason()} tilastot`}
				/>
				<meta property="og:title" content="Motimaa.net - vesitaisto" />
				<meta property="og:type" content="website" />
				<meta
					property="og:url"
					content="https://vesitaisto.motimaa.net"
				/>
				<meta
					property="og:description"
					content="Suomen suurimman Minecraft-palvelimen Motimaan vestaisto pelimuodon tilastot koottuna kätevästi yhteen paikkaan."
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
