import {createFileRoute, useParams} from '@tanstack/react-router'
import {useLesson} from "../api/lessons/queries/useLesson.ts";
import VideoPlayer from "../components/VideoPlayer.tsx";

export const Route = createFileRoute(
    '/subjects/$subjectId/topics/$topicId/lessons/$lessonId',
)({
    component: Lesson,
})

const CLOUDFRONT = import.meta.env.VITE_CLOUDFRONT;

function Lesson() {
    const params = useParams({
        from: '/subjects/$subjectId/topics/$topicId/lessons/$lessonId',
    });
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
                    <VideoPlayer src={`${CLOUDFRONT}${lesson!.videoUrl}`}/>
                </div>
            </div>
        )
    );
}
