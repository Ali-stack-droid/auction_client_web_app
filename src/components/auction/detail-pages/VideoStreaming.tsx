import { useEffect, useState } from "react";
import {
    Call,
    StreamCall,
    StreamTheme,
    StreamVideo,
    SpeakerLayout,
    CallControls,
    StreamVideoClient,
    ParticipantView,
    useCallStateHooks
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const apiKey = "mmhfdzb5evj2";
const user_id = "client-user"; // Unique client user ID
const user = { id: user_id };
const callId = "static-call-id"; // Same static call ID

const tokenProvider = async () => {
    const { token } = await fetch(
        "https://pronto.getstream.io/api/auth/create-token?" +
        new URLSearchParams({
            api_key: apiKey,
            user_id: user_id
        })
    ).then((res) => res.json());
    return token as string;
};

export default function ClientVideoStream() {
    const [client, setClient] = useState<StreamVideoClient>();
    const [call, setCall] = useState<Call>();

    useEffect(() => {
        const myClient = new StreamVideoClient({ apiKey, user, tokenProvider });
        setClient(myClient);

        return () => {
            myClient.disconnectUser();
            setClient(undefined);
        };
    }, []);

    useEffect(() => {
        if (!client) return;
        const myCall = client.call("default", callId);
        myCall.join().catch((err) => {
            console.error(`Failed to join the call`, err);
        });

        setCall(myCall);

        return () => {
            setCall(undefined);
            myCall.leave().catch((err) => {
                console.error(`Failed to leave the call`, err);
            });
        };
    }, [client]);

    if (!client || !call) return (<h1>No Video Exist</h1>);

    return (
        <StreamVideo client={client}>
            <StreamTheme className="my-theme-overrides">
                <StreamCall call={call}>
                    <VideoLayout />
                </StreamCall>
            </StreamTheme>
        </StreamVideo>
    );
}

// Custom layout to show only admin video and connected user count
const VideoLayout = () => {
    const { useParticipants } = useCallStateHooks();
    const participants = useParticipants();

    // Find the admin participant (assuming admin-user is the admin's user ID)
    const adminParticipant = participants.find(p => p.userId === "admin-user");

    return (
        <div className="admin-layout">
            {adminParticipant ? (
                <ParticipantView participant={adminParticipant} />
            ) : (
                <h2>Waiting for Admin to Join...</h2>
            )}
        </div>
    );
};
