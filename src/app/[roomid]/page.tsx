'use client';
import React, { useEffect, useState } from 'react';
import { useMediaPermission, usePeer } from '../hook';
import { LiveStreamPlayer } from '@/components';

function Room() {
	const [userId, setUserId] = useState<boolean>(false);
	const { userPeerId } = usePeer();
	console.log(
		userPeerId,
		'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrgggggggggggggggggnnnnnnnnn'
	);

	const { mediaDevicePermission } = useMediaPermission();
	console.log(mediaDevicePermission, 'mediaDevicePermissionnnnnnnnnnnnnn');

	useEffect(() => {
		if (userPeerId) {
			setUserId(true);
		}
	}, [userPeerId]);

	return (
		<div>
			{/* {userPeerId && ( */}
			{/* {userId && ( */}
			<LiveStreamPlayer
				// ownerClientId={userPeerId || ''}
				url={mediaDevicePermission}
				muted
				playing
			/>
			{/* )} */}
			{/* )} */}
		</div>
	);
}

export default Room;
