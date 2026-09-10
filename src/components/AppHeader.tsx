import {HugeiconsIcon} from "@hugeicons/react";
import {ArrowLeft01Icon, CancelIcon, LiveStreaming03Icon, MenuTwoLineIcon} from "@hugeicons/core-free-icons";
import {useState} from "react";
import ResponsiveMenu from "./ResponsiveMenu.tsx";
import {useAuthUser} from "@/api/auth/queries/useAuthUser.ts";
import {useLocation, useNavigate, useRouter} from "@tanstack/react-router";
import {AnimatePresence, motion} from "motion/react";

const AppHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const {data: student, isLoading} = useAuthUser();

    const navigate = useNavigate();
    const router = useRouter();
    const pathname = useLocation({
        select: (location) => location.pathname,
    });

    const isSessionsPage = pathname.startsWith("/sessions");

    return (
        <>

            <header className={`w-full fixed z-50 bg-bg/95 ${!menuOpen && "backdrop-blur-2xl" } sm:border-b border-border`}>
                <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 ">

                    {
                        isSessionsPage ?
                            (<button
                                onClick={() => router.history.back()}
                                type="button"
                                className="flex top-4 left-4 fixed z-50 rounded-lg border-border items-center justify-center"
                                aria-label="Open menu"
                            >
                                <HugeiconsIcon size={30} icon={ArrowLeft01Icon}/>
                            </button>) :
                            (
                                <button
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    type="button"
                                    className="flex top-6 left-6 fixed z-50 rounded-lg border-border items-center justify-center"
                                    aria-label="Open menu"
                                >
                                    <motion.span className="relative flex h-5 w-5 items-center justify-center">
                                        <AnimatePresence mode="wait" initial={false}>
                                            {menuOpen ? (
                                                <motion.span
                                                    key="cancel"
                                                    initial={{opacity: 0, rotate: -90, scale: 0.7}}
                                                    animate={{opacity: 1, rotate: 0, scale: 1}}
                                                    exit={{opacity: 0, rotate: 90, scale: 0.7}}
                                                    transition={{
                                                        duration: 0.2,
                                                        ease: "easeOut",
                                                    }}
                                                    className="absolute"
                                                >
                                                    <HugeiconsIcon size={38} icon={CancelIcon}/>
                                                </motion.span>
                                            ) : (
                                                <motion.span
                                                    key="chevron"
                                                    initial={{opacity: 0, rotate: -90, scale: 0.7}}
                                                    animate={{opacity: 1, rotate: 0, scale: 1}}
                                                    exit={{opacity: 0, rotate: 90, scale: 0.7}}
                                                    transition={{
                                                        duration: 0.2,
                                                        ease: "easeOut",
                                                    }}
                                                    className="absolute"
                                                >
                                                    <HugeiconsIcon size={38} icon={MenuTwoLineIcon}/>
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </motion.span>
                                </button>
                            )
                    }

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
                        {!isSessionsPage && <button
                            type="button"
                            className="flex items-center justify-center p-1"
                            onClick={() => {
                                void navigate({to: '/sessions'})
                            }}
                            aria-label="Sessions"
                        >
                            <HugeiconsIcon
                                size={24}
                                icon={LiveStreaming03Icon}
                            />
                        </button>}

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

            <ResponsiveMenu
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
            />
        </>
    );
};

export default AppHeader;
