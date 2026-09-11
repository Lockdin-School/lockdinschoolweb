import {useTracks} from "@livekit/components-react";
import {Track, type Participant} from "livekit-client";
import {MicOff} from "lucide-react";

export default function VideoTile({
                                      participant,
                                      label,
                                      size = "md",
                                  }: {
    participant: Participant;
    label: string;
    size?: "lg" | "md" | "sm";
}) {
    const cameraTracks = useTracks([Track.Source.Camera]).filter(
        (t) => t.participant.identity === participant.identity,
    );
    const track = cameraTracks[0];

    const heightClass =
        size === "lg" ? "h-[220px]" : size === "md" ? "h-[100px]" : "h-[72px]";

    const shouldMirror = participant.isLocal;

    return (
        <div
            className={`relative w-full ${heightClass} rounded-xl overflow-hidden border border-white/10 bg-[#1a1b1c] shrink-0`}
        >
            {track && !track.publication?.isMuted ? (
                // Swap in @livekit/components-react's <VideoTrack trackRef={track} />
                // here once wired to a real publication.
                <video
                    className={`w-full h-full object-cover ${shouldMirror ? "-scale-x-100" : ""}`}
                    autoPlay
                    playsInline
                    muted={participant.isLocal}
                    ref={(el) => {
                        if (el && track.publication?.track) {
                            track.publication.track.attach(el);
                        }
                    }}
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#1a1b1c]">
                    <span className="font-alliance-2 text-[#666] text-sm">
                        {label.charAt(0).toUpperCase()}
                    </span>
                </div>
            )}

            <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/60">
                {!participant.isMicrophoneEnabled && (
                    <MicOff size={11} className="text-[#dcdcdc]"/>
                )}
                <span className="text-[11px] text-[#dcdcdc]">{label}</span>
            </div>
        </div>
    );
}