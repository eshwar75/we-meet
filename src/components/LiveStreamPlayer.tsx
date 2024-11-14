import React from 'react';
import ReactPlayer from 'react-player';

interface LineStreamPlayerProperties {
	ownerClientId?: any;
	url: string;
	muted: boolean;
	playing: boolean;
}

export const LiveStreamPlayer: React.FC<LineStreamPlayerProperties> = ({
	ownerClientId = '',
	url,
	muted,
	playing,
}) => {
	return (
		<>
			<ReactPlayer
				key={ownerClientId}
				url={url}
				muted={muted}
				playing={playing}
			/>
		</>
	);
};
