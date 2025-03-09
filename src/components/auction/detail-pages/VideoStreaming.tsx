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
import { getStreamByLotId } from "../../Services/Methods";

const apiKey = "k532vzf4a7cx";
const user_id = "4"; // Unique client user ID
const user = { id: user_id, name: "client" };

export default function ClientVideoStream({ lotId }: { lotId: string }) {
    const [client, setClient] = useState<StreamVideoClient | null>(null);
    const [call, setCall] = useState<Call | null>(null);
    const [callId, setCallId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchLotDetails = async () => {
            try {
                const response = await getStreamByLotId(lotId);
                if (response.data.length) {
                    const latestLiveStream = response.data[response.data.length - 1];
                    setCallId(latestLiveStream.CallId);
                    setToken(latestLiveStream.Token);
                }
            } catch (error) {
                console.error("Error fetching live stream details:", error);
            }
        };

        if (lotId) fetchLotDetails();
    }, [lotId]);

    useEffect(() => {
        if (!token || !callId) return;

        const myClient = new StreamVideoClient({ apiKey, user, token });
        setClient(myClient);

        return () => {
            myClient.disconnectUser();
            setClient(null);
        };
    }, [token, callId]);

    useEffect(() => {
        if (!client || !callId) return;

        const myCall = client.call("default", callId);
        myCall.join().catch((err) => {
            console.error("Failed to join the call", err);
        });

        setCall(myCall);

        return () => {
            myCall.leave().catch((err) => {
                console.error("Failed to leave the call", err);
            });
            setCall(null);
        };
    }, [client, callId]);

    if (!token || !callId) return <h1>This call hasn't started yet</h1>;
    if (!client || !call) return <h1>Loading...</h1>;

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

const VideoLayout = () => {
    const { useParticipants } = useCallStateHooks();
    const participants = useParticipants();
    const adminParticipant = participants.find(p => p.userId === "4");

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
                <h1>Waiting for the host...</h1>
            )}
        </div>
    );
};