/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useContext, useEffect } from 'react';
import { usePeer } from '../hook';
import { LiveStreamPlayer } from '@/components';
import { SocketContext } from '../context';
import { usePlayers } from '../hook/usePlayers';
import Chat from '@/clientComponents/Chat';

function Room() {
	const { socketConnection } = useContext(SocketContext);
	const { peer, userPeerId, stream } = usePeer();
	const { players, setPlayers } = usePlayers();

	useEffect(() => {
		if (peer && stream) {
			peer?.on('call', (call: any) => {
				const { peer: callerId } = call;
				call?.answer(stream);
				call.on('stream', (incomeStrem: any) => {
					console.log(`incoming stream from ${callerId}`);
					setPlayers((prev: any) => ({
						...prev,
						[callerId]: {
							url: incomeStrem,
							muted: false,
							palyerId: true,
						},
					}));
				});
			});
		}
	}, [peer, stream]);

	useEffect(() => {
		if (peer && stream && socketConnection) {
			const handleClientConnected = (newClient: string) => {
				const call = peer?.call(newClient, stream);
				call.on('stream', (incomeStrem: any) => {
					console.log(`incoming stream from ${newClient}`);
					setPlayers((prev: any) => ({
						...prev,
						[newClient]: {
							url: incomeStrem,
							muted: false,
							palyerId: true,
						},
					}));
				});
			};
			socketConnection.on('user-connected', handleClientConnected);
			return () => {
				socketConnection.off('user-connected', handleClientConnected);
			};
		}
	}, [peer, stream, socketConnection]);

	useEffect(() => {
		if (
			peer &&
			stream &&
			userPeerId &&
			Array.isArray(players) &&
			players.length === 0
		) {
			setPlayers((prev: any) => ({
				...prev,
				[userPeerId]: {
					url: stream,
					muted: false,
					palyerId: true,
				},
			}));
		}
	}, [peer, setPlayers, stream]);

	return (
		<>
			<div className="stream">
				{Object.keys(players).map((player: any) => {
					const { url, muted, palyerId } = players[player];
					return (
						<LiveStreamPlayer
							key={player}
							url={url}
							muted={muted}
							playing={palyerId}
						/>
					);
				})}
			</div>
			<Chat />
		</>
	);
}

export default Room;
