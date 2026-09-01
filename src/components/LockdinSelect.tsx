import {useEffect, useRef, useState} from "react";
import {HugeiconsIcon} from "@hugeicons/react";
import {ArrowDown01Icon} from "@hugeicons/core-free-icons";

export type LockdinSelectOption<T extends string | number> = {
    label: string;
    value: T;
};

type LockdinSelectProps<T extends string | number> = {
    value: T;
    options: LockdinSelectOption<T>[];
    onChange: (value: T) => void;
    placeholder?: string;
    disabled?: boolean;
};

export function LockdinSelect<T extends string | number>({
                                                           value,
                                                           options,
                                                           onChange,
                                                           placeholder = "Select an option",
                                                           disabled = false,
                                                       }: LockdinSelectProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((option) => option.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectRef.current &&
                !selectRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={selectRef} className="relative">
            <button
                type="button"
                disabled={disabled}
                onClick={() => setIsOpen((current) => !current)}
                className="flex w-full items-center justify-between rounded-lg border border-[#dbe8dd] bg-transparent px-4 py-3 font-inter text-xs text-[#1e2914] outline-none transition hover:border-[#b8d4bd] focus:border-[#1e2914] disabled:cursor-not-allowed disabled:opacity-60"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span>{selectedOption?.label ?? placeholder}</span>
                <HugeiconsIcon
                    icon={ArrowDown01Icon}
                    size={18}
                    color="#1e2914"
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {isOpen && !disabled && (
                <div className="absolute left-0 top-[calc(100%+0.5rem)] z-30 w-full overflow-hidden rounded-xl border border-[#dbe8dd] bg-white p-1 shadow-[0_18px_45px_rgba(30,41,20,0.12)]">
                    <div role="listbox" className="max-h-64 space-y-1 overflow-y-auto">
                        {options.map((option) => {
                            const isSelected = option.value === value;

                            return (
                                <button
                                    key={String(option.value)}
                                    type="button"
                                    role="option"
                                    aria-selected={isSelected}
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left font-inter text-xs transition ${
                                        isSelected
                                            ? "bg-[#edf8ef] text-[#1e2914]"
                                            : "text-[#7b7194] hover:bg-[#f8fff9] hover:text-[#1e2914]"
                                    }`}
                                >
                                    <span>{option.label}</span>
                                    {isSelected && (
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#1e2914]" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}