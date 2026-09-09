import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    createQuizAttempt,
    getQuizAttemptByStudentId,
    saveQuizQuestionResponse,
    updateQuizAttempt, updateQuizQuestionResponse
} from "@/api/quizzes/quizAttempts.ts";
import type {QuizAttemptNew, QuizQuestionResponseNew} from "@/api/quizzes/models/Attempt.ts";

export const useQuizAttempt = (quizId: string, studentId: string) => {
    return useQuery({
        queryKey: ["quizAttempt", quizId, studentId],
        queryFn: () => getQuizAttemptByStudentId(quizId, studentId),
        enabled: !!quizId && !!studentId,
        retry: (failureCount, error) => {
            // Don't retry a 404 — it just means no attempt exists yet
            if ((error as any)?.response?.status === 404) return false;
            return failureCount < 3;
        },
    });
};

export const useCreateQuizAttempt = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: QuizAttemptNew) => createQuizAttempt(payload),
        onSuccess: (attempt) => {
            queryClient.setQueryData(
                ["quizAttempt", attempt.quizId, attempt.studentId],
                attempt,
            );

            queryClient.invalidateQueries({
                queryKey: ["quizAttempt", attempt.quizId, attempt.studentId],
            }).then();
        },
        onError: (err) => {
            console.error("submit failed", err);
        },
    });
};

export const useUpdateQuizAttempt = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
                         attemptId,
                         payload,
                     }: {
            attemptId: string;
            payload: QuizAttemptNew;
        }) => updateQuizAttempt(attemptId, payload),
        onSuccess: (attempt) => {
            queryClient.setQueryData(
                ["quizAttempt", attempt.quizId, attempt.studentId],
                attempt,
            );

            queryClient.invalidateQueries({
                queryKey: ["quizAttempt", attempt.quizId, attempt.studentId],
            }).then();
        },
    });
};

export const useSaveQuizQuestionResponse = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: QuizQuestionResponseNew) =>
            saveQuizQuestionResponse(payload),
        onSuccess: (attempt) => {
            queryClient.setQueryData(
                ["quizAttempt", attempt.quizId, attempt.studentId],
                attempt,
            );

            queryClient.invalidateQueries({
                queryKey: ["quizAttempt", attempt.quizId, attempt.studentId],
            }).then();
        },
    });
};

export const useUpdateQuizQuestionResponse = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
                         responseId,
                         payload,
                     }: {
            responseId: string;
            payload: QuizQuestionResponseNew;
        }) => updateQuizQuestionResponse(responseId, payload),
        onSuccess: (attempt) => {
            queryClient.setQueryData(
                ["quizAttempt", attempt.quizId, attempt.studentId],
                attempt,
            );

            queryClient.invalidateQueries({
                queryKey: ["quizAttempt", attempt.quizId, attempt.studentId],
            }).then();
        },
    });
};