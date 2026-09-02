import { subjects } from "@/features/learning/data/subjects.ts";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { TopicBranch } from "./TopicBranch";

export function SubjectsList() {
    const [expandedSubject, setExpandedSubject] =
        useState<string | null>(null);

    return (
        <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
                Subjects
            </p>

            {subjects.map((subject) => {
                const isExpanded =
                    expandedSubject === subject.id;

                return (
                    <div key={subject.id}>
                        {/* Subject */}
                        <button
                            onClick={() =>
                                setExpandedSubject(
                                    isExpanded
                                        ? null
                                        : subject.id
                                )
                            }
                            className="flex items-center gap-x-2 text-base"
                        >
                            <motion.span
                                animate={{
                                    rotate: isExpanded ? 90 : 0,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                            >
                                →
                            </motion.span>

                            <span>{subject.name}</span>
                        </button>

                        {/* Topics */}
                        <AnimatePresence initial={false}>
                            {isExpanded && (
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
                                        duration: 0.35,
                                        ease: "easeInOut",
                                    }}
                                    className="overflow-hidden"
                                >
                                    <div className="ml-4">
                                        {subject.topics.map(
                                            (topic, index) => (
                                                <motion.div
                                                    key={topic.id}
                                                    initial={{
                                                        opacity: 0,
                                                        x: -8,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        x: -8,
                                                    }}
                                                    transition={{
                                                        delay:
                                                            index *
                                                            0.1,
                                                        duration: 0.3,
                                                        ease: "easeOut",
                                                    }}
                                                    className="flex items-center"
                                                >
                                                    <TopicBranch
                                                        delay={
                                                            index *
                                                            0.1
                                                        }
                                                    />

                                                    <span className="text-sm">
                                                        {topic.name}
                                                    </span>
                                                </motion.div>
                                            )
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}