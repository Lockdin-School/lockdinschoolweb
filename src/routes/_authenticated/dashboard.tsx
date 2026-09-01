import {createFileRoute} from '@tanstack/react-router'
import {useSubjects} from "@/api/subjects/queries/useSubjects.ts";
import AppHeader from "@/components/AppHeader.tsx";
import {useAuthUser} from "@/api/auth/queries/useAuthUser.ts";
import {useStudentProfile} from "@/api/student-profiles/queries/useStudentProfile.ts";
import {DashboardSkeleton} from "@/components/skeletons/DashboardSkeleton.tsx";


export const Route = createFileRoute('/_authenticated/dashboard')({
    component: Dashboard,
})

function Dashboard() {

    const {
        data: authUser,
        isLoading: isAuthUserLoading,
    } = useAuthUser();

    const accountId = authUser?.userInfo?.id;

    const {
        data: studentProfile,
        isLoading: isStudentProfileLoading,
    } = useStudentProfile(accountId);

    const {
        data: subjects = [],
        isLoading: isSubjectsLoading,
        isError,
        error,
    } = useSubjects();

    if (isSubjectsLoading || isStudentProfileLoading || isAuthUserLoading) {
        return (
            <>
                <AppHeader/>
                <DashboardSkeleton />
            </>
        );
    }

    if (isError) return <div>Error: {error.message}</div>

    return (
        <div className="w-full h-full flex gap-10 flex-col items-center">
            <AppHeader/>
            <section className="flex flex-col items-center w-[98vw] h-[80vh]">
                <p className="w-full max-w-7xl text-sm max-sm:px-2 pb-5 tracking-tight text-start">
                    <span className="text-lg py-2 block">Hello, <b className={"capitalize"}>{studentProfile?.firstName}!</b><br /></span>
                    Everything is set. Build consistency, master concepts, and make progress every day. <br />
                    Only the best!
                </p>
                <main className="max-w-7xl max-sm:px-2 w-full gap-5 flex flex-col items-start">
                    <div className="flex flex-col items-start">
                        <p className="w-full text-xs tracking-tight text-bg bg-border border py-2 px-3 border-border self-start">Subjects</p>
                    </div>
                    <section className="grid gap-3 grid-cols-1 w-full lg:grid-cols-3">
                        {
                            subjects.map((subject, index) => (
                                    <a href={`/subjects/${subject.id}`} key={index}
                                          className="text-start gap-y-0 hover:cursor-pointer w-full flex flex-col  border-border ">
                                        <div className="sm:h-[20vh] h-[25vh] mb-2 rounded w-full bg-accent">
                                            <img src={"/carousel/5.jpg"} alt={subject.title} className="w-full rounded h-full object-center object-cover" />
                                        </div>
                                        <div className="flex gap-x-2 w-full justify-between items-center">
                                            <p className="tracking-tighter  ">{subject.title}</p>
                                            {/*<p className="text-[#929292] inline-block">{ "·" }</p>*/}
                                            <b className="tracking-tighter">{subject.code}</b>
                                        </div>
                                        <b className="tracking-tighter">{subject.description}</b>
                                        {/*<p className="tracking-tight text-xs">Estimated hours:*/}
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
