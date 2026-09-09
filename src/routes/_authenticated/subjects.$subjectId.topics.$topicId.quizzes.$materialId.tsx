
import {createFileRoute, useNavigate, useParams} from '@tanstack/react-router'
import QuizRenderer from "@/features/quizzes/components/QuizRenderer.tsx";
import {useQuiz} from "@/api/quizzes/queries/useQuiz.ts";
import {useAuthUser} from "@/api/auth/queries/useAuthUser.ts";
import {useStudentProfile} from "@/api/student-profiles/queries/useStudentProfile.ts";
import QuizCompleted from "@/features/quizzes/components/QuizCompleted.tsx";
import {useState} from "react";
import type {QuizAttempt} from "@/api/quizzes/models/Attempt.ts";

export const Route = createFileRoute(
    '/_authenticated/subjects/$subjectId/topics/$topicId/quizzes/$materialId',
)({
    component: RouteComponent,
})

function RouteComponent() {

    const params = useParams({
        from: '/_authenticated/subjects/$subjectId/topics/$topicId/quizzes/$materialId',
    });


    const navigate = useNavigate();

    const {data: account} = useAuthUser();
    const {data: studentProfile} = useStudentProfile(account?.userInfo?.id);

    const studentId = studentProfile.id;

    const quizId = params.materialId

    const {
        data: quiz,
        isLoading: quizLoading,
        isError: quizIsError,
        error: quizError,
    } = useQuiz(quizId);

    const [completedAttempt, setCompletedAttempt] = useState<QuizAttempt | null>(null);

    if (quizLoading) {
        return <div className="w-full h-screen flex items-center justify-center">Loading quiz...</div>;
    }

    if (quizIsError) {
        return <div className="w-full h-screen flex items-center justify-center">Failed to load quiz: {quizError?.message}</div>;
    }

    return (
        <div className="p-1 flex items-start flex-col overflow-y-auto min-h-[calc(100vh-20vh)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-8 w-full">
            {quiz && (
                completedAttempt ? (
                    <QuizCompleted
                        quiz={quiz}
                        attempt={completedAttempt}
                        onBackToDashboard={() => {
                            // navigate back to topic/subject, e.g.:
                            void navigate({ to: '/dashboard' })
                        }}
                    />
                ) : (
                    <QuizRenderer
                        studentId={studentId}
                        quiz={quiz}
                        onQuizCompleted={setCompletedAttempt}
                    />
                )
            )}
        </div>
    )
}
