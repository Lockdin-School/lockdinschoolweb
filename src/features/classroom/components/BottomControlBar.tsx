import {type Room, type LocalParticipant, Track} from "livekit-client";
import {Mic, Video, VideoOff, MonitorUp, MessageSquare, PhoneOff, ChevronUp} from "lucide-react";
import {useRouter} from "@tanstack/react-router";
import {useRef, useState} from "react";
import {useOnClickOutside} from "@/features/classroom/hooks/useOnClickOutside"; // any standard outside-click hook
import {useBackgroundEffect} from "@/features/classroom/hooks/useBackgroundEffect";
import BackgroundEffectsMenu from "@/features/classroom/components/BackgroundEffectsMenu";
import MicControl from "@/features/classroom/components/MicControl.tsx";


export default function BottomControlBar({
                                             subjectLabel,
                                             lessonTitle,
                                             room,
                                             localParticipant,
                                             isMicrophoneEnabled,
                                             isCameraEnabled,
                                             isScreenShareEnabled,
                                             onOpenChat,
                                         }: {
    subjectLabel: string;
    lessonTitle: string;
    room: Room;
    localParticipant: LocalParticipant;
    isMicrophoneEnabled: boolean;
    isCameraEnabled: boolean;
    isScreenShareEnabled: boolean;
    onOpenChat: () => void;
}) {
    const [leaving, setLeaving] = useState(false);
    const router = useRouter();

    const {effect, applyEffect} = useBackgroundEffect();
    const [effectsMenuOpen, setEffectsMenuOpen] = useState(false);
    const cameraGroupRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(cameraGroupRef, () => setEffectsMenuOpen(false));

    const toggleMic = async () => {
        try {
            await localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled);
        } catch (err) {
            console.error("Failed to toggle microphone:", err);
            // surface this to the user — a toast, inline banner, etc. —
            // rather than letting it fail invisibly
        }
    };

    const pub = localParticipant.getTrackPublication(Track.Source.Microphone);
    console.log("mic publication:", pub, "muted:", pub?.isMuted, "track:", pub?.track);

    const toggleCamera = () => localParticipant.setCameraEnabled(!isCameraEnabled);
    const toggleShare = () => localParticipant.setScreenShareEnabled(!isScreenShareEnabled);
    const leave = async () => {
        setLeaving(true);
        await room.disconnect();
        router.history.back();
    };

    return (
        <div className="w-full h-16 md:h-20 flex items-center justify-between px-3 md:px-6 border-t border-white/10 shrink-0">
            <div className="hidden sm:flex flex-col leading-tight min-w-0">
                <span className="text-[12px] text-[#767676]">Session</span>
                <span className="text-[13px] text-[#dcdcdc] truncate">
                    {subjectLabel} · {lessonTitle}
                </span>
            </div>

            <div className="flex items-center gap-4 sm:gap-8 mx-auto sm:mx-0">
                <MicControl room={room} isMicrophoneEnabled={isMicrophoneEnabled} onToggle={toggleMic} />
                <div ref={cameraGroupRef} className="relative flex flex-col items-center">
                    {effectsMenuOpen && (
                        <BackgroundEffectsMenu
                            effect={effect}
                            onSelect={(next) => {
                                applyEffect(next);
                                setEffectsMenuOpen(false);
                            }}
                        />
                    )}
                    <div className="flex items-center gap-1">
                        <ControlButton
                            icon={isCameraEnabled ? Video : VideoOff}
                            label="Camera"
                            active={isCameraEnabled}
                            onClick={toggleCamera}
                        />
                        <button
                            onClick={() => setEffectsMenuOpen((v) => !v)}
                            className="text-[#666] hover:text-[#a9a9a9] transition-colors -ml-1 mb-4"
                            aria-label="Background effects"
                        >
                            <ChevronUp size={12}/>
                        </button>
                    </div>
                </div>
                <ControlButton icon={MonitorUp} label="Share" active={isScreenShareEnabled} onClick={toggleShare}/>
                <ControlButton icon={MessageSquare} label="Chat" active={false} onClick={onOpenChat} className="md:hidden"/>
                <ControlButton icon={MessageSquare} label="Chat" active={false} onClick={onOpenChat} className="hidden md:flex"/>
            </div>

            <button
                onClick={leave}
                disabled={leaving}
                className="flex items-center gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-white/15 text-[12px] sm:text-[13px] text-[#dcdcdc] hover:border-[#ff4d4d] hover:text-[#ff4d4d] transition-colors disabled:opacity-50 shrink-0"
            >
                <PhoneOff size={15}/>
                <span className="hidden sm:inline">{leaving ? "Leaving..." : "Leave session"}</span>
            </button>
        </div>
    );
}

function ControlButton({
                           icon: Icon,
                           label,
                           active,
                           onClick,
                           className = "",
                       }: {
    icon: typeof Mic;
    label: string;
    active: boolean;
    onClick: () => void;
    className?: string;
}) {
    return (
        <button onClick={onClick} className={`flex flex-col items-center gap-1 sm:gap-1.5 group ${className}`}>
            <Icon size={19} className={active ? "text-[#dcdcdc]" : "text-[#666] group-hover:text-[#a9a9a9]"}/>
            <span className="hidden sm:inline text-[11px] text-[#767676] group-hover:text-[#a9a9a9]">
                {label}
            </span>
        </button>
    );
}