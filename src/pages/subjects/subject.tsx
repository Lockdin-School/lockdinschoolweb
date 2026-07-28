import {useParams} from "react-router";
import {BellIcon, ChevronDownIcon, MenuTwoLineIcon, SearchIcon} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";

const Subject = () => {
    const params = useParams();
    // use this subjects id, to fetch the topics.
    const subjectId = params.subjectId;
    return (
        <div className="w-full flex flex-col">
            {/*header*/}
            <header className="w-full bg-code-bg flex justify-center  h-[8vh] ">
                <div className="flex w-[98vw] gap-4 py-3 items-center justify-between">
                    {/*<img src={"/logo-black.jpg"} width={50} className={"aspect-square w-50"}  alt={""}/>*/}
                    <div className="flex  items-center gap-5">
                        <button><HugeiconsIcon size={40} icon={MenuTwoLineIcon}/></button>
                        <div className="w-[18vw] border gap-2 flex items-center px-2 border-text bg-transparent  h-9">
                            <HugeiconsIcon size={20} strokeWidth={2} color={"#777"} icon={SearchIcon}/> <p className="text-xs text-[#999]">Search...</p>
                        </div>
                        {/*TODO: Add Search Component*/}
                        {/*<p className="font-getai text-text text-[25px] tracking-tight pt-2">Lockdin<sup>®</sup></p>*/}
                    </div>

                    <div className="flex h- items-center gap-3 justify-center">
                        <HugeiconsIcon size={22} icon={BellIcon}/>
                        <div className="flex aspect-square items-center justify-center px-3 bg-accent rounded-full">
                            T
                        </div>
                    </div>
                </div>
            </header>
            {/*    MAIN LAYOUT    */}
            <main
                className={`
                w-full h-screen grid  
                bg-code-bg
          
                grid-cols-[20%_60%_20%]
                `}
            >
            {/*    LIST OF TOPICS */}
                <aside className="w-full flex flex-col">
                    {/*List of topics*/}
                    <section className="h-[100vh] gap-1 p-1  flex flex-col w-full overflow-y-auto">
                        {
                            Array.from({length: 10}).map((_, index) => (
                                <div key={index} className="px-5 gap-y-2 hover:cursor-pointer border hover:bg-accent-bg bg-bg rounded-lg py-3 flex justify-between items-center w-full">
                                    {/*Expandable Component*/}
                                    <div>
                                        <p className="w-full text-start text-xs tracking-tighter text-[#9a9a9a]">Topic {index + 1}</p>
                                        <p className="tracking-tight  font-ebgaramond-bold">Gaseous Exchange: Processes</p>
                                    </div>
                                    <button>
                                        <HugeiconsIcon size={20} icon={ChevronDownIcon}/>
                                    </button>
                                </div>
                            ))
                        }
                    </section>


                </aside>
            {/*    LECTURE VIDEO VIEW AND DETAILS*/}
                <section className="p-1">
                    <div className="w-full h-[60vh] border">
                    {/*    Video Component*/}
                    </div>
                    <p>{subjectId}</p>
                </section>
            {/*    SOME TOOLS THAT I DONT KNOW YET*/}
                <aside className="w-full flex flex-col">

                </aside>
            </main>
        </div>
    );
};

export default Subject;
