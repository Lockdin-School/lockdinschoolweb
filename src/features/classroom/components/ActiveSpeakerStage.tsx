import {useTracks} from "@livekit/components-react";
import {Track, type Participant} from "livekit-client";
import {MicOff} from "lucide-react";

export default function ActiveSpeakerStage({participant}: {participant: Participant}) {
    const cameraTracks = useTracks([Track.Source.Camera]).filter(
        (t) => t.participant.identity === participant.identity,
    );
    const track = cameraTracks[0];
    const label = participant.isLocal ? "You" : participant.name || participant.identity;

    return (
        <div className="relative flex-1 min-w-0 min-h-[240px] md:min-h-0 rounded-2xl border border-white/10 bg-[#101112] overflow-hidden flex items-center justify-center">
            {track && !track.publication?.isMuted ? (
                <video
                    className={`w-full h-full object-cover ${participant.isLocal ? "-scale-x-100" : ""}`}
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
                <span className="font-alliance-2 text-[#666] text-2xl">
                    {label.charAt(0).toUpperCase()}
                </span>
            )}

            <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 border border-white/10">
                {!participant.isMicrophoneEnabled && <MicOff size={13} className="text-[#dcdcdc]"/>}
                <span className="text-[12px] text-[#dcdcdc]">{label}</span>
            </div>
        </div>
    );
}