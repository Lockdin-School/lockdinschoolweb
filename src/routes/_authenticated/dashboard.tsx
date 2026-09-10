import {createFileRoute, useNavigate} from '@tanstack/react-router'
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

    const navigate = useNavigate();

    const {
        data: studentProfile,
        isLoading: isStudentProfileLoading,
    } = useStudentProfile(accountId);

    const {
        data: subjects,
        isLoading: isSubjectsLoading,
        isError,
        error,
    } = useSubjects(studentProfile?.grade);

    if (isSubjectsLoading || isStudentProfileLoading || isAuthUserLoading) {
        return (
            <>
                <AppHeader/>
                <DashboardSkeleton />
            </>
        );
    }

    if (!studentProfile) {
        return null; // or a fallback — layout's effect will redirect on next commit
    }

    if (isError) return <div>Error: {error.message}</div>

    return (
        <div className="w-full min-h-screen flex gap-5 flex-col items-center">
            <AppHeader/>
            <section className="flex flex-col items-center w-full mb-5 mt-20">
                <p className="w-full max-w-7xl text-[16px] max-sm:px-4 pb-5 tracking-tighter text-start">
                    <span className="text-lg py-2 block">Welcome, <b className={"capitalize"}>{studentProfile?.firstName}!</b><br /></span>
                    Your learning space is ready.
                    What are we learning today? <br />
                </p>
                <main className="max-w-7xl mb-20 max-sm:px-4 w-full  gap-5 flex flex-col items-start">
                    <div className="flex flex-col items-start">
                        <p className="w-full text-xs tracking-tight rounded-full text-bg bg-border border py-2 px-3 border-border self-start">Subjects</p>
                    </div>
                    <section className="grid gap-3 grid-cols-1 w-full lg:grid-cols-3">
                        {
                            subjects && subjects.map((subject, index) => (
                                    <button
                                        onClick={()=>{
                                            void navigate({to: `/subjects/$subjectId`, params: {subjectId: subject.id}})
                                        }}
                                        key={index}
                                          className="text-start gap-y-0 hover:cursor-pointer w-full flex flex-col  border-border ">
                                        <div className="sm:h-[20vh] h-[25vh] mb-2 rounded-[22px] w-full bg-code-bg">
                                            <img src={subject.coverImageUrl ?? "/carousel/5.jpg"} alt={subject.title} className="w-full rounded-[20px] h-full object-center object-cover" />
                                        </div>
                                        <div className="flex gap-x-2 w-full justify-between items-center">
                                            <p className="tracking-tighter  ">{subject.title}</p>
                                            {/*<p className="text-[#929292] inline-block">{ "·" }</p>*/}
                                            <b className="tracking-tighter">{subject.code}</b>
                                        </div>
                                        <b className="tracking-tighter">{subject.description}</b>
                                        {/*<p className="tracking-tight text-xs">Estimated hours:*/}
                                        {/*    2{subject.estimatedHours}hrs</p>*/}
                                    </button>
                                )
                            )
                        }
                    </section>
                </main>
            </section>
        </div>
    )
}
