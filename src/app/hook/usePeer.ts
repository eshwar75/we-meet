import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';

export function usePeer() {
	const [userPeerId, setUserPeerId] = useState<string>('');
	const peer = new Peer();
	const isStreamRef = useRef(false);

	useEffect(() => {
		if (isStreamRef.current) {
			return;
		} else {
			isStreamRef.current = true;
			peerGenerateId();
		}
	}, []);

	const peerGenerateId = async () => {
		await peer?.on('open', (id: string) => {
			setUserPeerId(id);
		});
	};

	return { userPeerId };
}
