// useBackgroundEffect.ts
import {useCallback, useEffect, useRef, useState} from "react";
import {useLocalParticipant} from "@livekit/components-react";
import {Track, type LocalVideoTrack} from "livekit-client";
import {BackgroundBlur, VirtualBackground} from "@livekit/track-processors";

export type BackgroundEffect =
    | {type: "none"}
    | {type: "blur"; radius: number}
    | {type: "image"; url: string};

export function useBackgroundEffect() {
    const {localParticipant} = useLocalParticipant();
    const [effect, setEffect] = useState<BackgroundEffect>({type: "none"});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const processorRef = useRef<any>(null);

    const getLocalVideoTrack = useCallback((): LocalVideoTrack | undefined => {
        const publication = localParticipant.getTrackPublication(Track.Source.Camera);
        return publication?.track as LocalVideoTrack | undefined;
    }, [localParticipant]);

    const applyEffect = useCallback(
        async (next: BackgroundEffect) => {
            const track = getLocalVideoTrack();
            setEffect(next);
            if (!track) return; // camera is off — applied once it turns back on, see below

            if (processorRef.current) {
                await track.stopProcessor();
                processorRef.current = null;
            }

            if (next.type === "blur") {
                const processor = BackgroundBlur(next.radius);
                await track.setProcessor(processor);
                processorRef.current = processor;
            } else if (next.type === "image") {
                const processor = VirtualBackground(next.url);
                await track.setProcessor(processor);
                processorRef.current = processor;
            }
        },
        [getLocalVideoTrack],
    );

    // Camera off/on republishes a new track — the old processor doesn't
    // carry over, so re-apply whichever effect is currently selected.
    useEffect(() => {
        const track = getLocalVideoTrack();
        if (track && effect.type !== "none" && !processorRef.current) {
            applyEffect(effect);
        }
    }, [getLocalVideoTrack, effect, applyEffect]);

    return {effect, applyEffect};
}