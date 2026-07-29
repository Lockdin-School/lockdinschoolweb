import {ArrowLeft02Icon, ArrowRight02Icon, ChevronDownIcon} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import AppHeader from "../../components/AppHeader.tsx";
import {motion} from "motion/react";

const Subject = () => {

    const fillVariants = {
        rest: { x: "-100%" },
        hover: { x: "0%" },
    };

    const textVariants = {
        rest: { color: "#a2a2a2" }, // gray-700
        hover: { color: "#000" },
    };

    const topicVariants = {
        rest: { color: "#929292" }, // gray-700
        hover: { color: "#000" },
    };


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
                            {
                                Array.from({length: 1}).map((_, index) => (
                                    <motion.button
                                        key={index}
                                        className="relative flex-col flex w-full flex overflow-hidden px-5 py-4 bg-transparent border border-border  font-medium"
                                        initial="rest"
                                        whileHover="hover"
                                        animate="rest"
                                    >
                                        {/* Sliding Fill Layer */}
                                        <motion.div
                                            className="absolute inset-0 bg-accent"
                                            variants={fillVariants}
                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                        />

                                        {/* Button Content */}
                                        <div className="flex justify-between items-center w-full">
                                            <div className="relative z-10 flex flex-col gap-1">
                                                <motion.span
                                                    className="relative text-xs text-start w-full z-10"
                                                    variants={topicVariants}
                                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                                >
                                                    Topic {index + 1}
                                                </motion.span>
                                                <motion.span
                                                    className="relative text-xs text-start w-full z-10"
                                                    variants={textVariants}
                                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                                >
                                                    Gaseous Exchange: Processes
                                                </motion.span>
                                            </div>
                                            <motion.span
                                                className="relative text-xs text-start z-10"
                                                variants={textVariants}
                                                transition={{ duration: 0.2, ease: "easeOut" }}
                                            >
                                                <HugeiconsIcon icon={ChevronDownIcon} className=" text-xs" />
                                            </motion.span>
                                        </div>
                                    </motion.button>
                                ))
                            }
                        </section>


                        {/*<button className="absolute bottom-4 border-border border right-4 bg-bg text-bg p-2 rounded-full shadow-lg hover:bg-opacity-90 transition-all">*/}
                        {/*    <HugeiconsIcon size={25} color={"#fff"} icon={ArrowDown02Icon}/>*/}
                        {/*</button>*/}


                    </aside>
                    {/*    LECTURE VIDEO VIEW AND DETAILS*/}
                    <section className="p-1 flex flex-col gap-5 w-full">
                        <div className="w-full h-[50vh] border border-border">
                            {/*    Video Component*/}
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
