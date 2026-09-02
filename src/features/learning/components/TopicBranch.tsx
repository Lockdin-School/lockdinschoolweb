import { motion } from "motion/react";

type TopicBranchProps = {
    delay?: number;
};

export function TopicBranch({ delay = 0 }: TopicBranchProps) {
    return (
        <svg
            width="100"
            height="50"
            viewBox="0 0 100 900"
            className="shrink-0 overflow-visible"
            aria-hidden="true"
        >
            <motion.path
                d="M4 0 V20 H200"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-muted-foreground"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                    duration: 0.35,
                    delay,
                    ease: "easeOut",
                }}
            />
        </svg>
    );
}