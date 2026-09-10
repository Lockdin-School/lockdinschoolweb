import { AnimatePresence, motion } from "motion/react";
import { useParams, Link } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    ChevronDownIcon,
} from "@hugeicons/core-free-icons";
import { useState } from "react";
import { useMaterials } from "../api/materials/queries/useMaterials.ts";
import type { TopicResponse } from "../api/topics/models/TopicResponse.ts";

interface TopicCollapsibleProps {
    subjectId: string;
    topic: TopicResponse;
    index: number;
    onSelect?: () => void;
}

const fillVariants = {
    rest: { x: "-100%" },
    hover: { x: "0%" },
};

const textVariants = {
    rest: { color: "#000" },
    hover: { color: "#000" },
};



export function TopicCollapsible({
    topic,
    subjectId,
    onSelect,
}: TopicCollapsibleProps) {
    const params = useParams({
        strict: false,
    });

    const { materialId } = params;

    const [isOpen, setIsOpen] = useState(false);

    const {
        data: materials = [],
        isLoading,
        isError,
        error,
    } = useMaterials(topic.id, isOpen);

    if (isError) {
        return (
            <div>
                Failed to load materials: {error.message}
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded border border-border">
            <motion.button
                onClick={() => setIsOpen((prev) => !prev)}
                className="relative flex  w-full px-5 py-4"
                initial="rest"
                whileHover="hover"
                animate={isOpen ? "hover" : "rest"}
            >
                <motion.div
                    className="absolute w-full inset-0 bg-accent"
                    variants={fillVariants}
                    transition={{ duration: 0.2 }}
                />

                <div className="z-10 flex w-full items-center justify-end">
                    <motion.div className="flex flex-col text-left w-full items-start gap-1">
                        <motion.span variants={textVariants}>
                            {topic.title}
                        </motion.span>
                    </motion.div>

                    <motion.div
                        animate={{ rotate: isOpen ? -180 : -90 }}
                        transition={{ duration: 0.25 }}
                    >
                        <HugeiconsIcon icon={ChevronDownIcon} />
                    </motion.div>
                </div>
            </motion.button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{
                            height: 0,
                            opacity: 0,
                        }}
                        animate={{
                            height: "auto",
                            opacity: 1,
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                        }}
                        transition={{
                            height: {
                                duration: 0.3,
                                ease: "easeInOut",
                            },
                            opacity: {
                                duration: 0.2,
                            },
                        }}
                        className="overflow-hidden bg-accent"
                    >
                        {isLoading && (
                            <div className="w-full bg-code-bg h-10" />
                        )}

                        {materials.map((material) => {
                            const activeLink =
                                materialId === material.material_id;

                            const commonClassName = `
${activeLink ? "bg-accent-bg" : ""}
flex flex-col items-start gap-1
border-t border-border
px-5 py-3
text-sm tracking-wide text-start
font-geist-medium
hover:cursor-pointer
hover:bg-accent-bg
    `;

                            const materialInfo = (
                                <b className="text-[12px] uppercase self-start  bg-[#1e2914] text-bg p-1 rounded px-2 mb-2">
                                    {material.material_type}
                                </b>
                            );

                            switch (material.material_type) {
                                case "Lesson":
                                    return (
                                        <Link
                                            key={material.material_id}
                                            to="/subjects/$subjectId/topics/$topicId/lessons/$materialId"
                                            params={{
                                                subjectId,
                                                topicId: topic.id,
                                                materialId: material.material_id,
                                            }}
                                            className={commonClassName}
                                            onClick={onSelect}
                                        >
                                            {materialInfo}
                                            {material.title}
                                        </Link>
                                    );

                                case "Quiz":
                                    return (
                                        <Link
                                            key={material.material_id}
                                            to="/subjects/$subjectId/topics/$topicId/quizzes/$materialId"
                                            params={{
                                                subjectId,
                                                topicId: topic.id,
                                                materialId: material.material_id,
                                            }}
                                            className={commonClassName}
                                            onClick={onSelect}
                                        >
                                            {materialInfo}
                                            {material.title}
                                        </Link>
                                    );

                                case "Concept":
                                    return (
                                        <Link
                                            key={material.material_id}
                                            to="/concepts/$materialId"
                                            params={{
                                                materialId: material.material_id,
                                            }}
                                            className={commonClassName}
                                            onClick={onSelect}
                                        >
                                            {materialInfo}
                                            {material.title}
                                        </Link>
                                    );

                                default:
                                    throw new Error(
                                        "Unknown Material Type"
                                    );
                            }
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
