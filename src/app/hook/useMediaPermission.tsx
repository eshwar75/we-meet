/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';

export function useMediaPermission() {
	const [mediaDevicePermission, setMediaDevicePermission] = useState<any>(null);
	const isStreamRef = useRef(false);

	useEffect(() => {
		if (isStreamRef.current) return;
		isStreamRef.current = true;
		if (typeof Window !== undefined) {
			mediaPermission();
		}
		// (async function initstream() {
		// 	try {
		// 		const devicePermission = await navigator.mediaDevices.getUserMedia({
		// 			audio: true,
		// 			video: true,
		// 		});
		// 		console.log('media permission of devices');
		// 		setMediaDevicePermission(devicePermission);
		// 	} catch (error: any) {
		// 		console.log(`Device media permission ${error}`);
		// 	}
		// })();
	}, []);

	const mediaPermission = async () => {
		try {
			const devicePermission = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: true,
			});
			console.log('media permission of devices', devicePermission);
			setMediaDevicePermission(devicePermission);
		} catch (error: any) {
			console.log(`Device media permission ${error}`);
		}
	};
	return { mediaDevicePermission };
}
