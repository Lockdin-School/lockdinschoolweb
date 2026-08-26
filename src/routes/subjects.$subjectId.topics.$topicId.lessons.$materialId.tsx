import {createFileRoute, useParams} from '@tanstack/react-router'
import {useLesson} from "../api/lessons/queries/useLesson.ts";
import VideoPlayer from "../components/VideoPlayer.tsx";
import {useMaterial} from "../api/materials/queries/useMaterials.ts";

export const Route = createFileRoute(
    '/subjects/$subjectId/topics/$topicId/lessons/$materialId',
)({
    component: Lesson,
})

const CLOUDFRONT = import.meta.env.VITE_CLOUDFRONT;

function Lesson() {
    const params = useParams({
        from: '/subjects/$subjectId/topics/$topicId/lessons/$materialId',
    });
    const lessonId = params.materialId;

    const {
        data: lesson,
        isLoading,
        isError,
        error,
    } = useLesson(lessonId!);

    const {
        data: material,
        isLoading: isLoadingMaterial,
        isError: isErrorMaterial,
        error: errorMaterial,
    } = useMaterial(lessonId!);

    if (isLoading || isLoadingMaterial) {
        return <div>Loading lesson...</div>;
    }

    if (isError || isErrorMaterial) {
        return <div>Failed to load lesson: {error?.message || errorMaterial?.message}</div>;
    }

    return (
        lessonId && lesson && (
            <div className="p-1 flex  flex-col gap-8 w-full">
                <p className="text-start text-3xl tracking-tight font-alliance-2">
                    {material?.title}
                </p>
                <div className="w-full h-auto">
                    {/*    Video Component*/}
                    <VideoPlayer src={`${CLOUDFRONT}${lesson!.videoUrl}`}/>
                </div>
            </div>
        )
    );
}
