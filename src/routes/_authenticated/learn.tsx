import {createFileRoute} from '@tanstack/react-router'
import SubjectHeader from "@/components/headers/SubjectHeader.tsx";
import {useSubjects} from "@/api/subjects/queries/useSubjects.ts";
import {HugeiconsIcon} from "@hugeicons/react";
import {ChevronDownIcon} from "@hugeicons/core-free-icons";

export const Route = createFileRoute('/_authenticated/learn')({
    component: LearningTree,
})

function LearningTree() {

    const {
        data: subjects = [],
    } = useSubjects();

    return (
        <div className="w-full min-h-screen flex flex-col items-center">
            <SubjectHeader/>
            <main className="mt-20 max-sm:px-4 max-w-7xl w-full">
                <section className="flex flex-col items-start">
                    <p className="text-[#636363] text-sm tracking-tighter">
                        Subjects
                    </p>
                    <div className={"py-4"}>
                        {
                            subjects.map((subject, index) => (
                                <button key={index} className="text-start gap-y-0 hover:cursor-pointer w-full flex items-center gap-x-2 ">
                                    <b key={index} className="tracking-tighter">{subject.title}</b> <HugeiconsIcon size={20} icon={ChevronDownIcon} />
                                </button>
                            ))
                        }
                    </div>
                </section>
            </main>
        </div>
    )
}
