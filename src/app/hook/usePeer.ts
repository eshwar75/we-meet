import { useContext, useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { SocketContext } from '../context';
import { useParams } from 'next/navigation';

export function usePeer() {
	const { socketConnection } = useContext(SocketContext);
	const params = useParams();
	const [userPeerId, setUserPeerId] = useState<string>('');
	const peer = new Peer();
	const isStreamRef = useRef(false);

	useEffect(() => {
		if (isStreamRef.current || !params?.roomid || !socketConnection) {
			return;
		} else {
			isStreamRef.current = true;
			peerGenerateId();
		}
	}, [params, socketConnection]);

	const peerGenerateId = async () => {
		return await peer?.on('open', (peerId: string) => {
			setUserPeerId(peerId);
			socketConnection?.emit('join-room', params?.roomid, peerId);
		});
	};

	return { peer, peerGenerateId, userPeerId };
}
