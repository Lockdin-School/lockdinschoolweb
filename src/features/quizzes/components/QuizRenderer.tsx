import type {Quiz} from "@/api/quizzes/models/Quiz.ts";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import {useEffect, useMemo, useState} from "react";
import {QuizQuestionOptions} from "@/components/QuizQuestionOptions.tsx";
import {
    useCreateQuizAttempt,
    useQuizAttempt,
    useSaveQuizQuestionResponse,
    useUpdateQuizAttempt, useUpdateQuizQuestionResponse
} from "@/api/quizzes/queries/useQuizAttempts.ts";
import type {QuizAttempt, QuizQuestionResponse} from "@/api/quizzes/models/Attempt.ts";

interface QuizRendererProps {
    quiz: Quiz;
    studentId: string;
    onQuizCompleted?: (attempt: QuizAttempt) => void;
}

const QuizRenderer = ({quiz, studentId, onQuizCompleted}: QuizRendererProps) => {
    const [answers, setAnswers] = useState<Record<string, string>>({});

    const {
        data: attempt,
        isLoading: isAttemptLoading,
        isError: isAttemptError,
        error: attemptFetchError,
    } = useQuizAttempt(quiz.id, studentId);

    const createAttempt = useCreateQuizAttempt();
    const updateAttempt = useUpdateQuizAttempt();
    const saveResponse = useSaveQuizQuestionResponse();
    const updateResponse = useUpdateQuizQuestionResponse();



    useEffect(() => {
        if (attempt?.status === "completed") {
            onQuizCompleted?.(attempt);
        }
    }, [attempt, onQuizCompleted]);

    const attemptNotFound =
        isAttemptError && (attemptFetchError as any)?.response?.status === 404;

    // Quiz is considered "started" once we either have a fetched attempt
    // (they already started before, e.g. refreshed the page) or the
    // student has just created one via the Start button.
    const hasStarted = Boolean(attempt) || Boolean(createAttempt.data);

    const responsesByQuestionId = useMemo(() => {
        return (
            attempt?.responses.reduce(
                (acc, response) => {
                    acc[response.questionId] = response;
                    return acc;
                },
                {} as Record<string, QuizQuestionResponse>,
            ) ?? {}
        );
    }, [attempt?.responses]);

    useEffect(() => {
        if (!attempt) return;

        const existingAnswers = attempt.responses.reduce(
            (acc, response) => {
                if (response.selectedOptionId) {
                    acc[response.questionId] = response.selectedOptionId;
                }

                return acc;
            },
            {} as Record<string, string>,
        );

        setAnswers(existingAnswers);
    }, [attempt]);

    const handleStart = () => {
        if (hasStarted || createAttempt.isPending || !quiz.id || !studentId) return;

        createAttempt.mutate({
            quizId: quiz.id,
            studentId,
            status: "inProgress",
            startedAt: new Date().toISOString(),
            endedAt: null,
            score: null,
            percentage: null,
        });
    };

    const handleAnswerChange = (questionId: string, optionId: string) => {
        setAnswers((current) => ({
            ...current,
            [questionId]: optionId,
        }));

        const currentAttempt = attempt ?? createAttempt.data;

        if (!currentAttempt) return;

        const existingResponse = responsesByQuestionId[questionId];

        const payload = {
            attemptId: currentAttempt.id,
            questionId,
            selectedOptionId: optionId,
            answeredAt: new Date().toISOString(),
        };

        if (existingResponse) {
            updateResponse.mutate({
                responseId: existingResponse.id,
                payload,
            });
        } else {
            saveResponse.mutate(payload);
        }
    };

    const handleSubmit = () => {
        const currentAttempt = attempt ?? createAttempt.data;

        if (!currentAttempt) return;

        updateAttempt.mutate(
            {
                attemptId: currentAttempt.id,
                payload: {
                    quizId: currentAttempt.quizId,
                    studentId: currentAttempt.studentId,
                    status: "completed",
                    startedAt: currentAttempt.startedAt,
                    endedAt: new Date().toISOString(),
                    score: currentAttempt.score,
                    percentage: currentAttempt.percentage,
                },
            },
            {
                onSuccess: (updatedAttempt) => {
                    console.log("submit success", updatedAttempt);
                    onQuizCompleted?.(updatedAttempt);
                },
                onError: (err) => {
                    console.error("submit onError fired", err);
                },
            },

        );

        //     THEN GO TO A QUIZ SUBMIITED PAGE TODO
    };

    const len_of_questions = quiz.questions.length;

    const isSavingResponse = saveResponse.isPending || updateResponse.isPending;
    const isSubmitting = updateAttempt.isPending;
    const isStarting = createAttempt.isPending;
    const currentAttempt = attempt ?? createAttempt.data;

    if (isAttemptLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="font-geist-semibold tracking-[-1px]">Loading quiz...</p>
            </div>
        );
    }

    if (isAttemptError && !attemptNotFound && !currentAttempt) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="font-geist-semibold tracking-tighter  text-red-600">
                    Failed to load quiz attempt.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full  h-full flex flex-col">
            <section className={"w-full h-[30vh] justify-end flex flex-col items-start gap-2"}>
                <b className="text-[16px] tracking-tighter text-bg bg-[#1e2914] p-1 rounded px-2 mb-2">Quiz</b>
                <p className="text-5xl font-geist-semibold max-w-md leading-9 tracking-[-5px] text-left">{quiz.title}</p>
            </section>
            <section className={"w-full mt-5 mb-14 flex flex-col items-start gap-2"}>
                <p className="text-left font-anthropic-text tracking-tighter max-w-3xl text-[20px]">
                    <Markdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                    >
                        {quiz.description}
                    </Markdown>
                </p>
            </section>

            {!hasStarted ? (
                <section className="w-full flex flex-col items-center justify-center gap-4 py-10">
                    <p className="font-anthropic-display text-xl text-[#636363]">
                        {len_of_questions} question{len_of_questions === 1 ? "" : "s"}
                    </p>
                    <button
                        type="button"
                        disabled={isStarting || !quiz.id || !studentId}
                        onClick={handleStart}
                        className="bg-[#1e2914] text-white px-6 py-3 rounded hover:bg-[#1e2914]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isStarting ? "Starting..." : "Start Quiz"}
                    </button>
                </section>
            ) : (
                <>
                    <section className={"w-full flex flex-col items-start gap-6"}>
                        {
                            quiz.questions.map((question, index) => (
                                <div key={index} className="w-full flex flex-col items-start gap-2">
                                    <div className="flex justify-between items-center w-full">
                                        <p className="font-anthropic-display pb-4 text-6xl">{index + 1}<sub className="text-4xl text-[#636363]">/{len_of_questions}</sub></p>
                                        <p className="font-anthropic-display text-xl">{question.points} marks</p>
                                    </div>
                                    <p className="text-left  tracking-tighter max-w-3xl text-[18px]">
                                        <Markdown
                                            remarkPlugins={[remarkMath]}
                                            rehypePlugins={[rehypeKatex]}
                                        >
                                            {question.prompt}
                                        </Markdown>
                                    </p>
                                    <QuizQuestionOptions
                                        options={question.options}
                                        value={answers[question.id]}
                                        onValueChange={
                                            (optionId) => handleAnswerChange(question.id, optionId,)
                                        }
                                    />
                                </div>
                            ))
                        }
                    </section>
                    <section className={"w-full flex justify-center items-center"}>
                        <button
                            type="button"
                            disabled={!currentAttempt || isSavingResponse || isSubmitting}
                            onClick={handleSubmit}
                            className="bg-[#1e2914] text-white px-4 py-2 rounded hover:bg-[#1e2914]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </section>
                </>
            )}
        </div>
    );
};

export default QuizRenderer;