import AppHeader from "../../components/AppHeader.tsx";
import {useEffect, useState} from "react";
import {Outlet, useParams} from "react-router";
import {getTopicsBySubjectId} from "../../api/topics/topics.ts";
import type {GetTopicsResponse} from "../../api/topics/models/TopicResponse.ts";

import {TopicCollapsible} from "../../components/topics/TopicCollapsible.tsx";



const SubjectLayout = () => {

    const params = useParams();
    const subjectId = params.subjectId;



    const [topics, setTopics] = useState<GetTopicsResponse>([]);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchTopicsBySubject = async (subjectId: string) => {
            try {
                const topics = await getTopicsBySubjectId(subjectId);
                setTopics(topics);
            } catch (e) {
                console.error("Error fetching subjects: ", e);
            }
        };

        fetchTopicsBySubject(subjectId!).then();

    }, [subjectId]);



    return (
        <div className="w-full gap-10 flex flex-col">
            {/*header*/}
            <AppHeader />
            {/*    MAIN LAYOUT    */}
            <div className="w-full  flex flex-col items-center">
                <main className={`w-[98vw] justify-between grid grid-cols-[20%_50%_20%]`}>
                    {/*    LIST OF TOPICS */}
                    <aside className="w-full flex flex-col relative">
                        {/*List of topics*/}
                        <section className="gap-1 p-1  flex flex-col w-full overflow-y-auto max-h-[calc(100vh-13vh)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {topics.map((topic, index) => {
                                const isOpen = openIndex === index;

                                return (
                                    <TopicCollapsible
                                        topic={topic}
                                        index={index}
                                        isOpen={isOpen}
                                        onToggle={()=> setOpenIndex(isOpen ? null : index)}
                                    />
                                );
                            })}
                        </section>


                        {/*<button className="absolute bottom-4 border-border border right-4 bg-bg text-bg p-2 rounded-full shadow-lg hover:bg-opacity-90 transition-all">*/}
                        {/*    <HugeiconsIcon size={25} color={"#fff"} icon={ArrowDown02Icon}/>*/}
                        {/*</button>*/}


                    </aside>
                    {/*    LECTURE VIDEO VIEW AND DETAILS*/}
                    <section className="w-full">
                        <Outlet />
                    </section>
                    {/*    SOME TOOLS THAT I DONT KNOW YET*/}
                    {/*    LIST OF TOPICS */}

                </main>
            </div>
        </div>
    );
};

export default SubjectLayout;
