/* eslint-disable @typescript-eslint/no-explicit-any */
// import Chat from '@/clientComponents/Chat';
'use client';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from './context';
import { Button } from '@/components/button';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { Input } from '@/components';

export default function Home() {
	const router = useRouter();
	const { socketConnection } = useContext(SocketContext);
	const [joinMeetingRoomId, setJoinMeetingRoomId] = useState('');
	const [clientName, setClientName] = useState('');

	useEffect(() => {
		socketConnection?.on('connect', () => {
			console.log(`socketConnection: ${socketConnection?.id}`);
		});
	}, [socketConnection]);

	return (
		<div style={{ margin: '2rem' }}>
			<div className="meetingCard">
				<p className="mainPageTitle">Please Join the meeting</p>
				<div className="joinmeetingactioncontainer">
					{/* <div className="joinmeetingvideo"></div> */}
					<div className="joinmeetingactions">
						<Input
							id="enteryourname"
							placeholder="Enter your name (optional)"
							name="Enteryourname"
							value={clientName}
							onChange={(event: any) =>
								setClientName(event.target.value.trim())
							}
						/>
						<Input
							required={true}
							id="entermeetingid"
							placeholder="Enter meeting id"
							name="Entermeetingid"
							value={joinMeetingRoomId}
							onChange={(event: any) =>
								setJoinMeetingRoomId(event?.target?.value)
							}
						/>
						<Button
							type="button"
							text={'Join Meeting'}
							onClick={() => {
								if (joinMeetingRoomId) {
									router.push(`/${joinMeetingRoomId}`);
								} else {
									alert('Please find a valid meeting room id');
								}
							}}
							buttonWidth={'50%'}
							margin={'10px 0px'}
						/>
						<h5 className="OrTextStyle">OR</h5>
						<Button
							type="button"
							text={'Create Meeting'}
							onClick={() => {
								const roomId = uuidv4();
								router.push(`/${roomId}`);
							}}
							buttonBackgroundColor="var(--button-secondary-background-color)"
							buttonWidth={'50%'}
							margin={'10px 0px'}
						/>
						{/* <Chat /> */}
					</div>
				</div>
			</div>
		</div>
	);
}
