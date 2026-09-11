// BottomControlBar.tsx
import {useState} from "react";
import type {Room, LocalParticipant} from "livekit-client";
import {Mic, MicOff, Video, VideoOff, MonitorUp, MessageSquare, PhoneOff} from "lucide-react";
import {useRouter} from "@tanstack/react-router";

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

    const toggleMic = () => localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled);
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
                <ControlButton icon={isMicrophoneEnabled ? Mic : MicOff} label="Mic" active={isMicrophoneEnabled} onClick={toggleMic}/>
                <ControlButton icon={isCameraEnabled ? Video : VideoOff} label="Camera" active={isCameraEnabled} onClick={toggleCamera}/>
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