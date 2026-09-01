import {createFileRoute, useNavigate} from "@tanstack/react-router";
import  {type FormEvent, useState} from "react";
import {useAuthUser} from "@/api/auth/queries/useAuthUser.ts";
import {useCreateStudentProfile} from "@/api/student-profiles/mutations/useCreateStudentProfile.ts";
import type {Curriculum, StudentProfileNew} from "@/api/student-profiles/models/StudentProfile.ts";
import {LockdinSelect, type LockdinSelectOption} from "@/components/LockdinSelect.tsx";

export const Route = createFileRoute("/_authenticated/onboarding")({
    component: Onboarding,
});

const curriculumOptions: LockdinSelectOption<Curriculum>[] = [
    {label: "CAPS", value: "CAPS"},
    {label: "Cambridge", value: "CAMBRIDGE"},
    {label: "IEB", value: "IEB"},
];

const gradeOptions: LockdinSelectOption<number>[] = Array.from(
    {length: 5},
    (_, index) => {
        const grade = index + 8;

        return {
            label: `Grade ${grade}`,
            value: grade,
        };
    },
);

function Onboarding() {
    const navigate = useNavigate();

    const {
        data: authUser,
        isLoading: isAuthUserLoading,
    } = useAuthUser();

    const createStudentProfileMutation = useCreateStudentProfile();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    // const [avatarUrl, setAvatarUrl] = useState("");
    const [grade, setGrade] = useState(10);
    const [curriculum, setCurriculum] = useState<Curriculum>("CAPS");
    const [schoolName, setSchoolName] = useState("");
    const [province, setProvince] = useState("");

    const accountId = authUser?.userInfo?.id;

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!accountId) {
            return;
        }

        const payload: StudentProfileNew = {
            accountId,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            // TODO: WE WILL COMEBACK
            avatarUrl: null,
            grade: Number(grade),
            curriculum,
            schoolName: schoolName.trim() || null,
            province: province.trim() || null,
            onboardingCompleted: true,
        };

        await createStudentProfileMutation.mutateAsync(payload);

        void navigate({
            to: "/dashboard",
            replace: true,
        });
    };

    const isSubmitting = createStudentProfileMutation.isPending;

    if (isAuthUserLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f8fff9]">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#d7f5dc] border-t-[#1e2914]"/>
                    <p className="font-inter text-sm tracking-tight text-[#7b7194]">
                        Preparing onboarding...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen items-center justify-center  px-4 py-10">
            <div className="w-full max-w-2xl rounded-[2rem]   sm:p-10">
                <div className={"mt-4 flex flex-col items-center "}>
                    <img
                        src="/logo/logo-gw.svg"
                        alt="Lockdin School Logo"
                        className="w-16 h-16 mb-5"
                    />
                    <p className="font-inter text-text text-3xl tracking-tighter py-2">Let&apos;s set up your student profile</p>
                    <p className="text-[14px] tracking-tight font-inter text-[#ODOC22] max-w-xs">We need a few details before you can access your dashboard, lessons, quizzes,
                        and study material.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 py-5">
                    <div className="grid gap-4 grid-cols-2">
                        <label className="space-y-2">
                            <input
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                                required
                                className="w-full rounded-lg border border-[#dbe8dd] bg-transparent px-4 py-3 font-inter text-xs outline-none transition focus:border-[#1e2914]"
                                placeholder="Enter your first name"
                            />
                        </label>

                        <label className="space-y-2">
                            <input
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                                required
                                className="w-full rounded-lg border border-[#dbe8dd] bg-transparent px-4 py-3 font-inter text-xs outline-none transition focus:border-[#1e2914]"
                                placeholder="Enter your surname"
                            />
                        </label>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="space-y-2">
                            <LockdinSelect
                                value={grade}
                                options={gradeOptions}
                                onChange={setGrade}
                            />
                        </label>

                        <label className="space-y-2">
                            <LockdinSelect
                                value={curriculum}
                                options={curriculumOptions}
                                onChange={setCurriculum}
                            />
                        </label>
                    </div>

                    {/*TODO: WE WILL COMEBACK */}

                    {/*<label className="block space-y-2">*/}
                    {/*    <span className="font-inter text-sm font-medium text-[#1e2914]">*/}
                    {/*        Avatar URL*/}
                    {/*    </span>*/}
                    {/*    <input*/}
                    {/*        value={avatarUrl}*/}
                    {/*        onChange={(event) => setAvatarUrl(event.target.value)}*/}
                    {/*        className="w-full rounded-2xl border border-[#dbe8dd] bg-white px-4 py-3 font-inter text-sm outline-none transition focus:border-[#1e2914]"*/}
                    {/*        placeholder="Optional profile image URL"*/}
                    {/*    />*/}
                    {/*</label>*/}

                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="space-y-2">
                            <input
                                value={schoolName}
                                onChange={(event) => setSchoolName(event.target.value)}
                                className="w-full rounded-lg border border-[#dbe8dd] bg-transparent px-4 py-3 font-inter text-xs outline-none transition focus:border-[#1e2914]"
                                placeholder="School name, if applicable"
                            />
                        </label>

                        <label className="space-y-2">
                            <input
                                value={province}
                                onChange={(event) => setProvince(event.target.value)}
                                className="w-full rounded-lg border border-[#dbe8dd] bg-transparent px-4 py-3 font-inter text-xs outline-none transition focus:border-[#1e2914]"
                                placeholder="Province"
                            />
                        </label>
                    </div>

                    {createStudentProfileMutation.isError && (
                        <div className="rounded-2xl bg-red-50 px-4 py-3">
                            <p className="font-inter text-sm text-red-700">
                                We could not save your profile. Please check your details and try again.
                            </p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={!accountId || isSubmitting}
                        className="w-full rounded-full bg-[#1e2914] px-5 py-4 font-inter text-xs tracking-tighter font-semibold text-white transition hover:bg-[#2d3d1f] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? "Saving profile..." : "Complete onboarding"}
                    </button>
                </form>
            </div>
            <div className=" w-full self-end flex flex-col mt-5 items-center z-5 ">
                <p className={"text-[#1e2914] font-getai text-xl tracking-[-2px]"}>
                    Lockdin<sup>®</sup>
                </p>

                <b className="font-inter  z-5 text-[#7b7194] text-[12px]">
                    from The Future Academy Inc.
                </b>
            </div>
        </div>
    );
}