import type { Metadata } from 'next';
// import localFont from 'next/font/local';
import './globals.css';
import { SocketContextProvider } from './context';
// import { Provider } from 'react-redux';
// import {Provider}
// import { Provider } from '';

// const geistSans = localFont({
// 	src: './fonts/GeistVF.woff',
// 	variable: '--font-geist-sans',
// 	weight: '100 900',
// });
// const geistMono = localFont({
// 	src: './fonts/GeistMonoVF.woff',
// 	variable: '--font-geist-mono',
// 	weight: '100 900',
// });

export const metadata: Metadata = {
	title: 'We-meet',
	description: 'Happy meeting',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<script
					src="https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js"
					async
				></script>
			</head>
			<body>
				<SocketContextProvider>{children}</SocketContextProvider>
			</body>
		</html>
	);
}
