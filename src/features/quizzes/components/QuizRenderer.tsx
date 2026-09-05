import type {Quiz} from "@/api/quizzes/models/Quiz.ts";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import {useState} from "react";
import {QuizQuestionOptions} from "@/components/QuizQuestionOptions.tsx";

interface QuizRendererProps {
    quiz: Quiz;
}

const QuizRenderer = ({quiz}: QuizRendererProps) => {
    const [answers, setAnswers] = useState<Record<string, string>>({});

    const handleAnswerChange = (questionId: string, optionId: string,) => {
        setAnswers((current) => ({...current, [questionId]: optionId,}));
    };

    const len_of_questions = quiz.questions.length;

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
        </div>
    );
};

export default QuizRenderer;
