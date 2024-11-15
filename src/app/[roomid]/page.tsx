/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useContext, useEffect } from 'react';
import {
	// useAppDispatch,
	// useAppSelector,
	useMediaPermission,
	usePeer,
} from '../hook';
import { LiveStreamPlayer } from '@/components';
import { SocketContext } from '../context';
import { usePlayers } from '../hook/usePlayers';

function Room() {
	const { socketConnection } = useContext(SocketContext);
	const { peer, userPeerId } = usePeer();
	const { mediaDevicePermission } = useMediaPermission();
	const { players, setPlayers } = usePlayers();

	useEffect(() => {
		if (!peer || !mediaDevicePermission) {
			return;
		} else {
			peer?.on('call', (call: any) => {
				const { peer: callerId } = call;
				call?.answer(mediaDevicePermission);
				call.on('stream', (incomeStrem: any) => {
					console.log(`incoming mediaDevicePermission from ${callerId}`);
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
	}, [peer, mediaDevicePermission]);

	useEffect(() => {
		if (!peer || !mediaDevicePermission || !socketConnection) return;
		socketConnection.on('user-connected', handleClientConnected);
		return () => {
			socketConnection.off('user-connected', handleClientConnected);
		};
	}, [peer, mediaDevicePermission, socketConnection]);

	const handleClientConnected = (newClient: string) => {
		console.log(
			`newClienttttttttttttttttttt: ${newClient}, ${mediaDevicePermission} ${peer}`
		);
		const call = peer?.call(newClient, mediaDevicePermission);
		call.on('stream', (incomeStrem: any) => {
			console.log(`incoming mediaDevicePermission from ${newClient}`);
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

	useEffect(() => {
		if (!peer || !mediaDevicePermission) {
			return;
		} else if (
			peer &&
			mediaDevicePermission &&
			userPeerId &&
			Array.isArray(players) &&
			players.length === 0
		) {
			setPlayers((prev: any) => ({
				...prev,
				[userPeerId]: {
					url: mediaDevicePermission,
					muted: false,
					palyerId: true,
				},
			}));
		}
	}, [peer, setPlayers, mediaDevicePermission]);

	// console.log(
	// 	peer,
	// 	setPlayers,
	// 	mediaDevicePermission,
	// 	'pppppppppppppppppppppppppppppppppppppppp'
	// );

	console.log(players, 'playerssssssssssssssssss', userPeerId);

	return (
		<div>
			{Object.keys(players).map((player: string) => {
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
	);
}

export default Room;

{
	/* <LiveStreamPlayer
ownerClientId={userPeerId}
url={mediaDevicePermission}
muted
playing
/> */
}
