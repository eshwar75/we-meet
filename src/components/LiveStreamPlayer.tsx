import React from 'react';
import ReactPlayer from 'react-player';

interface LineStreamPlayerProperties {
	url: string;
	muted: boolean;
	playing: boolean;
}

export const LiveStreamPlayer: React.FC<LineStreamPlayerProperties> = ({
	url,
	muted,
	playing,
}) => {
	return (
		<>
			<ReactPlayer url={url} muted={muted} playing={playing} />
		</>
	);
};
