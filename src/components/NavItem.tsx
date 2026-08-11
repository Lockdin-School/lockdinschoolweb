import {motion} from "motion/react";
import { Link } from '@tanstack/react-router'

const fillVariants = {
    rest: {x: "-100%"},
    hover: {x: "0%"},
};
const textVariants = {
    rest: {color: "#e2e2e2"}, // gray-700
    hover: {color: "#000"},
};

interface NavItemProps {
    label: string;
}

const NavItem = ({label}: NavItemProps) => {

    return (
        <div className="overflow-hidden border-b border-border">
            <motion.button
                className="relative flex flex-col w-full px-5 py-4"
                initial="rest"
                whileHover="hover"
                animate={"rest"}
            >
                <motion.div
                    className="absolute inset-0 bg-accent"
                    variants={fillVariants}
                    transition={{duration: 0.2}}
                />

                <div className="relative z-10 flex items-center justify-between">
                    <Link to={"/dashboard"} className="flex flex-col items-start gap-1">
                        <motion.span variants={textVariants}>
                            {label}
                        </motion.span>
                    </Link>
                </div>
            </motion.button>
        </div>
    );
};

export default NavItem;
