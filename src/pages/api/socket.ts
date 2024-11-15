/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from 'socket.io';

const SocketHandler = (req: any, res: any) => {
	console.log('socket handler entried');
	if (res.socket.server.io) {
		console.log('handler socket.io already initialized');
	} else {
		const io = new Server(res.socket.server);
		res.socket.server.io = io;

		io.on('connection', (socket: any) => {
			console.log('handler socket.io server is connected');
			socket?.on('join-room', (roomId: any, userId: any) => {
				console.log(`a new member ${userId} joined room${roomId}`);
				socket?.join(roomId);
				socket?.broadcast.to(roomId).emit('user-connected', userId);
			});
		});
	}
	console.log('handler socket.io initialized');
	res.end();
};

export default SocketHandler;
