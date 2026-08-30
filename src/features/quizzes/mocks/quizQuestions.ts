import type {QuizQuestion} from "@/components/QuizQuestion.tsx";

export const mockQuizQuestions: QuizQuestion[] = [
    {
        id: "q1",
        prompt: "Which statement best describes a mathematical function?",
        points: 1,
        order: 1,
        options: [
            {
                id: "q1-a",
                text: "A relation where every input has exactly one output",
                order: 1,
            },
            {
                id: "q1-b",
                text: "A relation where every output has exactly one input",
                order: 2,
            },
            {
                id: "q1-c",
                text: "A relation where every input can have multiple outputs",
                order: 3,
            },
            {
                id: "q1-d",
                text: "Any equation containing two variables",
                order: 4,
            },
        ],
    },
    {
        id: "q2",
        prompt: "If f(x) = 2x + 3, what is f(4)?",
        points: 1,
        order: 2,
        options: [
            {
                id: "q2-a",
                text: "8",
                order: 1,
            },
            {
                id: "q2-b",
                text: "11",
                order: 2,
            },
            {
                id: "q2-c",
                text: "14",
                order: 3,
            },
            {
                id: "q2-d",
                text: "5",
                order: 4,
            },
        ],
    },
    {
        id: "q3",
        prompt: "What is the domain of a function?",
        points: 1,
        order: 3,
        options: [
            {
                id: "q3-a",
                text: "The set of possible output values",
                order: 1,
            },
            {
                id: "q3-b",
                text: "The set of possible input values",
                order: 2,
            },
            {
                id: "q3-c",
                text: "The maximum value of the function",
                order: 3,
            },
            {
                id: "q3-d",
                text: "The gradient of the function",
                order: 4,
            },
        ],
    },
    {
        id: "q4",
        prompt: "Which of the following represents a linear function?",
        points: 1,
        order: 4,
        options: [
            {
                id: "q4-a",
                text: "f(x) = x² + 2",
                order: 1,
            },
            {
                id: "q4-b",
                text: "f(x) = 3x - 5",
                order: 2,
            },
            {
                id: "q4-c",
                text: "f(x) = 2ˣ",
                order: 3,
            },
            {
                id: "q4-d",
                text: "f(x) = 1/x",
                order: 4,
            },
        ],
    },
    {
        id: "q5",
        prompt: "If f(x) = x² - 4, which value of x makes f(x) = 5?",
        points: 2,
        order: 5,
        options: [
            {
                id: "q5-a",
                text: "x = 1",
                order: 1,
            },
            {
                id: "q5-b",
                text: "x = 3",
                order: 2,
            },
            {
                id: "q5-c",
                text: "x = ±3",
                order: 3,
            },
            {
                id: "q5-d",
                text: "x = ±1",
                order: 4,
            },
        ],
    },
    {
        id: "q6",
        prompt: "What does the y-intercept of a function represent on a graph?",
        points: 1,
        order: 6,
        options: [
            {
                id: "q6-a",
                text: "The value of x when y = 0",
                order: 1,
            },
            {
                id: "q6-b",
                text: "The value of y when x = 0",
                order: 2,
            },
            {
                id: "q6-c",
                text: "The gradient of the function",
                order: 3,
            },
            {
                id: "q6-d",
                text: "The maximum value of y",
                order: 4,
            },
        ],
    },
];