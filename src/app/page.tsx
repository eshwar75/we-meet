// import Chat from '@/clientComponents/Chat';
'use client';
import { useContext, useEffect } from 'react';
import { SocketContext } from './context';
import styles from './page.module.css';

export default function Home() {
	const { socketConnection } = useContext(SocketContext);
	useEffect(() => {
		socketConnection?.on('connect', () => {
			console.log(socketConnection?.id, 'idddddddddddddddd');
		});
	}, [socketConnection]);
	return (
		<div className={styles.page}>
			<p>Hello this is testing dashboard</p>
			{/* <Chat /> */}
		</div>
	);
}
