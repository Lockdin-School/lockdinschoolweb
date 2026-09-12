import {
    AudioTrack,
    useTracks,
} from "@livekit/components-react";
import {Track} from "livekit-client";

export function RemoteAudio() {
    const audioTracks = useTracks(
        [Track.Source.Microphone], {
            onlySubscribed: true,
        }
    );

    return (
        <>
            {audioTracks.map((track) => (
                <AudioTrack
                    key={`${track.participant.identity}-${track.publication?.trackSid}`}
                    trackRef={track}
                />
            ))}
        </>
    );
}