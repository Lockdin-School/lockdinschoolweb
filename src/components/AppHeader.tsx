import {HugeiconsIcon} from "@hugeicons/react";
import {BellIcon, MenuTwoLineIcon, SearchIcon} from "@hugeicons/core-free-icons";
import {useState} from "react";
import ResponsiveMenu from "./ResponsiveMenu.tsx";

const AppHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <>
            <header className="w-full border-b border-border">
                <div className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">

                    {/* Left */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMenuOpen(true)}
                            type="button"
                            className="flex items-center justify-center"
                            aria-label="Open menu"
                        >
                            <HugeiconsIcon
                                size={38}
                                className="text-bg mx-2 bg-white"
                                icon={MenuTwoLineIcon}
                            />
                        </button>

                        {/* Search */}
                        <button
                            type="button"
                            className="flex items-center gap-2 text-sm text-[#777] sm:w-48 sm:border sm:border-border sm:px-3 sm:py-2"
                        >
                            <HugeiconsIcon
                                size={20}
                                strokeWidth={2}
                                icon={SearchIcon}
                            />

                            <span className="hidden sm:inline">
                            Search...
                        </span>
                        </button>
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
                            className="flex aspect-square h-9 w-9 items-center justify-center rounded-full bg-accent text-bg"
                            aria-label="Profile"
                        >
                            S
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
