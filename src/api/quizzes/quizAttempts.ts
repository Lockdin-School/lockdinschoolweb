import type {QuizAttempt, QuizAttemptNew, QuizQuestionResponseNew} from "@/api/quizzes/models/Attempt.ts";
import {content_api} from "@/api/client.ts";

export const createQuizAttempt = async (
    payload: QuizAttemptNew,
): Promise<QuizAttempt> => {
    const response = await content_api.post<QuizAttempt>("/quiz-attempts", payload);

    if (!response) {
        throw new Error("Failed to create quiz attempt");
    }

    return response.data;
};

export const getQuizAttemptByStudentId = async (
    quizId: string,
    studentId: string,
): Promise<QuizAttempt> => {
    const response = await content_api.get<QuizAttempt>(
        `/quiz-attempts/quiz/${quizId}/student/${studentId}`,
    );

    if (!response) {
        throw new Error("Failed to fetch quiz attempt");
    }

    return response.data;
};

export const updateQuizAttempt = async (
    attemptId: string,
    payload: QuizAttemptNew,
): Promise<QuizAttempt> => {
    const response = await content_api.put<QuizAttempt>(
        `/quiz-attempts/${attemptId}`,
        payload,
    );

    if (!response) {
        throw new Error("Failed to update quiz attempt");
    }

    return response.data;
};

export const saveQuizQuestionResponse = async (
    payload: QuizQuestionResponseNew,
): Promise<QuizAttempt> => {
    const response = await content_api.post<QuizAttempt>(
        "/question-responses",
        payload,
    );

    if (!response) {
        throw new Error("Failed to save quiz question response");
    }

    return response.data;
};

export const updateQuizQuestionResponse = async (
    responseId: string,
    payload: QuizQuestionResponseNew,
): Promise<QuizAttempt> => {
    const response = await content_api.put<QuizAttempt>(
        `/question-responses/${responseId}`,
        payload,
    );

    if (!response) {
        throw new Error("Failed to update quiz question response");
    }

    return response.data;
};