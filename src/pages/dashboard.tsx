import {BellIcon, MenuTwoLineIcon, SearchIcon} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";

const Dashboard = () => {
    return (
        <div className="w-full h-full flex gap-10 flex-col items-center">
            <header className="w-full flex justify-center  h-[8vh] ">
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
                            S
                        </div>
                    </div>
                </div>
            </header>
            <section className="flex w-[98vw] h-[80vh]">
                <aside className="w-[20vw] h-full flex flex-col items-start">
                    <p className="text-sm text-[#888]">Filters</p>
                </aside>
                <main className="w-[60vw] gap-5 flex flex-col items-start">
                    <div className="flex flex-col items-start">
                        <p className="w-full text-sm tracking-tight text-[#888] self-start">Subjects</p>
                    </div>
                    <section className="grid gap-3 elevation-1 w-full grid-cols-3">
                        {
                            Array.from({length: 1}).map((_, index) => (
                                <div key={index} className="text-start hover:cursor-pointer w-full flex flex-col border-b ">
                                    <div className="h-[20vh]  w-full bg-accent" />
                                    <p className="tracking-tight py-4 text-xl">Mathematics</p>
                                </div>
                                )
                            )
                        }
                    </section>
                </main>
            </section>
        </div>
    )
};

export default Dashboard;
