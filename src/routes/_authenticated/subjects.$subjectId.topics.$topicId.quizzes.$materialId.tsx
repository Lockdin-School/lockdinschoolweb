
import {createFileRoute, useParams} from '@tanstack/react-router'
import QuizRenderer from "@/features/quizzes/components/QuizRenderer.tsx";
import {useQuiz} from "@/api/quizzes/queries/useQuiz.ts";

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
        data: quiz,
        isLoading: quizLoading,
        isError: quizIsError,
        error: quizError,
    } = useQuiz(quizId);

    if (quizLoading) {
        return <div className="w-full h-screen flex items-center justify-center">Loading quiz...</div>;
    }

    if (quizIsError) {
        return <div className="w-full h-screen flex items-center justify-center">Failed to load quiz: {quizError?.message}</div>;
    }

    return (
        <div className="p-1 flex items-start flex-col overflow-y-auto min-h-[calc(100vh-20vh)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-8 w-full">
            {quiz && <QuizRenderer quiz={quiz} />}
        </div>
    )
}
