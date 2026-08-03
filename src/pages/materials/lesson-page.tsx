import VideoPlayer from "../../components/VideoPlayer.tsx";

import {HugeiconsIcon} from "@hugeicons/react";
import {ArrowLeft02Icon, ArrowRight02Icon} from "@hugeicons/core-free-icons";

const LessonPage = () => {
    return (
        <div className="p-1 flex  flex-col gap-8 w-full">
            <div className="w-full h-auto">
                {/*    Video Component*/}
                <VideoPlayer src={"/videos/Number13.mp4"} />
            </div>
            <div className="flex justify-between items-center">
                <button className="flex w-[6rem] justify-center items-center gap-2 text-xs p-2 text-[#a2a2a2] border border-border">
                    <HugeiconsIcon icon={ArrowLeft02Icon} /> Previous
                </button>
                <button className="flex items-center bg-accent text-bg justify-center gap-2 text-sm w-[6rem] p-2 text-[#a2a2a2] border border-border">
                    Next <HugeiconsIcon icon={ArrowRight02Icon} />
                </button>
            </div>

        </div>
    );
};

export default LessonPage;
