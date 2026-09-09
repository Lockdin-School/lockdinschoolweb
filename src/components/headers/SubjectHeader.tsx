import {HugeiconsIcon} from "@hugeicons/react";
import {CancelIcon, LiveStreaming03Icon, Menu03Icon} from "@hugeicons/core-free-icons";
import {useAuthUser} from "@/api/auth/queries/useAuthUser.ts";
import {AnimatePresence, motion} from "motion/react";


type SubjectHeaderProps = {
    menuOpen: boolean;
    onMenuToggle: () => void;
};

const SubjectHeader = ({
                           menuOpen,
                           onMenuToggle,
                       }: SubjectHeaderProps) => {
    const {data: student, isLoading} = useAuthUser();


    return (
        <>
            <div className="fixed top-6  lg:hidden  gap-x-4 left-6 flex z-50">

                <button
                    onClick={onMenuToggle}
                    type="button"
                    className="rounded-lg border-border items-center justify-center"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                >
                    <motion.span className="relative flex h-5 w-5 items-center justify-center">
                        <AnimatePresence mode="wait" initial={false}>
                            {menuOpen ? (
                                <motion.span
                                    key="cancel"
                                    initial={{
                                        opacity: 0,
                                        rotate: -90,
                                        scale: 0.7,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        rotate: 0,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        rotate: 90,
                                        scale: 0.7,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeOut",
                                    }}
                                    className="absolute"
                                >
                                    <HugeiconsIcon
                                        size={38}
                                        icon={CancelIcon}
                                    />
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="menu"
                                    initial={{
                                        opacity: 0,
                                        rotate: -90,
                                        scale: 0.7,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        rotate: 0,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        rotate: 90,
                                        scale: 0.7,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeOut",
                                    }}
                                    className="absolute"
                                >
                                    <HugeiconsIcon
                                        size={38}
                                        icon={Menu03Icon}
                                    />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.span>
                </button>
            </div>

            <header className="w-full fixed z-40  sm:border-b border-border bg-bg/95 backdrop-blur">
                <div className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6 ">

                    {/* Left */}
                    <div className="flex items-center gap-4">


                        {/*/!* Search *!/*/}
                        {/*<form*/}
                        {/*    className="flex items-center gap-2 text-sm text-[#777] sm:w-48 sm:border sm:border-border rounded sm:px-3 sm:py-2"*/}
                        {/*>*/}
                        {/*    <HugeiconsIcon*/}
                        {/*        size={20}*/}
                        {/*        className="text-[#1e2914]"*/}
                        {/*        strokeWidth={2}*/}
                        {/*        icon={SearchIcon}*/}
                        {/*    />*/}

                        {/*    <input className="hidden sm:inline outline-none bg-transparent w-full" type="text" />*/}
                        {/*</form>*/}
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            className="flex items-center justify-center p-1"
                            aria-label="Notifications"
                        >
                            <HugeiconsIcon
                                size={24}
                                icon={LiveStreaming03Icon}
                            />
                        </button>

                        <button
                            type="button"
                            className="flex uppercase text-black aspect-square h-9 w-9 items-center justify-center rounded-full bg-accent text-bg"
                            aria-label="Profile"
                        >
                            {isLoading ? <> L </> : <b>{student?.email?.[0]}</b>}
                        </button>
                    </div>

                </div>
            </header>



        {/*    THE MENU SHOULD Appear here*/}
        </>
    );
};

export default SubjectHeader;
