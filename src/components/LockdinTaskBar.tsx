import {HugeiconsIcon} from "@hugeicons/react";
import {
    BookOpen01Icon,
    Home01Icon,
    // Quiz01Icon,
    UserCircleIcon,
} from "@hugeicons/core-free-icons";
import {Link, useLocation} from "@tanstack/react-router";

type TaskBarItem = {
    label: string;
    href: string;
    icon: typeof Home01Icon;
};

const taskBarItems: TaskBarItem[] = [
    {
        label: "Home",
        href: "/dashboard",
        icon: Home01Icon,
    },
    {
        label: "Learn",
        href: "/learn",
        icon: BookOpen01Icon,
    },
    // {
    //     label: "Practice",
    //     href: "/quizzes",
    //     icon: Quiz01Icon,
    // },
    {
        label: "Profile",
        href: "/profile",
        icon: UserCircleIcon,
    },
];

export function LockdinTaskBar() {
    const pathname = useLocation({select: (location) => location.pathname});

    return (
        <nav className="fixed lg:rounded-full lg:bottom-10 bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2 rounded-t-2xl  bg-bg/95 px-2 py-1 shadow-custom backdrop-blur">
            <div className="grid grid-cols-3 gap-1">
                {taskBarItems.map((item) => {
                    const isActive = pathname === item.href ||
                        pathname.startsWith(`${item.href}/`);

                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={`flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs tracking-tight transition`}
                        >
                            <div className={`p-2 ${isActive ? "bg-[#1e2914] rounded-full px-4 text-white" : ""}`}>
                                <HugeiconsIcon
                                    icon={item.icon}
                                    className=""
                                    size={25}
                                    strokeWidth={1.8}
                                />
                            </div>
                            <span className="text-[14px] lg:hidden">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}