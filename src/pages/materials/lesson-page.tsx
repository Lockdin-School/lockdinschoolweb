import VideoPlayer from "../../components/VideoPlayer.tsx";

import {HugeiconsIcon} from "@hugeicons/react";
import {ArrowLeft02Icon, ArrowRight02Icon} from "@hugeicons/core-free-icons";
import {useParams} from "react-router";
import {useLesson} from "../../api/lessons/queries/useLesson.ts";

const CLOUDFRONT = import.meta.env.VITE_CLOUDFRONT;

const LessonPage = () => {
    // QUERY THE LESSON TABLE
    const params = useParams();
    const lessonId = params.lessonId;

    const {
        data: lesson,
        isLoading,
        isError,
        error,
    } = useLesson(lessonId!);

    if (isLoading) {
        return <div>Loading lesson...</div>;
    }

    if (isError) {
        return <div>Failed to load lesson: {error.message}</div>;
    }

    return (
        lessonId && lesson && (
            <div className="p-1 flex  flex-col gap-8 w-full">
                <div className="w-full h-auto">
                    {/*    Video Component*/}
                    <VideoPlayer src={`${CLOUDFRONT}${lesson!.videoUrl}`} />
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
        )
    );
};

export default LessonPage;
