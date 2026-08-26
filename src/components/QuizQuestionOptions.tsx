import {useId} from "react";

export type QuizOption = {
    id: string;
    text: string;
    order: number;
};

type QuizQuestionOptionsProps = {
    options: QuizOption[];
    value?: string;
    onValueChange?: (value: string) => void;
};

export function QuizQuestionOptions(
    {
        options,
        value,
        onValueChange,
    }: QuizQuestionOptionsProps) {
    const groupId = useId();

    return (
        <div
            role="radiogroup"
            aria-label="Question options"
            className="space-y-3"
        >
            {options
                .sort((a, b) => a.order - b.order)
                .map((option) => {
                    const inputId = `${groupId}-${option.id}`;
                    const selected = value === option.id;

                    return (
                        <label
                            key={option.id}
                            htmlFor={inputId}
                            className={`
                                group flex cursor-pointer items-center gap-4
                                rounded-lg border p-4
                                transition-colors
                                ${
                                selected
                                    ? "border-foreground bg-foreground/5"
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
                                onChange={() =>
                                    onValueChange?.(option.id)
                                }
                                className="
                                    size-4
                                    accent-foreground
                                "
                            />

                            <span className="flex-1 text-left text-sm leading-6">
                                {option.text}
                            </span>
                        </label>
                    );
                })}
        </div>
    );
}