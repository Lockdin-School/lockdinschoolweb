import {ArrowLeft02Icon, ArrowRight02Icon, ChevronDownIcon} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import AppHeader from "../../components/AppHeader.tsx";

const Subject = () => {

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
                                    <div key={index} className="group px-5 gap-y-2 hover:cursor-pointer hover:bg-accent border border-border bg-bg py-3 flex justify-between items-center w-full transition-colors duration-300">
                                        {/*Expandable Component*/}
                                        <div>
                                            <p className="w-full text-start text-[13px] tracking-tighter text-[#9a9a9a] group-hover:text-black transition-colors duration-300">Topic {index + 1}</p>
                                            <p className="tracking-tight text-xs text-[#a2a2a2] group-hover:text-black transition-colors duration-300">Gaseous Exchange: Processes</p>
                                        </div>
                                        <button>
                                            <HugeiconsIcon size={20} className="text-[#a2a2a2] group-hover:text-black transition-colors duration-300" icon={ChevronDownIcon}/>
                                        </button>
                                    </div>
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
                            <button className="flex items-center bg-accent text-bg hover:bg-accent-border duration-300 transition-colors   justify-center gap-2 text-sm w-[6rem] p-2 text-[#a2a2a2] border border-border">
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
