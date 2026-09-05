import {createFileRoute} from '@tanstack/react-router'
import {KnowledgeTree} from "@/features/learning/components/KnowledgeTree.tsx";
import {useSubjects} from "@/api/subjects/queries/useSubjects.ts";
import {useStudentProfile} from "@/api/student-profiles/queries/useStudentProfile.ts";
import {useAuthUser} from "@/api/auth/queries/useAuthUser.ts";
import AppHeader from "@/components/AppHeader.tsx";


export const Route = createFileRoute('/_authenticated/learn')({
    component: LearningTree,
})

function LearningTree() {

    const {data: account} = useAuthUser();

    const {
        data: profile,
    } = useStudentProfile(account?.userInfo?.id)

    const {
        data: subjects,
        isLoading,
        isError,
        error
    } = useSubjects(profile.grade);


    return (
        <div className="w-full min-h-screen flex flex-col items-center">
            <AppHeader />
            <main className="mt-20 max-sm:px-4 max-w-7xl w-full">
                <section className="flex flex-col mb-20 items-start">
                    <p className="text-[#636363] text-sm tracking-tighter">
                        Knowledge Tree
                    </p>
                    {isLoading && <div className={"py-5"}>Loading...</div>}
                    {isError && <div>{error.message}</div>}
                    {subjects && (<KnowledgeTree subjects={subjects} />)}
                </section>
            </main>
        </div>
    )
}



