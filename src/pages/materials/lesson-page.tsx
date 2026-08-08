import VideoPlayer from "../../components/VideoPlayer.tsx";

import {HugeiconsIcon} from "@hugeicons/react";
import {ArrowLeft02Icon, ArrowRight02Icon} from "@hugeicons/core-free-icons";
import {useEffect, useState} from "react";
import {getLessonById} from "../../api/lessons/lessons.ts";
import type {LessonResponse} from "../../api/lessons/models/LessonResponse.ts";
import {useParams} from "react-router";

const CLOUDFRONT = import.meta.env.VITE_CLOUDFRONT;

const LessonPage = () => {
    // QUERY THE LESSON TABLE
    const params = useParams();
    const lessonId = params.lessonId;

    const [lesson, setLesson] = useState<LessonResponse>();
    useEffect(() => {
        const fetchLessonById = async (lessonId: string) => {
            try {
                const lesson = await getLessonById(lessonId);
                setLesson(lesson);
            } catch (e) {
                console.error("Error fetching lesson: ", e);
            }
        };

        fetchLessonById(lessonId!).then();
    }, [lessonId]);


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
