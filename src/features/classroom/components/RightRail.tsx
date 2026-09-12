// RightRail.tsx
import type {Participant} from "livekit-client";
import {X} from "lucide-react";
import ParticipantsList from "./ParticipantsList";

export default function RightRail({
                                      activeTab,
                                      onTabChange,
                                      participants,
                                      mobileOpen,
                                      onMobileClose,
                                  }: {
    activeTab: "participants" | "chat";
    onTabChange: (tab: "participants" | "chat") => void;
    participants: Participant[];
    mobileOpen: boolean;
    onMobileClose: () => void;
}) {
    return (
        <>
            {/* Backdrop, mobile only */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 md:hidden"
                    onClick={onMobileClose}
                />
            )}

            <div
                className={`
                    fixed md:static top-0 right-0 z-50 md:z-auto
                    w-[86vw] max-w-[360px] md:w-[340px] h-full md:h-auto
                    shrink-0 border-l border-white/10 bg-[#0a0b0c]
                    flex flex-col
                    transition-transform duration-200 ease-out
                    ${mobileOpen ? "translate-x-0" : "translate-x-full"}
                    md:translate-x-0
                `}
            >
                <div className="flex items-center justify-between px-6 pt-5 border-b border-white/10">
                    <div className="flex gap-6">
                        {(["participants", "chat"] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => onTabChange(tab)}
                                className={`pb-3 text-[14px] capitalize border-b-2 transition-colors ${
                                    activeTab === tab
                                        ? "text-white border-[#8AF0B0]"
                                        : "text-[#767676] border-transparent hover:text-[#a9a9a9]"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <button onClick={onMobileClose} className="md:hidden pb-3 text-[#767676]">
                        <X size={18}/>
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-8">
                    {activeTab === "participants" ? (
                        <>
                            <ParticipantsList participants={participants}/>
                            {/*{activity && <ClassActivityPanel activity={activity}/>}*/}
                        </>
                    ) : (
                        <div className="text-[13px] text-[#767676]">
                            {/* Wire this to @livekit/components-react's useChat() hook */}
                            Chat goes here.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}