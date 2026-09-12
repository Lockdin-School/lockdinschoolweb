// useActiveSpeaker.ts
import {useEffect, useState} from "react";
import {useRoomContext} from "@livekit/components-react";
import {RoomEvent, type Participant} from "livekit-client";

export function useActiveSpeaker(fallback: Participant | undefined) {
    const room = useRoomContext();
    const [activeSpeaker, setActiveSpeaker] = useState<Participant | undefined>(fallback);

    useEffect(() => {
        const handleActiveSpeakersChanged = (speakers: Participant[]) => {
            // Only update on an actual speaker — keep showing whoever spoke
            // last during silence, rather than flickering to blank.
            if (speakers.length > 0) setActiveSpeaker(speakers[0]);
        };
        room.on(RoomEvent.ActiveSpeakersChanged, handleActiveSpeakersChanged);
        return () => {
            room.off(RoomEvent.ActiveSpeakersChanged, handleActiveSpeakersChanged);
        };
    }, [room]);

    useEffect(() => {
        if (!activeSpeaker && fallback) setActiveSpeaker(fallback);
    }, [fallback, activeSpeaker]);

    return activeSpeaker;
}