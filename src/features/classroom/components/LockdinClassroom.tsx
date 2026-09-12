// LockdinClassroom.tsx
import {useState} from "react";
import {
    useParticipants,
    useLocalParticipant,
    useRoomContext,
} from "@livekit/components-react";
import TopBar from "./TopBar";
import CameraFilmstrip from "./CameraFilmstrip";
import RightRail from "./RightRail";
import BottomControlBar from "./BottomControlBar";
import MainStage from "@/features/classroom/components/MainStage.tsx";

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

                                         }: {
    subjectLabel: string;
    lessonTitle: string;
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
                    <MainStage participants={participants}/>
                    <CameraFilmstrip participants={participants}/>
                </div>

                {/* Right rail: persistent on desktop, drawer on mobile */}
                <RightRail
                    activeTab={rightTab}
                    onTabChange={setRightTab}
                    participants={participants}
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