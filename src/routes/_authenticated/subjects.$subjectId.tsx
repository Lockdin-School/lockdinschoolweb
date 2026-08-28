import {createFileRoute, useParams, Outlet} from '@tanstack/react-router'
import {useTopics} from "@/api/topics/queries/useTopics.ts";
import {useState} from "react";
import AppHeader from "@/components/AppHeader.tsx";
import {TopicCollapsible} from "@/components/TopicCollapsible.tsx";

export const Route = createFileRoute('/_authenticated/subjects/$subjectId')({
    component: SubjectLayout,
})

function SubjectLayout  ()  {

    const params = useParams({
        from: '/_authenticated/subjects/$subjectId',
    });
    const {subjectId} = params;

    if (!subjectId) {
        throw new Error("Subject Not Found");
    }

    const {
        data: topics = [],
        isLoading,
        isError,
        error,
    } = useTopics(subjectId!);

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    if (isLoading) {
        return <div>Loading topics...</div>;
    }

    if (isError) {
        return <div>Failed to load topics: {error.message}</div>;
    }

    return (
        <div className="w-full gap-10 flex flex-col">
            {/*header*/}
            <AppHeader/>
            {/*    MAIN LAYOUT    */}
            <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <main className={` w-full justify-between gap-10 flex flex-col-reverse lg:grid lg:grid-cols-4`}>
                    {/*    LIST OF TOPICS */}
                    <aside className="w-full flex flex-col relative">
                        {/*List of topics*/}
                        {/*TODO: THIS SHOULD BE IN ITS OWN COMPONENT AND THEN HANDLE THE ACTIVE STATE THERE*/}
                        <section
                            className="gap-1 p-1  flex flex-col w-full overflow-y-auto max-h-[calc(100vh-13vh)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {topics.map((topic, index) => {
                                const isOpen = openIndex === index;

                                return (
                                    <>
                                        <p className="text-border lg:hidden text-start">
                                            Topics
                                        </p>
                                        <TopicCollapsible
                                            topic={topic}
                                            index={index}
                                            isOpen={isOpen}
                                            subjectId={subjectId!}
                                            onToggle={() => setOpenIndex(isOpen ? null : index)}
                                        />
                                    </>
                                );
                            })}
                        </section>


                        {/*<button className="absolute bottom-4 border-border border right-4 bg-bg text-bg p-2 rounded-full shadow-lg hover:bg-opacity-90 transition-all">*/}
                        {/*    <HugeiconsIcon size={25} color={"#fff"} icon={ArrowDown02Icon}/>*/}
                        {/*</button>*/}


                    </aside>
                    {/*    Topics Layout */}
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
