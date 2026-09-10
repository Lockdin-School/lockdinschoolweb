import {
    createFileRoute,
    useParams,
    Outlet,
} from "@tanstack/react-router";

import { useTopics } from "@/api/topics/queries/useTopics.ts";
import { useState } from "react";
import SubjectHeader from "@/components/headers/SubjectHeader.tsx";
import { TopicList } from "@/components/TopicList.tsx";

export const Route = createFileRoute(
    "/_authenticated/subjects/$subjectId"
)({
    component: SubjectLayout,
});

function SubjectLayout() {
    const { subjectId } = useParams({
        from: "/_authenticated/subjects/$subjectId",
    });

    const {
        data: topics = [],
        isLoading,
        isError,
        error,
    } = useTopics(subjectId);

    const [menuOpen, setMenuOpen] = useState(false);

    if (!subjectId) {
        throw new Error("Subject Not Found");
    }

    if (isLoading) {
        return <div>Loading topics...</div>;
    }

    if (isError) {
        return <div>Failed to load topics: {error.message}</div>;
    }

    return (
        <div className="w-full flex flex-col">
            <SubjectHeader
                menuOpen={menuOpen}
                onMenuToggle={() => setMenuOpen((open) => !open)}
            />

            {/* MOBILE TOPIC MENU */}
            <div
                className={`
                    fixed inset-0 z-40
                    bg-bg
                    pt-20 px-4
                   
                    lg:hidden
                    transition-all duration-300
                    
                    overflow-y-auto min-h-[calc(100vh-20vh)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
                    
                    ${
                    menuOpen
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-full opacity-0 pointer-events-none"
                }
                `}
            >
                <div className="max-w-xl ">
                    <div className="mb-4">
                        <span className="text-xs uppercase tracking-widest text-gray-500">
                            Topics
                        </span>
                    </div>

                    <TopicList
                        topics={topics}
                        subjectId={subjectId}
                        onTopicSelect={() => setMenuOpen(false)}
                    />
                </div>
            </div>

            {/* MAIN LAYOUT */}
            <div className="w-full px-4 sm:px-6 mt-20 lg:px-8 flex flex-col items-center">
                <main className="w-full justify-between gap-10 flex flex-col-reverse lg:grid lg:grid-cols-4">

                    {/* DESKTOP TOPICS */}
                    <aside className="hidden lg:flex w-full flex-col relative">
                        <TopicList
                            topics={topics}
                            subjectId={subjectId}
                        />
                    </aside>

                    {/* TOPIC CONTENT */}
                    <Outlet />
                </main>
            </div>
        </div>
    );
}