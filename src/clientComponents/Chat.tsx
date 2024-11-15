/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { SocketContext } from '@/app/context';
import { Button, Input } from '@/components';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

const Chat = () => {
	const params = useParams();
	const { socketConnection } = useContext(SocketContext);
	const [messageTeam, setMessageTeam] = useState<string>('');
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		socketHitmessage();
	}, []);

	function socketHitmessage() {
		socketConnection?.on('message', (message: any) => {
			console.log('Received message from server:', message);
			setMessages([...messages, message]);
		});
	}

	const sendMessage = () => {
		if (socketConnection && messageTeam) {
			socketConnection?.emit('send-message-room', {
				roomId: params?.roomid,
				message: messageTeam,
			});
			setMessageTeam('');
			socketHitmessage();
		}
	};

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'left',
				flexDirection: 'column',
				padding: '5rem 2rem',
				backgroundColor: 'var(--secondary-background-color)',
			}}
		>
			<p
				style={{
					fontSize: 'var(--24px)',
					textAlign: 'center',
				}}
			>
				Chat
			</p>
			<div>
				{messages.map((msg, index) => (
					<p key={index}>{msg}</p>
				))}
			</div>
			<Input
				placeholder="message..."
				value={messageTeam}
				onChange={(e: any) => setMessageTeam(e.target.value)}
			/>
			<Button
				type="submit"
				onClick={sendMessage}
				text="send"
				buttonWidth={'50%'}
			/>
		</div>
	);
};

export default Chat;
