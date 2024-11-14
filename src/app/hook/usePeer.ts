import { useEffect, useState } from 'react';
import Peer from 'peerjs';

export function usePeer() {
	const [userPeerId, setUserPeerId] = useState<string>('');
	const peer = new Peer();

	useEffect(() => {
		peer?.on('open', (id: string) => {
			setUserPeerId(id);
		});
	}, []);

	return { userPeerId };
}
