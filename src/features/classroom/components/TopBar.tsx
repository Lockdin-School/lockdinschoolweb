// TopBar.tsx
import {useEffect, useState} from "react";
import {Users} from "lucide-react";

const formatElapsed = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
};

export default function TopBar({
                                   subjectLabel,
                                   lessonTitle,
                                   participantCount,
                                   onOpenParticipants,
                               }: {
    subjectLabel: string;
    lessonTitle: string;
    participantCount: number;
    onOpenParticipants: () => void;
}) {
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        const start = Date.now();
        const interval = setInterval(() => {
            setElapsed(Math.floor((Date.now() - start) / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-14 md:h-16 flex items-center justify-between px-3 md:px-6 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2 md:gap-4 min-w-0">
                <div className="flex md:max-w-[80vw]  gap-3 md:gap-4 py-2">
                    <img src="/logo/logo-gw.svg" alt="Lockdin Logo" className="w-8 h-8"/>
                </div>
                <div className="hidden sm:block w-px h-6 bg-white/15 shrink-0"/>
                <div className="hidden items-start sm:flex flex-col leading-tight min-w-0">
                    <span className="font-inter-regular text-[12px] tracking-widest text-[#8AF0B0] truncate">
                        {subjectLabel.toUpperCase()}
                    </span>
                    <span className="text-[13px] font-inter-regular text-[#dcdcdc] truncate">{lessonTitle}</span>
                </div>
            </div>

            <div className="flex items-center gap-3 md:gap-6 shrink-0">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8AF0B0]"/>
                    <span className="font-alliance-2 text-[11px] md:text-[12px] tracking-widest">LIVE</span>
                </div>
                <span className="hidden xs:inline text-[13px] text-[#a9a9a9] tabular-nums">
                    {formatElapsed(elapsed)}
                </span>
                <button
                    onClick={onOpenParticipants}
                    className="md:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-white/10 text-[#dcdcdc]"
                >
                    <Users size={14}/>
                    <span className="text-[12px]">{participantCount}</span>
                </button>
            </div>
        </div>
    );
}