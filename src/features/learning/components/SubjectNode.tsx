import {
    AnimatePresence,
    motion,
} from "motion/react";
import {useState} from "react";

import {HugeiconsIcon} from "@hugeicons/react";
import {CancelIcon, ChevronRightIcon} from "@hugeicons/core-free-icons";
import type {SubjectResponse} from "@/api/subjects/models/SubjectResponse.ts";
import {useTopics} from "@/api/topics/queries/useTopics.ts";
import {TopicTree} from "@/features/learning/components/TopicTree.tsx";

type SubjectNodeProps = {
    subject: SubjectResponse;
};

export function SubjectNode({
                                subject,
                            }: SubjectNodeProps) {
    const [expanded, setExpanded] =
        useState(false);

    const {data: topics, isError, isLoading, error} = useTopics(subject.id);

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
                    <b className="tracking-tighter underline">{subject.title}</b>
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
                        {isError && (<div>{error.message}</div>)}
                        {isLoading && (<div className="py-8">Loading...</div>)}
                        {topics && <TopicTree topics={topics} />}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}