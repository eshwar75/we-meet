/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from 'socket.io';

const SocketHandler = (req: any, res: any) => {
	console.log('socket handler entried');
	if (res.socket.server.io) {
		console.log('handler socket.io already initialized');
	} else {
		const io = new Server(res.socket.server);
		res.socket.server.io = io;

		io.on('connection', socket => {
			console.log('handler socket.io server is connected');
		});
	}
	console.log('handler socket.io initialized');
	res.end();
};

export default SocketHandler;

