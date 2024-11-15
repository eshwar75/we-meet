/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { SocketContext } from '../context';
import { useParams } from 'next/navigation';

export function usePeer() {
	// params
	const params = useParams();
	// context
	const { socketConnection } = useContext(SocketContext);
	// state's
	const [userPeerId, setUserPeerId] = useState<string>('');
	const [stream, setStream] = useState<any>(null);
	const isPeerRef = useRef(false);
	const isStreamRef = useRef(false);

	const peer = new Peer();

	// useEffect's
	useEffect(() => {
		if (!isStreamRef.current) {
			if (typeof Window !== undefined) {
				mediaPermission();
				isStreamRef.current = true;
			}
		}
	}, []);

	useEffect(() => {
		if (!isPeerRef.current && params?.roomid && socketConnection) {
			isPeerRef.current = true;
			peerGenerateId();
		}
	}, [params, socketConnection]);

	const mediaPermission = async () => {
		try {
			const devicePermission = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: true,
			});
			setStream(devicePermission);
		} catch (error: any) {
			console.log(`Device media permission ${error}`);
		}
	};

	const peerGenerateId = async () => {
		return await peer?.on('open', (peerId: string) => {
			setUserPeerId(peerId);
			socketConnection?.emit('join-room', params?.roomid, peerId);
		});
	};

	return { peer, peerGenerateId, userPeerId, stream };
}
