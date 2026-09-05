import {useId} from "react";
import type {QuizOption} from "@/api/quizzes/models/Quiz.ts";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

type QuizQuestionOptionsProps = {
    options: QuizOption[];
    value?: string;
    onValueChange?: (value: string) => void;
};

export function QuizQuestionOptions({
                                        options,
                                        value,
                                        onValueChange,
                                    }: QuizQuestionOptionsProps) {
    const groupId = useId();

    return (
        <div
            role="radiogroup"
            aria-label="Question options"
            className="w-full max-sm:px-4 px-10 flex flex-col"
        >
            {[...options]
                .sort((a, b) => a.order - b.order)
                .map((option) => {
                    const inputId = `${groupId}-${option.id}`;
                    const selected = value === option.id;

                    return (
                        <label
                            key={option.id}
                            htmlFor={inputId}
                            className={`
                                    group w-full flex cursor-pointer items-center gap-4
                                 p-4 transition-colors
                                             ${selected
                                ? "border-[#1e2914] border rounded bg-[#1e2914]/5"
                                : "border-border hover:bg-muted/50"
                            }
                                `}
                        >
                            <input
                                id={inputId}
                                type="radio"
                                name={groupId}
                                value={option.id}
                                checked={selected}
                                onChange={() => onValueChange?.(option.id)}
                                className="sr-only"
                            />

                            <span
                                className={`
                                    flex size-4 shrink-0 items-center justify-center
                                    rounded-full border
                                    ${selected
                                    ? "border-[#1e2914]"
                                    : "border-foreground/40"
                                }
                                   `}
                            >
                                {selected && (<span className="size-2 rounded-full bg-[#1e2914]"/>)}
                            </span>

                            <span className="flex-1 text-left text-[16px] leading-6 tracking-tight">
                                <Markdown
                                    remarkPlugins={[remarkMath]}
                                    rehypePlugins={[rehypeKatex]}
                                >
                                    {option.text}
                                </Markdown>
                            </span>
                        </label>
                    );
                })}
        </div>
    );
}

