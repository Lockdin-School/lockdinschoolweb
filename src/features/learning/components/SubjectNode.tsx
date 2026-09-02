import {
    AnimatePresence,
    motion,
} from "motion/react";
import {useState} from "react";

import type {Subject} from "../data/subjects";
import {TopicTree} from "./TopicTree";
import {HugeiconsIcon} from "@hugeicons/react";
import {CancelIcon, ChevronRightIcon} from "@hugeicons/core-free-icons";

type SubjectNodeProps = {
    subject: Subject;
};

export function SubjectNode({
                                subject,
                            }: SubjectNodeProps) {
    const [expanded, setExpanded] =
        useState(false);

    return (
        <motion.div
            layout
            className="relative"
        >

            <div className="group
                    flex
                    items-center
                    font-medium
                    text-start text-lg gap-y-0 hover:cursor-pointer w-full gap-x-2">
                <button>
                    <b className="tracking-tighter underline">{subject.name}</b>
                </button>
                <button
                    onClick={() =>
                        setExpanded((value) => !value)
                    }
                    className="border border-border rounded-full"
                >
                    <motion.span className="relative flex h-5 w-5 items-center justify-center">
                        <AnimatePresence mode="wait" initial={false}>
                            {expanded ? (
                                <motion.span
                                    key="cancel"
                                    initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeOut",
                                    }}
                                    className="absolute"
                                >
                                    <HugeiconsIcon size={18} icon={CancelIcon} />
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="chevron"
                                    initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeOut",
                                    }}
                                    className="absolute"
                                >
                                    <HugeiconsIcon size={18} icon={ChevronRightIcon} />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.span>
                </button>
            </div>

            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            height: 0,
                        }}
                        animate={{
                            opacity: 1,
                            height: "auto",
                        }}
                        exit={{
                            opacity: 0,
                            height: 0,
                        }}
                        transition={{
                            duration: 0.45,
                            ease: "easeInOut",
                        }}
                        className="overflow-hidden"
                    >
                        <TopicTree
                            topics={subject.topics}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}