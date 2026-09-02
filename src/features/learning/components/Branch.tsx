import { motion } from "motion/react";

type BranchProps = {
    height?: number;
    width?: number;
    delay?: number;
};

export function Branch({
                           height = 40,
                           width = 32,
                           delay = 0,
                       }: BranchProps) {
    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className="shrink-0 overflow-visible"
            aria-hidden="true"
        >
            <motion.path
                d={`M4 0 V${height / 2} H${width - 4}`}
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
                    duration: 0.35,
                    delay,
                    ease: "easeOut",
                }}
            />
        </svg>
    );
}