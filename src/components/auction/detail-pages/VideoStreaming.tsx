import { useEffect, useState } from "react";
import {
    Call,
    StreamCall,
    StreamTheme,
    StreamVideo,
    StreamVideoClient,
    ParticipantView,
    useCallStateHooks
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const apiKey = "mmhfdzb5evj2";
const user_id = "client-user";
const user = { id: user_id };
const callId = "static-call-id";

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

// Accepts a prop `onNoCall` to render alternative content
export default function ClientVideoStream({ onNoCall }: any) {
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

    if (!client || !call) return onNoCall; // Show CardMedia when no call exists

    return (
        <StreamVideo client={client}>
            <StreamTheme className="my-theme-overrides">
                <StreamCall call={call}>
                    <VideoLayout onNoCall={onNoCall} />
                </StreamCall>
            </StreamTheme>
        </StreamVideo>
    );
}

const VideoLayout = ({ onNoCall }: any) => {
    const { useParticipants } = useCallStateHooks();
    const participants = useParticipants();
    const adminParticipant = participants.find(p => p.userId === "admin-user");

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
            maxHeight: '600px',
            overflow: 'hidden',
        }}>
            {adminParticipant ? (
                <>
                    <ParticipantView participant={adminParticipant} />
                    <style>{`.str-video__call-controls__button {display: none !important;} .str-video__participant-details__name {color:white !important}`}</style>
                </>
            ) : (
                onNoCall
            )}
        </div>
    );
};
