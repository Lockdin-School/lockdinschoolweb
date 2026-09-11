// SpeakerSidebar.tsx — the pinned column beside the lesson panel
import type {Participant} from "livekit-client";
import {Plus} from "lucide-react";
import VideoTile from "./VideoTile";

export default function SpeakerSidebar({participants}: {participants: Participant[]}) {
    const teacher = participants.find((p) => p.metadata?.includes("teacher")) ?? participants[0];
    const others = participants.filter((p) => p.identity !== teacher?.identity).slice(0, 3);
    const remaining = participants.length - 1 - others.length;

    return (
        <div className="w-[220px] shrink-0 flex flex-col gap-3">
            {teacher && (
                <VideoTile
                    participant={teacher}
                    label={teacher.isLocal ? "You" : teacher.name || teacher.identity}
                    size="lg"
                />
            )}
            {others.map((p) => (
                <VideoTile
                    key={p.identity}
                    participant={p}
                    label={p.isLocal ? "You" : p.name || p.identity}
                    size="md"
                />
            ))}
            {remaining > 0 && (
                <button className="w-full h-[100px] rounded-xl border border-white/10 bg-[#141516] flex flex-col items-center justify-center gap-1 hover:bg-[#1a1b1c] transition-colors">
                    <Plus size={18} className="text-[#a9a9a9]"/>
                    <span className="text-[12px] text-[#a9a9a9]">{remaining} more</span>
                </button>
            )}
        </div>
    );
}