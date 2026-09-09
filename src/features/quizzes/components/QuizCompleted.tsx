import type {Quiz} from "@/api/quizzes/models/Quiz.ts";
import type {QuizAttempt} from "@/api/quizzes/models/Attempt.ts";

interface QuizCompletedProps {
    quiz: Quiz;
    attempt: QuizAttempt;
    onBackToDashboard?: () => void;
}

const QuizCompleted = ({quiz, attempt, onBackToDashboard}: QuizCompletedProps) => {
    const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
    const score = attempt.score ?? 0;
    const percentage = attempt.percentage ?? (totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0);

    const remark = getRemark(percentage);

    return (
        <div className="w-full h-full flex flex-col">
            <section className="w-full h-[30vh] justify-end flex flex-col items-start gap-2">
                <b className="text-[16px] tracking-tighter text-bg bg-[#1e2914] p-1 rounded px-2 mb-2">
                    Quiz Completed
                </b>
                <p className="text-5xl font-geist-semibold max-w-md leading-9 tracking-[-5px] text-left">
                    {quiz.title}
                </p>
            </section>

            <section className="w-full flex flex-col items-center justify-center gap-6 py-10">
                <div className="flex flex-col items-center gap-2">
                    <p className="font-anthropic-display text-8xl tracking-[-3px] text-[#1e2914]">
                        {percentage}%
                    </p>
                    <p className="font-anthropic-display text-xl text-[#636363]">
                        {score} / {totalPoints} marks
                    </p>
                </div>

                <p className="font-geist-semibold text-lg tracking-tighter text-center">
                    {remark}
                </p>

                <div className="flex flex-col items-center gap-1 mt-4">
                    <p className="text-sm text-[#636363] tracking-tighter">
                        Started {formatDate(attempt.startedAt)}
                    </p>
                    {attempt.endedAt && (
                        <p className="text-sm text-[#636363] tracking-tighter">
                            Submitted {formatDate(attempt.endedAt)}
                        </p>
                    )}
                </div>
            </section>

            <section className="w-full flex justify-center items-center mt-6">
                <button
                    type="button"
                    onClick={onBackToDashboard}
                    className="bg-[#1e2914] text-white px-6 py-3 rounded hover:bg-[#1e2914]/90 transition-colors"
                >
                    Back to Dashboard
                </button>
            </section>
        </div>
    );
};

const getRemark = (percentage: number): string => {
    if (percentage >= 90) return "Excellent work!";
    if (percentage >= 75) return "Great job!";
    if (percentage >= 60) return "Good effort.";
    if (percentage >= 40) return "Keep practicing.";
    return "Consider reviewing this material again.";
};

const formatDate = (isoString: string): string => {
    return new Date(isoString).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
    });
};

export default QuizCompleted;