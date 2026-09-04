import {AnimatePresence, motion, type Variants} from "framer-motion";
import {useState} from "react";
import NavItem from "./NavItem.tsx";

export interface ResponsiveMenuProps {
    subjectId?: string;
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

const navigationItems = [
    'Dashboard',
    'Subjects',
    'My Learning',
    'Schedule',
    'Practice',
    'Progress',
    'Community',
]

const ResponsiveMenu = ({open, onClose}: ResponsiveMenuProps) => {
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
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.25}}
                        onClick={handleClose}
                    />

                    {/* Menu */}
                    <motion.aside
                        className="
                            fixed
                            left-0
                            top-0
                            z-40
                            h-screen
                            w-full
                            bg-bg
                            lg:w-1/2
                            border-r border-border
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

                        {/* Navigation */}
                        {showNavigation && (
                            <motion.nav
                                className="flex flex-col mt-20 items-start text-5xl md:text-7xl"
                                variants={navVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {
                                    navigationItems.map((item, index) => (
                                        <motion.a
                                            key={index}
                                            href="#"
                                            variants={itemVariants}
                                            className="
                                        tracking-tighter
                                        font-medium
                                        w-full text-start
                                    "
                                        >
                                            <NavItem label={item}/>
                                        </motion.a>
                                    ))
                                }
                            </motion.nav>
                        )}
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};

export default ResponsiveMenu;