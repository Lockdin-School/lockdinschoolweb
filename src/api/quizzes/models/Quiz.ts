export type QuizDifficulty = 'easy' | 'medium' | 'hard';

export type QuizQuestionType = 'multipleChoice';

export type QuizOption = {
    id: string,
    questionId: string,
    text: string,
    order: number
}

export type QuizQuestion = {
    id: string
    quizId: string
    questionType: QuizQuestionType
    prompt: string
    points: number
    order: number
    options: QuizOption[]
}
export type Quiz = {
    id: string
    lessonId: string
    title: string
    description: string | null
    difficulty: QuizDifficulty
    passingScore: number
    estimatedDurationMinutes: number
    questions: QuizQuestion[]
    createdAt: string
    updatedAt: string
}