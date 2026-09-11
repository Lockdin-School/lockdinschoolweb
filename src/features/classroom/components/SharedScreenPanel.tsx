// SharedScreenPanel.tsx
import {useEffect, useRef, useState} from "react";
import {useTracks, VideoTrack} from "@livekit/components-react";
import {Track} from "livekit-client";
import {ScreenShare, MonitorOff, Maximize2, Minimize2} from "lucide-react";

export default function SharedScreenPanel() {
    const screenShareTracks = useTracks([Track.Source.ScreenShare]);
    const activeTrack = screenShareTracks[0];

    const containerRef = useRef<HTMLDivElement>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const handleChange = () => {
            setIsFullscreen(document.fullscreenElement === containerRef.current);
        };
        document.addEventListener("fullscreenchange", handleChange);
        return () => document.removeEventListener("fullscreenchange", handleChange);
    }, []);

    const toggleFullscreen = async () => {
        if (!containerRef.current) return;
        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
            } else {
                await containerRef.current.requestFullscreen();
            }
        } catch {
            // Fullscreen can be denied (e.g. iOS Safari doesn't support
            // element-level fullscreen at all) — fail silently rather than
            // breaking the call.
        }
    };

    return (
        <div
            ref={containerRef}
            className={`relative flex-1 min-w-0 min-h-[240px] md:min-h-0 border border-white/10 bg-[#101112] overflow-hidden flex items-center justify-center ${
                isFullscreen ? "rounded-none" : "rounded-2xl"
            }`}
        >
            {activeTrack ? (
                <>
                    <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 border border-white/10">
                        <ScreenShare size={13} className="text-[#dcdcdc]"/>
                        <span className="text-[11px] md:text-[12px] text-[#dcdcdc]">
                            {activeTrack.participant.isLocal
                                ? "You are sharing"
                                : `${activeTrack.participant.name || activeTrack.participant.identity} is sharing`}
                        </span>
                    </div>

                    <button
                        onClick={toggleFullscreen}
                        className="absolute top-3 right-3 md:top-4 md:right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/70 border border-white/10 text-[#dcdcdc] hover:bg-black/90 hover:text-white transition-colors"
                        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                    >
                        {isFullscreen ? <Minimize2 size={14}/> : <Maximize2 size={14}/>}
                    </button>

                    <VideoTrack
                        trackRef={activeTrack}
                        className="w-full h-full object-contain bg-black"
                    />
                </>
            ) : (
                <div className="flex flex-col items-center gap-3 text-center px-6">
                    <MonitorOff size={28} className="text-[#3a3b3c]"/>
                    <p className="text-[13px] text-[#666]">
                        Nothing is being shared right now.
                    </p>
                </div>
            )}
        </div>
    );
}