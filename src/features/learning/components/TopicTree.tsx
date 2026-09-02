import { motion } from "motion/react";

import type { Topic } from "../data/subjects";
import { TopicNode } from "./TopicNode";

type TopicTreeProps = {
    topics: Topic[];
};

export function TopicTree({
                              topics,
                          }: TopicTreeProps) {
    const height = topics.length * 48;

    return (
        <div className="relative ml-6 mt-2">
            {/* Continuous vertical spine */}
            <svg
                className="
                    pointer-events-none
                    absolute
                    left-0
                    top-0
                    overflow-visible
                "
                width="32"
                height={height}
                viewBox={`0 0 32 ${height}`}
                aria-hidden="true"
            >
                <motion.path
                    d={`M4 0 V${height}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-border"
                    initial={{
                        pathLength: 0,
                    }}
                    animate={{
                        pathLength: 1,
                    }}
                    transition={{
                        duration: 0.7,
                        ease: "easeOut",
                    }}
                />
            </svg>

            <div className="relative space-y-3">
                {topics.map((topic, index) => (
                    <div
                        key={topic.id}
                        className="flex items-start"
                    >
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            className="
                                shrink-0
                                overflow-visible
                            "
                            aria-hidden="true"
                        >
                            <motion.path
                                d="M4 16 H28"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                                className="text-border"
                                initial={{
                                    pathLength: 0,
                                }}
                                animate={{
                                    pathLength: 1,
                                }}
                                transition={{
                                    duration: 0.3,
                                    delay:
                                        0.55 +
                                        index * 0.1,
                                }}
                            />
                        </svg>

                        <TopicNode
                            topic={topic}
                            index={index}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}