/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function handler(req: any, res: any) {
	const response = await fetch(
		'https://0.peerjs.com/peerjs/id?ts=17316252571600.7408194463281728&version=1.5.4'
	);
	const data = await response.json(); // Or handle response as needed
	res.status(200).json(data);
}
