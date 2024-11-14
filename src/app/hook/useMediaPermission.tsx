/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';

export function useMediaPermission() {
	const [mediaDevicePermission, setMediaDevicePermission] = useState<any>(null);
	const isStreamRef = useRef(false);

	useEffect(() => {
		if (isStreamRef.current) {
			return;
		} else {
			isStreamRef.current = true;
			// mediaPermission();
			(async () => {
				try {
					const devicePermission = await navigator.mediaDevices.getUserMedia({
						audio: true,
						video: true,
					});
					console.log('media permission of devices');
					setMediaDevicePermission(devicePermission);
				} catch (error: any) {
					console.log(`Device media permission ${error}`);
					const devicePermission = await navigator.mediaDevices.getUserMedia({
						audio: false,
						video: false,
					});
					setMediaDevicePermission(devicePermission);
				}
			})();
		}
	}, []);

	// const mediaPermission = async () => {
	// try {
	// 	const devicePermission = await navigator.mediaDevices.getUserMedia({
	// 		audio: true,
	// 		video: true,
	// 	});
	// 	console.log('media permission of devices');
	// 	setMediaDevicePermission(devicePermission);
	// } catch (error: any) {
	// 	console.log(`Device media permission ${error}`);
	// 	const devicePermission = await navigator.mediaDevices.getUserMedia({
	// 		audio: false,
	// 		video: false,
	// 	});
	// 	setMediaDevicePermission(devicePermission);
	// }
	// };
	return { mediaDevicePermission };
}
