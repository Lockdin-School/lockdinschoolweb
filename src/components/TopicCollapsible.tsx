import {AnimatePresence, motion} from "motion/react";
import {useParams, Link} from "@tanstack/react-router"
import {HugeiconsIcon} from "@hugeicons/react";
import {ChevronDownIcon, DotIcon} from "@hugeicons/core-free-icons";
import {useState} from "react";
import {useMaterials} from "../api/materials/queries/useMaterials.ts";
import type {TopicResponse} from "../api/topics/models/TopicResponse.ts";

interface TopicCollapsibleProps {
    subjectId: string;
    topic: TopicResponse;
    index: number;
    isOpen: boolean;
    onToggle: () => void;
}

const fillVariants = {
    rest: {x: "-100%"},
    hover: {x: "0%"},
};
const textVariants = {
    rest: {color: "#e2e2e2"}, // gray-700
    hover: {color: "#000"},
};
const iconVariants = {
    rest: {color: "#e2e2e2", x: "-100%"}, // gray-700
    hover: {color: "#000", x: "0%"},
};
const topicVariants = {
    rest: {color: "#929292"}, // gray-700
    hover: {color: "#000"},
};

export function TopicCollapsible(
    {
        topic,
        subjectId,
        index,
    }: TopicCollapsibleProps
) {
    const params = useParams({
        strict: false,
    });
    const {materialId} = params;
    const [isOpen, setIsOpen] = useState(false);
    const {
        data: materials = [],
        isLoading,
        isError,
        error,
    } = useMaterials(topic.id, isOpen);


    if (isError) return (
        <div>Failed to load materials: {error.message}</div>
    )

    return (
        <div className="overflow-hidden rounded border border-border">
            <motion.button
                onClick={() => setIsOpen(prev => !prev)}
                className="relative flex flex-col w-full px-5 py-4"
                initial="rest"
                whileHover="hover"
                animate={isOpen ? "hover" : "rest"}
            >
                <motion.div
                    className="absolute inset-0 bg-accent"
                    variants={fillVariants}
                    transition={{duration: 0.2}}
                />

                <div className="relative z-10 flex items-center justify-between">
                    <div className="flex flex-col items-start gap-1">
                        <motion.span
                            className="text-xs"
                            variants={topicVariants}
                        >
                            Topic {index + 1}
                        </motion.span>

                        <motion.span variants={textVariants}>
                            {topic.title}
                        </motion.span>
                    </div>

                    <motion.div
                        variants={iconVariants}
                        animate={{rotate: isOpen ? 180 : 0}}
                        transition={{duration: 0.25}}
                    >
                        <HugeiconsIcon icon={ChevronDownIcon}/>
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
                        className="overflow-hidden"
                    >
                        {isLoading && (<div className={"w-full bg-code-bg h-10"}></div>)}
                        {
                            materials.map((material, index) => {
                                const activeLink = materialId === material.material_id;
                                switch (material.material_type) {
                                    case "Lesson":
                                        return (
                                            <Link
                                                key={index}
                                                to="/subjects/$subjectId/topics/$topicId/lessons/$materialId"
                                                params={{
                                                    subjectId,
                                                    topicId: topic.id,
                                                    materialId: material.material_id,
                                                }}
                                                className={` ${activeLink && "bg-accent-bg"} flex flex-col items-start gap-1 border-t border-border px-5 py-3 text-sm tracking-wide text-start font-geist-medium  hover:cursor-pointer hover:bg-accent-bg`}>
                                                {/* TODO: When progress tracking service is live.*/}
                                                <p className={`text-xs text-[#929292] font-space-semibold flex items-center`}>{material.display_order} / {materials.length} <HugeiconsIcon icon={DotIcon} /> {material.material_type}</p>
                                                {material.title}
                                            </Link>
                                        )
                                    case "Quiz":
                                        return (
                                            <Link
                                                key={index}
                                                to="/subjects/$subjectId/topics/$topicId/quizzes/$materialId"
                                                params={{
                                                    subjectId,
                                                    topicId: topic.id,
                                                    materialId: material.material_id,
                                                }}
                                                className={` ${activeLink && "bg-accent-bg"} flex flex-col items-start gap-1 border-t border-border px-5 py-3 text-sm tracking-wide text-start font-geist-medium  hover:cursor-pointer hover:bg-accent-bg`}>
                                                {/* TODO: When progress tracking service is live.*/}
                                                <p className={`text-xs text-[#929292] font-space-semibold flex items-center`}>{material.display_order} / {materials.length} <HugeiconsIcon icon={DotIcon} /> {material.material_type}</p>
                                                {material.title}
                                            </Link>
                                        )
                                    case "Concept":
                                        return (
                                            <Link
                                                key={index}
                                                to="/concepts/$materialId"
                                                params={{
                                                    materialId: material.material_id,
                                                }}
                                                className={` ${activeLink && "bg-accent-bg"} flex flex-col items-start gap-1 border-t border-border px-5 py-3 text-sm tracking-wide text-start font-geist-medium  hover:cursor-pointer hover:bg-accent-bg`}>
                                                {/* TODO: When progress tracking service is live.*/}
                                                <p className={`text-xs text-[#929292] font-space-semibold flex items-center`}>{material.display_order} / {materials.length} <HugeiconsIcon icon={DotIcon} /> {material.material_type}</p>
                                                {material.title}
                                            </Link>
                                        )
                                    default:
                                        throw new Error("Unknown Material Type")

                                }
                            })
                        }
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}