import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import type { Topic } from "../data/subjects";
import { Branch } from "./Branch";
import {HugeiconsIcon} from "@hugeicons/react";
import {ArrowRight02Icon, ChevronRightIcon} from "@hugeicons/core-free-icons";

type TopicNodeProps = {
    topic: Topic;
    index: number;
};

export function TopicNode({
                              topic,
                              index,
                          }: TopicNodeProps) {
    const [expanded, setExpanded] =
        useState(false);

    return (
        <motion.div
            initial={{
                opacity: 0,
                x: -8,
            }}
            animate={{
                opacity: 1,
                x: 0,
            }}
            transition={{
                duration: 0.3,
                delay: index * 0.08,
                ease: "easeOut",
            }}
        >
            <button
                onClick={() =>
                    setExpanded((value) => !value)
                }
                className="
                    flex
                    items-center
                    gap-2
                    text-foreground
                    transition-colors
                    hover:text-foreground/70
                "
            >
                <b className="tracking-tighter">{topic.name}</b>
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
                                <HugeiconsIcon size={20} icon={ArrowRight02Icon} />
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
                                <HugeiconsIcon size={20} icon={ChevronRightIcon} />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.span>


            </button>

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
                            duration: 0.3,
                        }}
                        className="overflow-hidden"
                    >
                        <div className="ml-5 mt-1">
                            {topic.concepts.map(
                                (concept, conceptIndex) => (
                                    <motion.div
                                        key={concept.id}
                                        className="
                                            flex
                                            items-center
                                            text-sm


                                            text-muted-foreground
                                        "
                                        initial={{
                                            opacity: 0,
                                            x: -6,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            x: 0,
                                        }}
                                        transition={{
                                            delay:
                                                conceptIndex *
                                                0.07,
                                            duration: 0.25,
                                        }}
                                    >
                                        <Branch
                                            height={28}
                                            width={28}
                                            delay={
                                                conceptIndex *
                                                0.07
                                            }
                                        />

                                        <b className={"tracking-tighter"}>
                                            {concept.name}
                                        </b>
                                    </motion.div>
                                )
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}