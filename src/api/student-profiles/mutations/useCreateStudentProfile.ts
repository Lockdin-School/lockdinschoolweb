import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {StudentProfileNew} from "@/api/student-profiles/models/StudentProfile.ts";
import {createStudentProfile} from "@/api/student-profiles/studentProfiles.ts";
import {studentProfileKeys} from "@/api/student-profiles/queries/useStudentProfile.ts";


export const useCreateStudentProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (studentProfile: StudentProfileNew) =>
            createStudentProfile(studentProfile),
        onSuccess: async (createdProfile) => {
            await queryClient.invalidateQueries({
                queryKey: studentProfileKeys.byAccountId(createdProfile.accountId),
            });
        },
    });
};