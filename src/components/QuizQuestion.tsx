import {type QuizOption, QuizQuestionOptions} from "./QuizQuestionOptions.tsx";
import {useState} from "react";


export type QuizQuestion = {
    id: string;
    prompt: string;
    points: number;
    order: number;
    options: QuizOption[];
};

export function QuizQuestionItem({
                          question,
                          number,
                      }: {
    question: QuizQuestion;
    number: number;
}) {

    const [answers, setAnswers] = useState<Record<string, string>>({});

    return (
        <section className="space-y-5">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Question {number}
                    </span>

                    <span className="text-xs text-muted-foreground">
                        {question.points}{" "}
                        {question.points === 1 ? "point" : "points"}
                    </span>
                </div>

                <h2 className="text-lg font-medium py-10 leading-7">
                    {question.prompt}
                </h2>
            </div>

            <QuizQuestionOptions
                options={question.options}
                value={answers[question.id]}
                onValueChange={(value) =>
                    setAnswers((previous) => ({
                        ...previous,
                        [question.id]: value,
                    }))
                }
            />
        </section>
    );
}