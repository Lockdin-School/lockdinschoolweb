// ParticipantsList.tsx
import type {Participant} from "livekit-client";
import {Mic, MicOff, ChevronRight} from "lucide-react";

export default function ParticipantsList({participants}: {participants: Participant[]}) {
    const visible = participants.slice(0, 6);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#a9a9a9]">
                    In the call ({participants.length})
                </span>
            </div>

            <div className="flex flex-col gap-1">
                {visible.map((p) => {
                    const isTeacher = p.metadata?.includes("teacher");
                    return (
                        <div
                            key={p.identity}
                            className="flex items-center justify-between py-2"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#2a2b2c] flex items-center justify-center text-[12px] text-[#a9a9a9]">
                                    {(p.name || p.identity).charAt(0).toUpperCase()}
                                </div>
                                <div className="flex flex-col leading-tight">
                                    <span className="text-[14px] text-white">
                                        {p.isLocal ? "You" : p.name || p.identity}
                                    </span>
                                    <span className="text-[12px] text-[#767676]">
                                        {isTeacher ? "Teacher" : "Student"}
                                    </span>
                                </div>
                            </div>
                            {p.isMicrophoneEnabled ? (
                                <Mic size={15} className="text-[#8AF0B0]"/>
                            ) : (
                                <MicOff size={15} className="text-[#525252]"/>
                            )}
                        </div>
                    );
                })}
            </div>

            {participants.length > visible.length && (
                <button className="flex items-center justify-between text-[13px] text-[#a9a9a9] hover:text-white transition-colors pt-1">
                    View all participants
                    <ChevronRight size={14}/>
                </button>
            )}
        </div>
    );
}