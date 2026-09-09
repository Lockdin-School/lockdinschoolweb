export type QuizAttemptStatus = "inProgress" | "completed" | "abandoned";

export interface QuizQuestionResponse {
    id: string;
    attemptId: string;
    questionId: string;
    selectedOptionId: string | null;
    isCorrect: boolean;
    answeredAt: string;
}

export interface QuizQuestionResponseNew {
    attemptId: string;
    questionId: string;
    selectedOptionId: string | null;
    answeredAt: string;
}

export interface QuizAttempt {
    id: string;
    quizId: string;
    studentId: string;
    status: QuizAttemptStatus;
    responses: QuizQuestionResponse[];
    startedAt: string;
    endedAt: string | null;
    score: number | null;
    percentage: number | null;
    createdAt: string;
    updatedAt: string;
}

export interface QuizAttemptNew {
    quizId: string;
    studentId: string;
    status: QuizAttemptStatus;
    startedAt: string;
    endedAt: string | null;
    score: number | null;
    percentage: number | null;
}