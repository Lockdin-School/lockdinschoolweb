import {
    ArrowLeft02Icon,
    ArrowRight02Icon,
    CheckmarkCircle02Icon,
    ChevronDownIcon,
    Progress01Icon
} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import AppHeader from "../../components/AppHeader.tsx";
import {motion, AnimatePresence} from "motion/react";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {getTopicsBySubjectId} from "../../api/topics/topics.ts";
import type {GetTopicsResponse} from "../../api/topics/models/TopicResponse.ts";
import VideoPlayer from "../../components/VideoPlayer.tsx";

const fillVariants = {
    rest: { x: "-100%" },
    hover: { x: "0%" },
};

const textVariants = {
    rest: { color: "#e2e2e2" }, // gray-700
    hover: { color: "#000" },
};

const iconVariants = {
    rest: { color: "#e2e2e2", x: "-100%" }, // gray-700
    hover: { color: "#000", x: "0%" },
};

const topicVariants = {
    rest: { color: "#929292" }, // gray-700
    hover: { color: "#000" },
};

const Subject = () => {

    const params = useParams();
    const subjectId = params.subjectId;

    const [topics, setTopics] = useState<GetTopicsResponse>([]);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchTopicsBySubject = async (subjectId: string) => {
            try {
                const topics = await getTopicsBySubjectId(subjectId);
                setTopics(topics);
            } catch (e) {
                console.error("Error fetching subjects: ", e);
            }
        };

        fetchTopicsBySubject(subjectId!).then();

    }, [subjectId]);



    return (
        <div className="w-full gap-10 flex flex-col">
            {/*header*/}
            <AppHeader />
            {/*    MAIN LAYOUT    */}
            <div className="w-full  flex flex-col items-center">
                <main className={`w-[98vw] justify-between grid grid-cols-[20%_50%_20%]`}>
                    {/*    LIST OF TOPICS */}
                    <aside className="w-full flex flex-col relative">
                        {/*List of topics*/}
                        <section className="gap-1 p-1  flex flex-col w-full overflow-y-auto max-h-[calc(100vh-13vh)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {topics.map((topic, index) => {
                                const isOpen = openIndex === index;

                                return (
                                    <div
                                        key={topic.id}
                                        className="border border-border overflow-hidden"
                                    >
                                        <motion.button
                                            onClick={() =>
                                                setOpenIndex(isOpen ? null : index)
                                            }
                                            className="relative flex flex-col w-full px-5 py-4"
                                            initial="rest"
                                            whileHover="hover"
                                            animate={isOpen ? "hover" : "rest"}
                                        >
                                            <motion.div
                                                className="absolute inset-0 bg-accent"
                                                variants={fillVariants}
                                                transition={{ duration: 0.2 }}
                                            />

                                            <div className="relative z-10 flex justify-between items-center">
                                                <div className="flex items-start flex-col gap-1">
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
                                                    animate={{ rotate: isOpen ? 180 : 0 }}
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
                                                    className="overflow-hidden"
                                                >
                                                    {
                                                        Array.from({length: 5}).map((_, index)=> {
                                                            return (<div key={index} className="px-5 flex tracking-wide items-center hover:bg-accent-bg hover:cursor-pointer gap-3 text-start py-3 font-geist-medium text-xs border-t border-border">
                                                               <HugeiconsIcon icon={index <= 2 ? CheckmarkCircle02Icon : Progress01Icon } fill={index <= 2 ? "#fff" : "#333" } color={"#000"} size={22} /> Functions: #{index + 1}
                                                            </div>)
                                                        })
                                                    }
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </section>


                        {/*<button className="absolute bottom-4 border-border border right-4 bg-bg text-bg p-2 rounded-full shadow-lg hover:bg-opacity-90 transition-all">*/}
                        {/*    <HugeiconsIcon size={25} color={"#fff"} icon={ArrowDown02Icon}/>*/}
                        {/*</button>*/}


                    </aside>
                    {/*    LECTURE VIDEO VIEW AND DETAILS*/}
                    <section className="p-1 flex  flex-col gap-8 w-full">
                        <div className="w-full h-auto border border-border">
                            {/*    Video Component*/}
                            <VideoPlayer src={"/videos/Number13.mp4"} />
                        </div>
                        <div className="flex justify-between items-center">
                            <button className="flex w-[6rem] justify-center items-center gap-2 text-xs p-2 text-[#a2a2a2] border border-border">
                               <HugeiconsIcon icon={ArrowLeft02Icon} /> Previous
                            </button>
                            <button className="flex items-center bg-accent text-bg justify-center gap-2 text-sm w-[6rem] p-2 text-[#a2a2a2] border border-border">
                                Next <HugeiconsIcon icon={ArrowRight02Icon} />
                            </button>
                        </div>
                        {/*<p>{subjectId}</p>*/}
                    </section>
                    {/*    SOME TOOLS THAT I DONT KNOW YET*/}
                    {/*    LIST OF TOPICS */}

                </main>
            </div>
        </div>
    );
};

export default Subject;
