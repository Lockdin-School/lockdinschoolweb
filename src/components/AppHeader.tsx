import {HugeiconsIcon} from "@hugeicons/react";
import {BellIcon, MenuTwoLineIcon, SearchIcon} from "@hugeicons/core-free-icons";

const AppHeader = () => {
    return (
        <header className="w-full flex border-b border-border justify-center  h-[8vh] ">
            <div className="flex w-[98vw] gap-4 py-3 items-center justify-between">
                {/*<img src={"/logo-black.jpg"} width={50} className={"aspect-square w-50"}  alt={""}/>*/}
                <div className="flex  items-center gap-5">
                    <button className="border px-1 bg-text border-border"><HugeiconsIcon size={38} className={"text-bg"} icon={MenuTwoLineIcon}/></button>
                    <div className="w-[18vw] border gap-2 flex items-center px-2 border-border bg-transparent  h-9">
                        <HugeiconsIcon size={20} strokeWidth={2} color={"#777"} icon={SearchIcon}/> <p className="text-xs text-[#999]">Search...</p>
                    </div>
                    {/*TODO: Add Search Component*/}
                    {/*<p className="font-getai text-text text-[25px] tracking-tight pt-2">Lockdin<sup>®</sup></p>*/}
                </div>

                <div className="flex h- items-center gap-3 justify-center">
                    <HugeiconsIcon size={22} icon={BellIcon}/>
                    <div className="flex aspect-square text-bg items-center justify-center px-3 bg-accent rounded-full">
                        S
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
