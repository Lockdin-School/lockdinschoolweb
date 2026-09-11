// LockdinClassroom.tsx
import {useState} from "react";
import {
    useParticipants,
    useLocalParticipant,
    useRoomContext,
} from "@livekit/components-react";
import TopBar from "./TopBar";
import SharedScreenPanel from "./SharedScreenPanel";
import SpeakerSidebar from "./SpeakerSidebar";
import CameraFilmstrip from "./CameraFilmstrip";
import RightRail from "./RightRail";
import BottomControlBar from "./BottomControlBar";

export interface ClassActivityData {
    questionNumber: string;
    answeredCount: number;
    totalCount: number;
    prompt: string;
    correctPercentage: number;
}

export default function LockdinClassroom({
                                             subjectLabel,
                                             lessonTitle,
                                             activity,
                                         }: {
    subjectLabel: string;
    lessonTitle: string;
    activity?: ClassActivityData;
}) {
    const room = useRoomContext();
    const participants = useParticipants();
    const {localParticipant, isMicrophoneEnabled, isCameraEnabled, isScreenShareEnabled} =
        useLocalParticipant();

    const [rightTab, setRightTab] = useState<"participants" | "chat">("participants");
    const [mobilePanelOpen, setMobilePanelOpen] = useState(false);

    return (
        <div className="lockdin-classroom w-full h-[100dvh] flex flex-col bg-[#0a0b0c] text-white font-alliance overflow-hidden">
            <TopBar
                subjectLabel={subjectLabel}
                lessonTitle={lessonTitle}
                participantCount={participants.length}
                onOpenParticipants={() => {
                    setRightTab("participants");
                    setMobilePanelOpen(true);
                }}
            />

            <div className="flex-1 flex min-h-0 relative">
                {/* Main stage */}
                <div className="flex-1 flex flex-col min-w-0 px-3 md:px-6 pt-3 md:pt-5 gap-3 md:gap-4 min-h-0">
                    <div className="flex-1 flex flex-col md:flex-row gap-3 md:gap-4 min-h-0">
                        <SharedScreenPanel/>
                        <div className="hidden md:flex">
                            <SpeakerSidebar participants={participants}/>
                        </div>
                    </div>
                    <CameraFilmstrip participants={participants}/>
                </div>

                {/* Right rail: persistent on desktop, drawer on mobile */}
                <RightRail
                    activeTab={rightTab}
                    onTabChange={setRightTab}
                    participants={participants}
                    activity={activity}
                    mobileOpen={mobilePanelOpen}
                    onMobileClose={() => setMobilePanelOpen(false)}
                />
            </div>

            <BottomControlBar
                subjectLabel={subjectLabel}
                lessonTitle={lessonTitle}
                room={room}
                localParticipant={localParticipant}
                isMicrophoneEnabled={isMicrophoneEnabled}
                isCameraEnabled={isCameraEnabled}
                isScreenShareEnabled={isScreenShareEnabled}
                onOpenChat={() => {
                    setRightTab("chat");
                    setMobilePanelOpen(true);
                }}
            />
        </div>
    );
}