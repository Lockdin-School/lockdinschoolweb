
import {createFileRoute, useParams} from '@tanstack/react-router'
import {useMaterial} from "@/api/materials/queries/useMaterials.ts";
import {mockQuizQuestions} from "@/features/quizzes/mocks/quizQuestions.ts";
import {Quiz} from "@/components/Quiz.tsx";

export const Route = createFileRoute(
    '/_authenticated/subjects/$subjectId/topics/$topicId/quizzes/$materialId',
)({
    component: RouteComponent,
})

function RouteComponent() {

    const params = useParams({
        from: '/_authenticated/subjects/$subjectId/topics/$topicId/quizzes/$materialId',
    });

    const quizId = params.materialId

    const {
        data: material,
        isLoading: isLoadingMaterial,
        isError: isErrorMaterial,
        error: errorMaterial,
    } = useMaterial(quizId!);

    if (isLoadingMaterial) {
        return <div>Loading quiz...</div>;
    }

    if (isErrorMaterial) {
        return <div>Failed to load quiz: {errorMaterial?.message}</div>;
    }

    return (
        <div className="p-1 flex items-start flex-col overflow-y-auto max-h-[calc(100vh-20vh)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-8 w-full">
            <Quiz title={material!.title} questions={mockQuizQuestions} />
        </div>
    )
}
