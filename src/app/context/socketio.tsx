/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

type contextProps = {
	socketConnection: any;
};

export const SocketContext = createContext<Partial<contextProps>>({});

interface SocketContextProviderProperties {
	children: React.ReactNode;
}

export const SocketContextProvider: React.FC<
	SocketContextProviderProperties
> = ({ children }) => {
	const [socketConnection, setSocketConnection] = useState<any>(null);
	// console.log(socketConnection, 'useEffect socketConnection');

	useEffect(() => {
		const connection = io();
		console.log(`socket connection ${connection}`);
		setSocketConnection(connection);
	}, []);

	socketConnection?.on('connect_error', async (error: any) => {
		console.log('Error socket with server', error);
		await fetch('/api/socket');
	});

	return (
		<SocketContext.Provider value={{ socketConnection }}>
			{children}
		</SocketContext.Provider>
	);
};
