import {createFileRoute, Outlet, useLocation, useNavigate} from '@tanstack/react-router'
import {useStudentProfile} from "@/api/student-profiles/queries/useStudentProfile.ts";
import {useAuthUser} from "@/api/auth/queries/useAuthUser.ts";
import {isStudentProfileNotFoundError} from "@/api/student-profiles/errors.ts";
import {useEffect} from "react";
import {LockdinTaskBar} from "@/components/LockdinTaskBar.tsx";

export const Route = createFileRoute('/_authenticated')({
    component: AuthenticatedLayout,
})



function AuthenticatedLayout() {
    const navigate = useNavigate();
    const pathname = useLocation({
        select: (location) => location.pathname,
    });

    const {
        data: authUser,
        isLoading: isAuthUserLoading,
        isError: isAuthUserError,
    } = useAuthUser();

    const accountId = authUser?.userInfo?.id;

    const {
        data: studentProfile,
        isLoading: isStudentProfileLoading,
        isError: isStudentProfileError,
        error: studentProfileError,
    } = useStudentProfile(accountId);

    const isOnboardingRoute = pathname === "/onboarding" ||
        pathname === "/_authenticated/onboarding";

    useEffect(() => {
        if (isAuthUserLoading) {
            return;
        }

        if (isAuthUserError || !authUser || !accountId) {
            void navigate({
                to: "/signin",
                replace: true,
            });
            return;
        }

        if (isStudentProfileLoading) {
            return;
        }

        if (
            !studentProfile &&
            isStudentProfileError &&
            isStudentProfileNotFoundError(studentProfileError) &&
            !isOnboardingRoute
        ) {
            void navigate({
                to: "/onboarding",
                replace: true,
            });
            return;
        }

        if (
            studentProfile &&
            !studentProfile.onboardingCompleted &&
            !isOnboardingRoute
        ) {
            void navigate({
                to: "/onboarding",
                replace: true,
            });
            return;
        }

        if (
            studentProfile?.onboardingCompleted &&
            isOnboardingRoute
        ) {
            void navigate({
                to: "/dashboard",
                replace: true,
            });
        }
    }, [
        accountId,
        authUser,
        isAuthUserError,
        isAuthUserLoading,
        isOnboardingRoute,
        isStudentProfileError,
        isStudentProfileLoading,
        navigate,
        studentProfile,
        studentProfileError,
    ]);

    if (isAuthUserLoading || isStudentProfileLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f8fff9]">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#d7f5dc] border-t-[#1e2914]" />
                    <p className="font-inter text-sm tracking-tight text-[#7b7194]">
                        Loading your learning space...
                    </p>
                </div>
            </div>
        );
    }

    if (
        isStudentProfileError &&
        !isStudentProfileNotFoundError(studentProfileError)
    ) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f8fff9] px-6">
                <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
                    <p className="font-inter text-2xl font-semibold tracking-tight text-[#1e2914]">
                        Something went wrong
                    </p>
                    <p className="mt-3 font-inter text-sm tracking-tight text-[#7b7194]">
                        We could not load your student profile right now. Please refresh and try again.
                    </p>
                </div>
            </div>
        );
    }



    return (
        <>
            <Outlet />
            {!isOnboardingRoute && <LockdinTaskBar />}
        </>
    )
}