import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useState } from "react";
import {HugeiconsIcon} from "@hugeicons/react";
import {Close} from "@hugeicons/core-free-icons";

interface ResponsiveMenuProps {
    open: boolean;
    onClose: () => void;
}

const drawerVariants = {
    hidden: {
        x: "-100%",
    },

    visible: {
        x: 0,
    },

    exit: {
        x: "-100%",
    },
};

const navVariants = {
    hidden: {
        opacity: 0,
    },

    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.05,
            staggerChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: {
        opacity: 0,
        x: -50,
    },

    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.35,
            ease: "easeOut",
        },
    },
};

const ResponsiveMenu = ({ open, onClose }: ResponsiveMenuProps) => {
    const [showNavigation, setShowNavigation] = useState(false);

    const handleDrawerAnimationComplete = () => {
        setShowNavigation(true);
    };

    const handleClose = () => {
        setShowNavigation(false);
        onClose();
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 z-40 bg-black/60"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={handleClose}
                    />

                    {/* Menu */}
                    <motion.aside
                        className="
                            fixed
                            left-0
                            top-0
                            z-50
                            h-screen
                            w-full
                            bg-bg
                            lg:w-1/2
                        "
                        variants={drawerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{
                            duration: 0.35,
                            ease: "easeInOut",
                        }}
                        onAnimationComplete={handleDrawerAnimationComplete}
                    >
                        {/* Close */}
                        <div className="flex justify-end p-5">
                            <button
                                type="button"
                                onClick={handleClose}
                                aria-label="Close menu"
                            >
                                <HugeiconsIcon size={38} icon={Close} />
                            </button>
                        </div>

                        {/* Navigation */}
                        {showNavigation && (
                            <motion.nav
                                className="flex flex-col items-start font-space-regular text-6xl md:text-7xl gap-2 px-6"
                                variants={navVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <motion.a
                                    href="#"
                                    variants={itemVariants}
                                    className="
                                        px-4
                                        py-3
                                        border-b border-border
                                        font-medium
                                        transition-colors
                                        hover:bg-accent
                                    "
                                >
                                    Dashboard
                                </motion.a>

                                <motion.a
                                    href="#"
                                    variants={itemVariants}
                                    className="
                                        px-4
                                        py-3
                                        font-medium
                                        border-b border-border
                                        transition-colors
                                        hover:bg-accent
                                    "
                                >
                                    Subjects
                                </motion.a>

                                <motion.a
                                    href="#"
                                    variants={itemVariants}
                                    className="
                                        px-4
                                        py-3
                                        font-medium
                                        border-b border-border
                                        transition-colors
                                        text-start
                                        hover:bg-accent
                                    "
                                >
                                    My Learning
                                </motion.a>
                                <motion.a
                                    href="#"
                                    variants={itemVariants}
                                    className="
                                        px-4
                                        py-3
                                        font-medium
                                        border-b border-border
                                        transition-colors
                                        hover:bg-accent
                                    "
                                >
                                    Schedule
                                </motion.a>
                                <motion.a
                                    href="#"
                                    variants={itemVariants}
                                    className="
                                        px-4
                                        py-3
                                        font-medium
                                        border-b border-border
                                        transition-colors
                                        hover:bg-accent
                                    "
                                >
                                    Practice
                                </motion.a>
                                <motion.a
                                    href="#"
                                    variants={itemVariants}
                                    className="
                                        px-4
                                        py-3
                                        font-medium
                                        border-b border-border
                                        transition-colors
                                        hover:bg-accent
                                    "
                                >
                                    Progress
                                </motion.a>
                                <motion.a
                                    href="#"
                                    variants={itemVariants}
                                    className="
                                        px-4
                                        py-3
                                        font-medium
                                        border-b border-border
                                        transition-colors
                                        hover:bg-accent
                                    "
                                >
                                    Community
                                </motion.a>
                            </motion.nav>
                        )}
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};

export default ResponsiveMenu;