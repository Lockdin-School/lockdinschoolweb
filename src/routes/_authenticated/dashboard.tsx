import {createFileRoute} from '@tanstack/react-router'
import {useSubjects} from "@/api/subjects/queries/useSubjects.ts";
import AppHeader from "@/components/AppHeader.tsx";


export const Route = createFileRoute('/_authenticated/dashboard')({
    component: Dashboard,
})

function Dashboard() {

    const {
        data: subjects = [],
        isLoading,
        isError,
        error,
    } = useSubjects();

    if (isLoading) return <div>Loading...</div>

    if (isError) return <div>Error: {error.message}</div>

    return (
        <div className="w-full h-full flex gap-10 flex-col items-center">
            <AppHeader/>
            <section className="flex w-[98vw] h-[80vh]">
                <aside className="w-[20vw] h-full flex flex-col items-start">
                    {/*<p className="text-xs text-text flex items-center gap-1 border-border py-2 px-3 border">*/}
                    {/*    Filters <HugeiconsIcon size={20} icon={ArrowDownFreeIcons}/>*/}
                    {/*</p>*/}
                </aside>
                <main className="w-[60vw] gap-5 flex flex-col items-start">
                    <div className="flex flex-col items-start">
                        <p className="w-full text-xs tracking-tight text-bg bg-border border py-2 px-3 border-border self-start">Subjects</p>
                    </div>
                    <section className="grid gap-3  elevation-1 w-full grid-cols-3">
                        {
                            subjects.map((subject, index) => (
                                    <a href={`/subjects/${subject.id}`} key={index}
                                          className="text-start gap-y-0 hover:cursor-pointer w-full flex flex-col  border-border ">
                                        <div className="h-[20vh] mb-2 rounded w-full bg-accent">
                                            <img src={"/carousel/5.jpg"} alt={subject.title} className="w-full rounded h-full object-center object-cover" />
                                        </div>
                                        <div className="flex gap-x-2 w-full justify-between items-center">
                                            <p className="tracking-tight  text-lg">{subject.title}</p>
                                            {/*<p className="text-[#929292] inline-block">{ "·" }</p>*/}
                                            <b className="tracking-tight text-lg">{subject.code}</b>
                                        </div>
                                        <b className="tracking-tight  text-lg">{subject.description}</b>
                                        {/*<p className="tracking-tight  text-xs">Estimated hours:*/}
                                        {/*    2{subject.estimatedHours}hrs</p>*/}
                                    </a>
                                )
                            )
                        }
                    </section>
                </main>
            </section>
        </div>
    )
}
