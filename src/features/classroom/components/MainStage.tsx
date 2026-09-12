import {useTracks} from "@livekit/components-react";
import {Track, type Participant} from "livekit-client";
import SharedScreenPanel from "./SharedScreenPanel";
import SpeakerSidebar from "./SpeakerSidebar";
import ActiveSpeakerStage from "./ActiveSpeakerStage";
import {useActiveSpeaker} from "../hooks/useActiveSpeaker";

export default function MainStage({participants}: {participants: Participant[]}) {
    const screenShareTracks = useTracks([Track.Source.ScreenShare]);
    const isSharing = screenShareTracks.length > 0;

    const teacher = participants.find((p) => p.metadata?.includes("teacher")) ?? participants[0];
    const activeSpeaker = useActiveSpeaker(teacher);

    if (isSharing) {
        // Original layout: shared content as main view, pinned tiles alongside
        return (
            <div className="flex-1 flex flex-col md:flex-row gap-3 md:gap-4 min-h-0">
                <SharedScreenPanel/>
                <div className="hidden md:flex">
                    <SpeakerSidebar participants={participants}/>
                </div>
            </div>
        );
    }

    // Nothing shared: whoever's talking becomes the main view
    return (
        <div className="flex-1 flex min-h-0">
            {activeSpeaker && <ActiveSpeakerStage participant={activeSpeaker}/>}
        </div>
    );
}