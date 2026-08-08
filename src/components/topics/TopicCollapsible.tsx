import {AnimatePresence, motion} from "motion/react";
import {HugeiconsIcon} from "@hugeicons/react";
import {
    ChevronDownIcon,
} from "@hugeicons/core-free-icons";
import type {TopicResponse} from "../../api/topics/models/TopicResponse.ts";
import {useState} from "react";
import type {GetMaterialsResponse} from "../../api/materials/models/MaterialResponse.ts";
import {getMaterialsByTopicId} from "../../api/materials/materials.ts";
import {Link} from "react-router";

interface TopicCollapsibleProps {
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
        index,
    }: TopicCollapsibleProps
) {

    const [materials, setMaterials] = useState<GetMaterialsResponse>([]);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleGetMaterialsByTopic = async (topicId: string) => {
        setOpenIndex(isOpen ? null : index)
        try {
            const materialsResult = await getMaterialsByTopicId(topicId);
            setMaterials(materialsResult);
        } catch (e) {
            console.error("Error fetching subjects: ", e);
        }
    };
    const isOpen = openIndex === index;

    return (
        <div className="overflow-hidden border border-border">
            <motion.button
                onClick={handleGetMaterialsByTopic.bind(null, topic.id)}
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
                        {materials.map((material, index) => {
                            let page;
                            let colorCode;
                            switch (material.material_type) {
                                case "Lesson":
                                    page = 'lessons';
                                    colorCode = "text-[#aa2277]"
                                    break;
                                case "Resource":
                                    page = 'resources';
                                    colorCode = "text-[#bb99fd]"
                                    break;
                                case "Quiz":
                                    page = 'quizzes';
                                    break;
                                case "Exercise":
                                    page = 'exercises';
                                    break;
                                case "Assignment":
                                    page = 'assignments'
                                    break;
                                default:
                                    throw new Error("Unknow Material Type");
                            }
                            return (
                                <Link
                                    key={index}
                                    to={`${page}/${material.material_id}`}
                                    className="flex flex-col items-start gap-1 border-t border-border px-5 py-3 text-sm tracking-wide text-start font-geist-medium hover:cursor-pointer hover:bg-accent-bg" >
                                    {/* TODO: When progress tracking service is live.*/}
                                    <p className={`text-xs ${colorCode}`}>{material.material_type}</p>
                                    {material.title}
                                </Link>
                            )
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}