import {HugeiconsIcon} from "@hugeicons/react";
import {BellIcon, MenuTwoLineIcon} from "@hugeicons/core-free-icons";
import {useState} from "react";
import ResponsiveMenu from "./ResponsiveMenu.tsx";
import {useAuthUser} from "@/api/auth/queries/useAuthUser.ts";

const AppHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const {data: student, isLoading} = useAuthUser();


    return (
        <>
            <header className="w-full fixed  border-b border-border">
                <div className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6 ">

                    {/* Left */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMenuOpen(true)}
                            type="button"
                            className="flex  rounded-lg border-border items-center justify-center"
                            aria-label="Open menu"
                        >
                            <HugeiconsIcon
                                size={38}
                                className=" mx-1"
                                icon={MenuTwoLineIcon}
                            />
                        </button>

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
                                size={22}
                                icon={BellIcon}
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

            <ResponsiveMenu
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
            />
        </>
    );
};

export default AppHeader;
