// MicControl.tsx
import {useRef, useState} from "react";
import {useMediaDeviceSelect} from "@livekit/components-react";
import type {Room} from "livekit-client";
import {Mic, MicOff, ChevronUp, Check} from "lucide-react";
import {useOnClickOutside} from "@/features/classroom/hooks/useOnClickOutside";

export default function MicControl({
                                       room,
                                       isMicrophoneEnabled,
                                       onToggle,
                                   }: {
    room: Room;
    isMicrophoneEnabled: boolean;
    onToggle: () => void;
}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const groupRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(groupRef, () => setMenuOpen(false));

    const {devices, activeDeviceId, setActiveMediaDevice} = useMediaDeviceSelect({
        kind: "audioinput",
        room,
    });

    return (
        <div ref={groupRef} className="relative flex flex-col items-center">
            {menuOpen && (
                <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-60 rounded-xl border border-white/10 bg-[#141516] p-2 shadow-xl z-20">
                    <div className="px-2 py-1.5 text-[11px] text-[#767676]">Microphone</div>
                    {devices.length === 0 && (
                        <div className="px-2 py-2 text-[13px] text-[#666]">
                            No microphones found. Check browser permissions.
                        </div>
                    )}
                    {devices.map((device) => (
                        <button
                            key={device.deviceId}
                            onClick={() => {
                                setActiveMediaDevice(device.deviceId);
                                setMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-2 py-2 rounded-lg text-[13px] text-left transition-colors ${
                                device.deviceId === activeDeviceId
                                    ? "bg-white/10 text-white"
                                    : "text-[#a9a9a9] hover:bg-white/5"
                            }`}
                        >
                            <span className="truncate pr-2">
                                {device.label || "Unnamed microphone"}
                            </span>
                            {device.deviceId === activeDeviceId && (
                                <Check size={13} className="text-[#8AF0B0] shrink-0"/>
                            )}
                        </button>
                    ))}
                </div>
            )}

            <div className="flex items-center gap-1">
                <button onClick={onToggle} className="flex flex-col items-center gap-1.5 group">
                    {isMicrophoneEnabled ? (
                        <Mic size={20} className="text-[#dcdcdc]"/>
                    ) : (
                        <MicOff size={20} className="text-[#666] group-hover:text-[#a9a9a9]"/>
                    )}
                    <span className="text-[11px] text-[#767676] group-hover:text-[#a9a9a9]">Mic</span>
                </button>
                <button
                    onClick={() => setMenuOpen((v) => !v)}
                    className="text-[#666] hover:text-[#a9a9a9] transition-colors -ml-1 mb-4"
                    aria-label="Select microphone"
                >
                    <ChevronUp size={12}/>
                </button>
            </div>
        </div>
    );
}