// CameraFilmstrip.tsx — the bottom scrollable row
import type {Participant} from "livekit-client";
import VideoTile from "./VideoTile";

export default function CameraFilmstrip({participants}: {participants: Participant[]}) {
    const visible = participants.slice(0, 5);
    const remaining = participants.length - visible.length;

    return (
        <div className="flex gap-2 pb-5 shrink-0 overflow-x-auto">
            {visible.map((p) => (
                <div key={p.identity} className="w-[130px] shrink-0">
                    <VideoTile
                        participant={p}
                        label={p.isLocal ? "You" : p.name || p.identity}
                        size="sm"
                    />
                </div>
            ))}
            {remaining > 0 && (
                <div className="w-[130px] h-[72px] shrink-0 rounded-xl border border-white/10 bg-[#141516] flex items-center justify-center">
                    <span className="text-[13px] text-[#a9a9a9]">+{remaining}</span>
                </div>
            )}
        </div>
    );
}