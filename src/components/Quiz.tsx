import {type QuizQuestion, QuizQuestionItem} from "./QuizQuestion.tsx";

type QuizProps = {
    title: string;
    questions: QuizQuestion[];
};


function QuizQuestions({ questions }: { questions: QuizQuestion[] }) {
    return (
        <div className="space-y-10">
            {questions
                .sort((a, b) => a.order - b.order)
                .map((question, index) => (
                    <QuizQuestionItem
                        key={question.id}
                        question={question}
                        number={index + 1}
                    />
                ))}
        </div>
    );
}

export function Quiz({ title, questions }: QuizProps) {
    return (
        <div className="mx-auto w-full max-w-3xl space-y-10">
            <header className="border-b w-full text-left border-border pb-6">
                <h1 className="text-3xl font-semibold tracking-tight">
                    {title}
                </h1>

                <p className="mt-2 text-sm text-[#929292]">
                    {questions.length} questions
                </p>
            </header>

            <QuizQuestions questions={questions} />
        </div>
    );
}